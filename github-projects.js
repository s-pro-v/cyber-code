/**
 * Cyber Code — synchronizacja zapisanych projektów z plikiem JSON w repozytorium GitHub.
 *
 * Wymaga Personal Access Token (classic: repo, lub fine-grained: Contents read/write dla repo).
 * Token trzymaj poza repozytorium (np. wklejany w UI / localStorage) — nie commituj go do kodu.
 *
 * API (globalne): window.CyberGitHubProjects
 *
 * Przykład konfiguracji:
 *   CyberGitHubProjects.setConfig({
 *     owner: 'twoj-login',
 *     repo: 'twoje-repo',
 *     path: 'data/cyber-code-projects.json',
 *     branch: 'main',
 *     token: 'ghp_...'  // opcjonalnie przy samym odczycie publicznego repo
 *   });
 *
 *   await CyberGitHubProjects.pull({ mode: 'merge' });  // lub 'replace'
 *   await CyberGitHubProjects.push({ message: '…' }); // domyślnie: tylko nowe lokalne, czego nie ma w pliku na GitHub
 *   await CyberGitHubProjects.push({ fullLocal: true }); // pełna kopia całej biblioteki lokalnej → nadpisanie pliku
 */
(function (global) {
    'use strict';

    const CONFIG_KEY = 'cyberCodeGithubSync';
    const LS_PROJECTS = 'savedProjects';
    const EXPORT_MARKER = 'cyberCodeProjectsExport';
    const EXPORT_VERSION = 1;

    const API_ROOT = 'https://api.github.com';

    /** Publiczny manifest kluczy (tablica obiektów { nazwa: wartość }). */
    const AUTH_JSON_URL =
        'https://raw.githubusercontent.com/s-pro-v/json-lista/refs/heads/main/dev/auth.json';

    function defaultConfig() {
        return {
            owner: '',
            repo: '',
            path: 'data/cyber-code-projects.json',
            branch: 'main',
            token: '',
            /** Hasło do XOR + Base64 z auth.json (opcjonalnie zapisywane lokalnie). */
            xorKey: ''
        };
    }

    /**
     * Deszyfrowanie: ciąg z auth.json to Base64(szyfrogram), bajty XOR z powtarzanym kluczem UTF-8.
     */
    function xorDecryptFromBase64(cipherBase64, password) {
        const clean = String(cipherBase64).replace(/\s/g, '');
        if (!clean) {
            throw new Error('Pusty ciąg do deszyfrowania XOR.');
        }
        let bin;
        try {
            bin = atob(clean);
        } catch (_) {
            throw new Error('Nieprawidłowy Base64 — nie można zdeszyfrować XOR.');
        }
        const raw = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
            raw[i] = bin.charCodeAt(i);
        }
        const keyBytes = new TextEncoder().encode(String(password));
        if (keyBytes.length === 0) {
            throw new Error('Podaj hasło / klucz XOR.');
        }
        const out = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
            out[i] = raw[i] ^ keyBytes[i % keyBytes.length];
        }
        try {
            return new TextDecoder('utf-8', { fatal: true }).decode(out);
        } catch (_) {
            throw new Error('Zły klucz XOR lub nieprawidłowy szyfrogram (UTF-8 po XOR).');
        }
    }

    /**
     * Jeśli xorKey niepusty — deszyfruje; w przeciwnym razie zwraca surowy ciąg (np. jawny PAT).
     */
    function maybeDecryptAuthValue(cipherOrPlain, xorKey) {
        const k = String(xorKey ?? '').trim();
        if (!k) {
            return String(cipherOrPlain ?? '').trim();
        }
        return xorDecryptFromBase64(String(cipherOrPlain ?? '').trim(), k).trim();
    }

    function encodeRepoPath(path) {
        return String(path || '')
            .split('/')
            .filter(Boolean)
            .map(encodeURIComponent)
            .join('/');
    }

    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        const chunk = 0x8000;
        for (let i = 0; i < bytes.length; i += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        }
        return btoa(binary);
    }

    function base64ToUtf8(b64) {
        const clean = b64.replace(/\s/g, '');
        const bin = atob(clean);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
        return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    }

    function buildHeaders(token) {
        const h = {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        };
        if (token) {
            h.Authorization = `Bearer ${token}`;
        }
        return h;
    }

    function parseGithubError(status, body) {
        try {
            const j = JSON.parse(body);
            if (j.message) {
                return `${status}: ${j.message}`;
            }
        } catch (_) {
            /* ignore */
        }
        return `HTTP ${status}`;
    }

    function extractProjectsArray(data) {
        if (Array.isArray(data)) {
            return data;
        }
        if (data && Array.isArray(data.projects)) {
            return data.projects;
        }
        if (data && Array.isArray(data.savedProjects)) {
            return data.savedProjects;
        }
        throw new Error(
            'Plik JSON musi być tablicą projektów lub obiektem z polem projects (ew. savedProjects).'
        );
    }

    function normalizeProjectsArray(data) {
        const raw = extractProjectsArray(data);
        return raw.map((p, i) => ({
            id: typeof p.id === 'number' ? p.id : Date.now() + i,
            name: String(p.name || `Project ${i + 1}`).trim() || `Project ${i + 1}`,
            category: String(p.category || 'Website'),
            html: String(p.html ?? ''),
            css: String(p.css ?? ''),
            js: String(p.js ?? ''),
            created: p.created || new Date().toISOString(),
            modified: p.modified || new Date().toISOString(),
            fromGithub: p.fromGithub === true
        }));
    }

    function buildExportPayload(projects) {
        return {
            [EXPORT_MARKER]: true,
            version: EXPORT_VERSION,
            exportedAt: new Date().toISOString(),
            projects
        };
    }

    function mergeProjectLists(existing, incoming) {
        const out = existing.map((p) => ({ ...p }));
        const names = new Set(out.map((p) => p.name.toLowerCase()));
        incoming.forEach((p) => {
            let name = p.name;
            let n = 1;
            while (names.has(name.toLowerCase())) {
                name = `${p.name} (import ${n})`;
                n += 1;
            }
            names.add(name.toLowerCase());
            out.push({
                ...p,
                fromGithub: true,
                id: Date.now() + Math.floor(Math.random() * 1e9),
                name,
                modified: new Date().toISOString()
            });
        });
        return out;
    }

    function loadConfig() {
        try {
            const raw = localStorage.getItem(CONFIG_KEY);
            if (!raw) {
                return defaultConfig();
            }
            const o = JSON.parse(raw);
            return { ...defaultConfig(), ...o };
        } catch (_) {
            return defaultConfig();
        }
    }

    function saveConfig(partial) {
        const next = { ...loadConfig(), ...partial };
        localStorage.setItem(CONFIG_KEY, JSON.stringify(next));
        return next;
    }

    function getConfigForRequest() {
        const c = loadConfig();
        const owner = String(c.owner || '').trim();
        const repo = String(c.repo || '').trim();
        const path = String(c.path || '').trim() || defaultConfig().path;
        const branch = String(c.branch || '').trim() || defaultConfig().branch;
        if (!owner || !repo) {
            throw new Error('Uzupełnij owner i repo w ustawieniach GitHub (Zapisz konfigurację).');
        }
        return { ...c, owner, repo, path, branch };
    }

    /**
     * Pobiera metadane pliku + zawartość (JSON) z GitHub Contents API.
     * @returns {{ payload: object, sha: string|null, projects: array }}
     */
    async function fetchRemotePayload() {
        const c = getConfigForRequest();
        const pathEnc = encodeRepoPath(c.path);
        const refQ = c.branch ? `?ref=${encodeURIComponent(c.branch)}` : '';
        const url = `${API_ROOT}/repos/${encodeURIComponent(c.owner)}/${encodeURIComponent(c.repo)}/contents/${pathEnc}${refQ}`;

        const res = await fetch(url, { headers: buildHeaders(c.token) });
        const text = await res.text();

        if (res.status === 404) {
            return { payload: null, sha: null, projects: [] };
        }

        if (!res.ok) {
            throw new Error(parseGithubError(res.status, text));
        }

        let meta;
        try {
            meta = JSON.parse(text);
        } catch (e) {
            throw new Error('GitHub: nie można sparsować metadanych pliku (oczekiwano JSON).');
        }

        if (meta.type !== 'file') {
            throw new Error('Odpowiedź GitHub: w ścieżce nie jest zwykły plik (sprawdź path — nie katalog).');
        }

        let jsonText = '';
        if (meta.content && typeof meta.content === 'string') {
            jsonText = base64ToUtf8(meta.content);
        } else {
            /**
             * Duże pliki: GitHub często zwraca tylko download_url (bez content).
             * NIE wysyłaj Authorization na raw.githubusercontent.com — wymusza preflight OPTIONS,
             * a ten host nie przechodzi CORS z przeglądarki.
             * Z tokenem: drugie żądanie na to samo URL Contents API z Accept: raw (api.github.com + CORS).
             */
            if (c.token) {
                const rawRes = await fetch(url, {
                    headers: {
                        ...buildHeaders(c.token),
                        Accept: 'application/vnd.github.raw'
                    },
                    cache: 'no-store'
                });
                const rawErrText = await rawRes.text();
                if (!rawRes.ok) {
                    throw new Error(parseGithubError(rawRes.status, rawErrText));
                }
                jsonText = rawErrText;
            } else if (meta.download_url && typeof meta.download_url === 'string') {
                const rawRes = await fetch(meta.download_url, { cache: 'no-store' });
                if (!rawRes.ok) {
                    throw new Error(
                        'GitHub: pobranie pliku (raw, publiczne) nie powiodło się: HTTP ' +
                        rawRes.status +
                        '. Dla prywatnego repo ustaw token PAT.'
                    );
                }
                jsonText = await rawRes.text();
            } else {
                throw new Error(
                    'Odpowiedź GitHub: brak treści pliku (content) — ustaw token PAT albo zmniejsz plik.'
                );
            }
        }

        let payload;
        try {
            payload = JSON.parse(jsonText);
        } catch (e) {
            throw new Error(
                'Zawartość pliku w repozytorium nie jest poprawnym JSON: ' + (e.message || String(e))
            );
        }

        const projects = normalizeProjectsArray(payload);
        return { payload, sha: meta.sha || null, projects };
    }

    /**
     * Zapisuje payload JSON do repozytorium (tworzy plik lub aktualizuje — wymaga sha przy update).
     */
    async function uploadPayload(payload, commitMessage) {
        const c = getConfigForRequest();
        if (!c.token) {
            throw new Error('Zapis do GitHub wymaga tokena (setConfig({ token: \'...\' })).');
        }

        const pathEnc = encodeRepoPath(c.path);
        const url = `${API_ROOT}/repos/${encodeURIComponent(c.owner)}/${encodeURIComponent(c.repo)}/contents/${pathEnc}`;

        const bodyObj = {
            message: commitMessage || 'Cyber Code: sync projects',
            content: utf8ToBase64(JSON.stringify(payload, null, 2)),
            branch: c.branch || 'main'
        };

        /** Zawsze odczyt aktualnego sha — błędy (401, sieć, zła ścieżka) muszą przerwać zapis zamiast PUT bez sha przy istniejącym pliku. */
        const cur = await fetchRemotePayload();
        if (cur.sha) {
            bodyObj.sha = cur.sha;
        }

        const res = await fetch(url, {
            method: 'PUT',
            headers: buildHeaders(c.token),
            body: JSON.stringify(bodyObj)
        });

        const outText = await res.text();
        if (!res.ok) {
            throw new Error(parseGithubError(res.status, outText));
        }

        return JSON.parse(outText);
    }

    /**
     * Odczyt z GitHub → zapis do localStorage (savedProjects).
     * @param {{ mode?: 'merge'|'replace' }} options
     */
    async function pull(options) {
        const mode = options && options.mode === 'replace' ? 'replace' : 'merge';
        const { projects } = await fetchRemotePayload();

        if (!projects.length && mode === 'merge') {
            return { ok: true, count: 0, mode, message: 'Brak projektów w pliku zdalnym (lub plik nie istnieje).' };
        }

        if (mode === 'replace') {
            const base = Date.now();
            const replaced = projects.map((p, i) => ({
                ...p,
                id: base + i,
                fromGithub: true
            }));
            localStorage.setItem(LS_PROJECTS, JSON.stringify(replaced));
            return { ok: true, count: replaced.length, mode: 'replace' };
        }

        const existing = JSON.parse(localStorage.getItem(LS_PROJECTS) || '[]');
        const merged = mergeProjectLists(existing, projects);
        localStorage.setItem(LS_PROJECTS, JSON.stringify(merged));
        return { ok: true, count: projects.length, total: merged.length, mode: 'merge' };
    }

    /**
     * Projekty lokalne do pierwszego wysłania: nie z pulla GitHub (`fromGithub` !== true) i nazwa nie występuje w zdalnym pliku.
     */
    function pickLocalProjectsNotOnRemote(localProjects, remoteProjects) {
        const remoteNames = new Set(
            remoteProjects.map(function (p) {
                return String(p.name || '')
                    .trim()
                    .toLowerCase();
            })
        );
        const candidates = localProjects.filter(function (p) {
            if (p.fromGithub === true) {
                return false;
            }
            const n = String(p.name || '')
                .trim()
                .toLowerCase();
            return n && !remoteNames.has(n);
        });
        /** Jedna pozycja na nazwę — najnowszy `modified` / `created`. */
        const byName = new Map();
        candidates.forEach(function (p) {
            const key = String(p.name || '')
                .trim()
                .toLowerCase();
            const prev = byName.get(key);
            if (!prev) {
                byName.set(key, p);
                return;
            }
            const tNew = new Date(p.modified || p.created || 0).getTime();
            const tOld = new Date(prev.modified || prev.created || 0).getTime();
            if (tNew >= tOld) {
                byName.set(key, p);
            }
        });
        return Array.from(byName.values());
    }

    /**
     * Po udanym dopisaniu — oznacz w localStorage te same wpisy jako zsynchronizowane z GitHub.
     */
    function markPushedProjectsAsFromGithub(localProjects, pushedSlice) {
        const ids = new Set(
            pushedSlice.map(function (p) {
                return p.id;
            })
        );
        const next = localProjects.map(function (p) {
            if (ids.has(p.id)) {
                return { ...p, fromGithub: true };
            }
            return p;
        });
        localStorage.setItem(LS_PROJECTS, JSON.stringify(next));
    }

    /**
     * Odczyt localStorage → zapis pliku w repozytorium.
     * Domyślnie: pobiera aktualny plik z GitHub, scala listę i wysyła tylko **nowe** projekty lokalne,
     * których nazw nie ma jeszcze na GitHub (`fullLocal: true` — poprzednie zachowanie: cała biblioteka lokalna).
     * @param {{ message?: string, fullLocal?: boolean }} options
     */
    async function push(options) {
        const local = JSON.parse(localStorage.getItem(LS_PROJECTS) || '[]');
        const fullLocal = options && options.fullLocal === true;

        if (fullLocal) {
            const payload = buildExportPayload(local);
            const message =
                (options && options.message) || `Cyber Code: backup ${local.length} projekt(ów) (pełna biblioteka lokalna)`;
            const result = await uploadPayload(payload, message);
            return { ok: true, mode: 'fullLocal', projects: local.length, added: local.length, result };
        }

        const { projects: remoteProjects } = await fetchRemotePayload();
        const toAdd = pickLocalProjectsNotOnRemote(local, remoteProjects);

        if (toAdd.length === 0) {
            return {
                ok: true,
                mode: 'mergeNew',
                added: 0,
                projects: remoteProjects.length,
                message:
                    'Brak nowych projektów do wysłania (lokalne ze źródła GitHub lub ta sama nazwa już jest w pliku na GitHub).'
            };
        }

        const now = new Date().toISOString();
        const merged = remoteProjects.map(function (p) {
            return { ...p };
        });
        toAdd.forEach(function (p) {
            merged.push({
                ...p,
                fromGithub: true,
                modified: p.modified || now
            });
        });

        const payload = buildExportPayload(merged);
        const message =
            (options && options.message) ||
            `Cyber Code: +${toAdd.length} nowych projekt(ów) (łącznie ${merged.length} w pliku)`;
        const result = await uploadPayload(payload, message);
        markPushedProjectsAsFromGithub(local, toAdd);

        return {
            ok: true,
            mode: 'mergeNew',
            added: toAdd.length,
            projects: merged.length,
            result
        };
    }

    /**
     * Tylko pobiera i zwraca tablicę projektów (bez zapisu do localStorage).
     */
    async function fetchProjects() {
        const { projects } = await fetchRemotePayload();
        return projects;
    }

    /**
     * Scala tablicę obiektów z auth.json do jednego obiektu (jak w json-lista/dev/auth.json).
     */
    function mergeAuthManifest(json) {
        const merged = {};
        if (Array.isArray(json)) {
            json.forEach((o) => {
                if (o && typeof o === 'object' && !Array.isArray(o)) {
                    Object.assign(merged, o);
                }
            });
        } else if (json && typeof json === 'object') {
            Object.assign(merged, json);
        }
        return merged;
    }

    /**
     * Pobiera wartość PAT / klucza z manifestu JSON.
     * @param {{ url?: string, keyName?: string, keyOrder?: string[], xorKey?: string }} options
     * @returns {Promise<{ value: string, keyUsed: string, decrypted: boolean }>}
     */
    async function fetchPatFromAuthJson(options) {
        const url = (options && options.url) || AUTH_JSON_URL;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('auth.json: HTTP ' + res.status);
        }
        const json = await res.json();
        const merged = mergeAuthManifest(json);
        const single = options && options.keyName;
        const order =
            single != null && String(single).trim()
                ? [String(single).trim()]
                : (options && options.keyOrder) || [
                    'cyber_data',
                    'rep_all',
                    'github_pat',
                    'sys_pat',
                    'matrix_pat',
                    'flux_pat'
                ];
        const xorKey = options && options.xorKey;
        for (let i = 0; i < order.length; i++) {
            const keyField = order[i];
            const v = merged[keyField];
            if (typeof v === 'string' && v.trim()) {
                const raw = v.trim();
                const decrypted = Boolean(String(xorKey ?? '').trim());
                const value = maybeDecryptAuthValue(raw, xorKey);
                return { value, keyUsed: keyField, decrypted };
            }
        }
        throw new Error('Brak niepustej wartości dla kluczy: ' + order.join(', '));
    }

    global.CyberGitHubProjects = {
        CONFIG_KEY,
        AUTH_JSON_URL,
        loadConfig,
        setConfig: saveConfig,
        fetchRemotePayload,
        fetchProjects,
        fetchPatFromAuthJson,
        mergeAuthManifest,
        xorDecryptFromBase64,
        maybeDecryptAuthValue,
        uploadPayload,
        pull,
        push,
        normalizeProjectsArray,
        buildExportPayload
    };
})(typeof window !== 'undefined' ? window : globalThis);
