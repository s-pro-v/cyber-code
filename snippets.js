/**
 * Cyber Code — biblioteka snippetów HTML / CSS / JS i panel wyboru.
 * Grupy (pole `group`) = sekcje w stylu strony; snippet'y „Cyber” = klasy jak w podglądzie defaultContent.
 * Zestawy (`codeSnippetSets`) = kilka snippetów naraz (różne zakładki), powiązane po `snippetName`.
 */
(function (global) {
    'use strict';

    function escHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    global.codeSnippets = {
        html: [
            {
                group: 'Cyber — układ',
                name: 'Karta + logo (jak domyślny podgląd)',
                code:
                    '<div class="container">\n' +
                    '  <div class="card">\n' +
                    '    <div class="cyber-logo" aria-label="Cyber Code">\n' +
                    '      <span class="cyber-logo__glyph" aria-hidden="true">&gt;_</span>\n' +
                    '      <div class="cyber-logo__wordmark">\n' +
                    '        <span class="cyber-logo__cyber">CYBER</span><span class="cyber-logo__code">CODE</span>\n' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '    <h1 class="status-head">SYSTEM READY</h1>\n' +
                    '    <p>Interface loaded successfully.</p>\n' +
                    '    <div class="status-line">\n' +
                    '      <span class="dot"></span> ONLINE\n' +
                    '    </div>\n' +
                    '    <button type="button" onclick="initSequence()">INITIALIZE</button>\n' +
                    '  </div>\n' +
                    '</div>'
            },
            {
                group: 'Cyber — układ',
                name: 'Linia statusu + kropka puls',
                code:
                    '<div class="status-line">\n' +
                    '  <span class="dot"></span>\n' +
                    '  <span>CHANNEL OPEN</span>\n' +
                    '</div>'
            },
            {
                group: 'Cyber — układ',
                name: 'Nagłówek protokołu',
                code: '<h1 class="status-head">ACCESS GRANTED</h1>\n<p class="protocol-sub">Session token verified.</p>'
            },
            {
                group: 'Cyber — układ',
                name: 'Przycisk terminal (outline)',
                code: '<button type="button" class="cyber-btn">EXECUTE PROTOCOL</button>'
            },
            {
                group: 'Cyber — układ',
                name: 'Panel danych (readout)',
                code:
                    '<div class="cyber-readout">\n' +
                    '  <div class="cyber-readout__row"><span class="k">NODE</span><span class="v">ALPHA-7</span></div>\n' +
                    '  <div class="cyber-readout__row"><span class="k">STATE</span><span class="v">STABLE</span></div>\n' +
                    '  <div class="cyber-readout__row"><span class="k">UPTIME</span><span class="v">99.2%</span></div>\n' +
                    '</div>'
            },
            {
                group: 'Cyber — układ',
                name: 'Separator + etykieta sekcji',
                code:
                    '<div class="cyber-divider">\n' +
                    '  <span class="cyber-divider__cap">///</span>\n' +
                    '  <span class="cyber-divider__text">SUBSYSTEM LOG</span>\n' +
                    '  <span class="cyber-divider__line"></span>\n' +
                    '</div>'
            },
            {
                group: 'Cyber — układ',
                name: 'Siatka 2 kolumn (deck)',
                code:
                    '<div class="cyber-deck">\n' +
                    '  <div class="cyber-deck__cell">\n' +
                    '    <span class="cyber-deck__label">INPUT</span>\n' +
                    '    <p>Raw stream buffer.</p>\n' +
                    '  </div>\n' +
                    '  <div class="cyber-deck__cell">\n' +
                    '    <span class="cyber-deck__label">OUTPUT</span>\n' +
                    '    <p>Encoded payload.</p>\n' +
                    '  </div>\n' +
                    '</div>'
            },
            {
                group: 'Formularze (Cyber)',
                name: 'Pole + etykieta',
                code:
                    '<div class="cyber-field">\n' +
                    '  <label class="cyber-field__label" for="cid">CALLSIGN</label>\n' +
                    '  <input class="cyber-field__input" id="cid" type="text" placeholder="OPERATOR_ID" autocomplete="off">\n' +
                    '</div>'
            },
            {
                group: 'Formularze (Cyber)',
                name: 'Wiersz pól (2x)',
                code:
                    '<div class="cyber-fields-row">\n' +
                    '  <div class="cyber-field">\n' +
                    '    <label class="cyber-field__label" for="a">KEY</label>\n' +
                    '    <input class="cyber-field__input" id="a" type="text">\n' +
                    '  </div>\n' +
                    '  <div class="cyber-field">\n' +
                    '    <label class="cyber-field__label" for="b">VALUE</label>\n' +
                    '    <input class="cyber-field__input" id="b" type="text">\n' +
                    '  </div>\n' +
                    '</div>'
            },
            {
                group: 'Tekst i linki',
                name: 'Link w stylu terminala',
                code: '<a class="cyber-link" href="#" target="_blank" rel="noopener noreferrer">&gt; OPEN_CHANNEL</a>'
            },
            {
                group: 'Tekst i linki',
                name: 'Blok cytatu / log',
                code:
                    '<pre class="cyber-log" role="log">[00:00:01] Handshake OK\n' +
                    '[00:00:02] Cipher suite: AES-256-GCM\n' +
                    '[00:00:03] Awaiting command…</pre>'
            },
            {
                group: 'Szablon strony',
                name: 'HTML5 minimal + body cyber',
                code:
                    '<!DOCTYPE html>\n<html lang="pl">\n<head>\n' +
                    '  <meta charset="UTF-8">\n' +
                    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                    '  <title>CYBER NODE</title>\n</head>\n<body>\n' +
                    '  <div class="container">\n    <div class="card">\n      <!-- content -->\n    </div>\n  </div>\n</body>\n</html>'
            }
        ],
        css: [
            {
                group: 'Cyber — zmienne',
                name: ':root paleta (jak podgląd)',
                code:
                    ':root {\n' +
                    '  --cyber-bg: #050505;\n' +
                    '  --cyber-panel: #111;\n' +
                    '  --cyber-border: #333;\n' +
                    '  --cyber-accent: #ff7300;\n' +
                    '  --cyber-text: #e9ecef;\n' +
                    '  --cyber-ok: #28a745;\n' +
                    '}'
            },
            {
                group: 'Cyber — zmienne',
                name: 'Body + fonty (Orbitron + Share Tech Mono)',
                code:
                    "@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&display=swap');\n\n" +
                    'body {\n' +
                    '  background: var(--cyber-bg, #050505);\n' +
                    '  color: var(--cyber-text, #e9ecef);\n' +
                    "  font-family: 'Share Tech Mono', monospace;\n" +
                    '  margin: 0;\n' +
                    '  min-height: 100vh;\n' +
                    '}'
            },
            {
                group: 'Cyber — karta',
                name: '.card + narożniki pomarańczowe',
                code:
                    '.card {\n' +
                    '  background: var(--cyber-panel, #111);\n' +
                    '  border: 1px solid var(--cyber-border, #333);\n' +
                    '  padding: 2rem;\n' +
                    '  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);\n' +
                    '  text-align: center;\n' +
                    '  position: relative;\n' +
                    '}\n\n' +
                    '.card::before {\n' +
                    "  content: '';\n" +
                    '  position: absolute;\n' +
                    '  top: -2px;\n' +
                    '  left: -2px;\n' +
                    '  width: 15px;\n' +
                    '  height: 15px;\n' +
                    '  border-top: 2px solid var(--cyber-accent, #ff7300);\n' +
                    '  border-left: 2px solid var(--cyber-accent, #ff7300);\n' +
                    '}\n\n' +
                    '.card::after {\n' +
                    "  content: '';\n" +
                    '  position: absolute;\n' +
                    '  bottom: -2px;\n' +
                    '  right: -2px;\n' +
                    '  width: 15px;\n' +
                    '  height: 15px;\n' +
                    '  border-bottom: 2px solid var(--cyber-accent, #ff7300);\n' +
                    '  border-right: 2px solid var(--cyber-accent, #ff7300);\n' +
                    '}'
            },
            {
                group: 'Cyber — karta',
                name: '.cyber-logo + wordmark',
                code:
                    '.cyber-logo {\n' +
                    '  display: flex;\n' +
                    '  align-items: center;\n' +
                    '  justify-content: center;\n' +
                    '  gap: 12px;\n' +
                    '  margin-bottom: 1.25rem;\n' +
                    '  padding-bottom: 1rem;\n' +
                    '  border-bottom: 1px solid #2a2a2a;\n' +
                    '}\n\n' +
                    '.cyber-logo__glyph {\n' +
                    "  font-family: 'Share Tech Mono', monospace;\n" +
                    '  font-size: 1.75rem;\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '  text-shadow: 0 0 12px rgba(255, 115, 0, 0.45);\n' +
                    '}\n\n' +
                    '.cyber-logo__wordmark {\n' +
                    "  font-family: 'Orbitron', sans-serif;\n" +
                    '  font-weight: 700;\n' +
                    '  font-size: 1.35rem;\n' +
                    '  letter-spacing: 0.2em;\n' +
                    '  text-transform: uppercase;\n' +
                    '}\n\n' +
                    '.cyber-logo__cyber {\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '}\n\n' +
                    '.cyber-logo__code {\n' +
                    '  color: var(--cyber-text, #e9ecef);\n' +
                    '}'
            },
            {
                group: 'Cyber — karta',
                name: '.status-head + .status-line + .dot',
                code:
                    'h1.status-head {\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '  letter-spacing: 2px;\n' +
                    '  margin: 0 0 10px;\n' +
                    '  font-size: 1.15rem;\n' +
                    "  font-family: 'Share Tech Mono', monospace;\n" +
                    '  text-shadow: 0 0 10px rgba(255, 115, 0, 0.5);\n' +
                    '}\n\n' +
                    '.status-line {\n' +
                    '  display: flex;\n' +
                    '  align-items: center;\n' +
                    '  justify-content: center;\n' +
                    '  gap: 10px;\n' +
                    '  color: var(--cyber-ok, #28a745);\n' +
                    '  margin: 20px 0;\n' +
                    '  font-size: 0.9rem;\n' +
                    '}\n\n' +
                    '.dot {\n' +
                    '  width: 8px;\n' +
                    '  height: 8px;\n' +
                    '  background: var(--cyber-ok, #28a745);\n' +
                    '  border-radius: 50%;\n' +
                    '  box-shadow: 0 0 8px var(--cyber-ok, #28a745);\n' +
                    '  animation: cyber-pulse 1s infinite;\n' +
                    '}\n\n' +
                    '@keyframes cyber-pulse {\n' +
                    '  0%,\n' +
                    '  100% {\n' +
                    '    opacity: 0.5;\n' +
                    '  }\n' +
                    '  50% {\n' +
                    '    opacity: 1;\n' +
                    '  }\n' +
                    '}'
            },
            {
                group: 'Cyber — komponenty',
                name: 'Przycisk .cyber-btn',
                code:
                    '.cyber-btn {\n' +
                    '  background: transparent;\n' +
                    '  border: 1px solid var(--cyber-accent, #ff7300);\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '  padding: 10px 20px;\n' +
                    '  font-family: inherit;\n' +
                    '  font-size: 1rem;\n' +
                    '  cursor: pointer;\n' +
                    '  transition: 0.3s;\n' +
                    '  text-transform: uppercase;\n' +
                    '  font-weight: bold;\n' +
                    '}\n\n' +
                    '.cyber-btn:hover {\n' +
                    '  background: var(--cyber-accent, #ff7300);\n' +
                    '  color: #000;\n' +
                    '  box-shadow: 0 0 15px rgba(255, 115, 0, 0.6);\n' +
                    '}'
            },
            {
                group: 'Cyber — komponenty',
                name: '.cyber-readout (wiersze K/V)',
                code:
                    '.cyber-readout {\n' +
                    '  text-align: left;\n' +
                    '  max-width: 320px;\n' +
                    '  margin: 1rem auto;\n' +
                    '  border: 1px solid var(--cyber-border, #333);\n' +
                    '  padding: 0.75rem 1rem;\n' +
                    '  background: rgba(0, 0, 0, 0.35);\n' +
                    '  font-size: 0.8rem;\n' +
                    '}\n\n' +
                    '.cyber-readout__row {\n' +
                    '  display: flex;\n' +
                    '  justify-content: space-between;\n' +
                    '  gap: 1rem;\n' +
                    '  padding: 0.25rem 0;\n' +
                    '  border-bottom: 1px solid #2a2a2a;\n' +
                    '}\n\n' +
                    '.cyber-readout__row:last-child {\n' +
                    '  border-bottom: none;\n' +
                    '}\n\n' +
                    '.cyber-readout .k {\n' +
                    '  color: var(--text-muted, #888);\n' +
                    '  letter-spacing: 0.08em;\n' +
                    '}\n\n' +
                    '.cyber-readout .v {\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '}'
            },
            {
                group: 'Cyber — komponenty',
                name: '.cyber-divider + .cyber-deck',
                code:
                    '.cyber-divider {\n' +
                    '  display: flex;\n' +
                    '  align-items: center;\n' +
                    '  gap: 0.5rem;\n' +
                    '  margin: 1.25rem 0;\n' +
                    '  font-size: 0.65rem;\n' +
                    '  letter-spacing: 0.15em;\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '}\n\n' +
                    '.cyber-divider__line {\n' +
                    '  flex: 1;\n' +
                    '  height: 1px;\n' +
                    '  background: linear-gradient(90deg, var(--cyber-accent, #ff7300), transparent);\n' +
                    '}\n\n' +
                    '.cyber-deck {\n' +
                    '  display: grid;\n' +
                    '  grid-template-columns: 1fr 1fr;\n' +
                    '  gap: 0.75rem;\n' +
                    '  text-align: left;\n' +
                    '}\n\n' +
                    '.cyber-deck__cell {\n' +
                    '  border: 1px solid var(--cyber-border, #333);\n' +
                    '  padding: 0.75rem;\n' +
                    '  background: rgba(0, 0, 0, 0.25);\n' +
                    '}\n\n' +
                    '.cyber-deck__label {\n' +
                    '  display: block;\n' +
                    '  font-size: 0.6rem;\n' +
                    '  letter-spacing: 0.12em;\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '  margin-bottom: 0.35rem;\n' +
                    '}'
            },
            {
                group: 'Cyber — komponenty',
                name: '.cyber-field + .cyber-fields-row',
                code:
                    '.cyber-field {\n' +
                    '  display: flex;\n' +
                    '  flex-direction: column;\n' +
                    '  gap: 0.35rem;\n' +
                    '  text-align: left;\n' +
                    '  margin-bottom: 0.75rem;\n' +
                    '}\n\n' +
                    '.cyber-field__label {\n' +
                    '  font-size: 0.65rem;\n' +
                    '  letter-spacing: 0.12em;\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '}\n\n' +
                    '.cyber-field__input {\n' +
                    '  background: #0a0a0a;\n' +
                    '  border: 1px solid var(--cyber-border, #333);\n' +
                    '  color: var(--cyber-text, #e9ecef);\n' +
                    '  padding: 0.5rem 0.65rem;\n' +
                    '  font-family: inherit;\n' +
                    '  outline: none;\n' +
                    '}\n\n' +
                    '.cyber-field__input:focus {\n' +
                    '  border-color: var(--cyber-accent, #ff7300);\n' +
                    '  box-shadow: 0 0 0 1px rgba(255, 115, 0, 0.25);\n' +
                    '}\n\n' +
                    '.cyber-fields-row {\n' +
                    '  display: grid;\n' +
                    '  grid-template-columns: 1fr 1fr;\n' +
                    '  gap: 0.75rem;\n' +
                    '}'
            },
            {
                group: 'Cyber — komponenty',
                name: '.cyber-link + .cyber-log',
                code:
                    'a.cyber-link {\n' +
                    '  color: var(--cyber-accent, #ff7300);\n' +
                    '  text-decoration: none;\n' +
                    '  letter-spacing: 0.06em;\n' +
                    '  border-bottom: 1px solid transparent;\n' +
                    '}\n\n' +
                    'a.cyber-link:hover {\n' +
                    '  border-bottom-color: var(--cyber-accent, #ff7300);\n' +
                    '  text-shadow: 0 0 8px rgba(255, 115, 0, 0.4);\n' +
                    '}\n\n' +
                    '.cyber-log {\n' +
                    '  text-align: left;\n' +
                    '  font-size: 0.72rem;\n' +
                    '  line-height: 1.5;\n' +
                    '  padding: 1rem;\n' +
                    '  margin: 1rem 0;\n' +
                    '  background: #0a0a0a;\n' +
                    '  border: 1px solid var(--cyber-border, #333);\n' +
                    '  color: #b8c0cc;\n' +
                    '  overflow-x: auto;\n' +
                    '}'
            },
            {
                group: 'Układ i ruch',
                name: 'Centrowanie viewport (flex)',
                code:
                    '.container {\n' +
                    '  min-height: 100vh;\n' +
                    '  display: flex;\n' +
                    '  align-items: center;\n' +
                    '  justify-content: center;\n' +
                    '  padding: 1rem;\n' +
                    '}'
            },
            {
                group: 'Układ i ruch',
                name: 'Fade-in + slide',
                code:
                    '@keyframes cyber-in {\n' +
                    '  from {\n' +
                    '    opacity: 0;\n' +
                    '    transform: translateY(8px);\n' +
                    '  }\n' +
                    '  to {\n' +
                    '    opacity: 1;\n' +
                    '    transform: translateY(0);\n' +
                    '  }\n' +
                    '}\n\n' +
                    '.cyber-animate-in {\n' +
                    '  animation: cyber-in 0.45s ease-out both;\n' +
                    '}'
            },
            {
                group: 'Układ i ruch',
                name: 'Media query — węższy deck',
                code:
                    '@media (max-width: 520px) {\n' +
                    '  .cyber-deck,\n' +
                    '  .cyber-fields-row {\n' +
                    '    grid-template-columns: 1fr;\n' +
                    '  }\n' +
                    '}'
            }
        ],
        js: [
            {
                group: 'Cyber — rodzic (iframe)',
                name: 'showCyberConfirm (modal jak strona główna)',
                code:
                    'function callParentConfirm(title, html, onOk) {\n' +
                    '  var p = window.parent;\n' +
                    "  if (p && typeof p.showCyberConfirm === 'function') {\n" +
                    '    p.showCyberConfirm(title, html, onOk, "OK", "btn-primary");\n' +
                    '  } else if (onOk) {\n' +
                    '    onOk();\n' +
                    '  }\n' +
                    '}'
            },
            {
                group: 'Cyber — rodzic (iframe)',
                name: 'showCyberAlert (komunikat)',
                code:
                    'function callParentAlert(title, message) {\n' +
                    '  var p = window.parent;\n' +
                    "  if (p && typeof p.showCyberAlert === 'function') {\n" +
                    '    p.showCyberAlert(title, message, "OK");\n' +
                    '  } else {\n' +
                    '    window.alert(title + "\\n" + message);\n' +
                    '  }\n' +
                    '}'
            },
            {
                group: 'Cyber — rodzic (iframe)',
                name: 'Powiadomienie / postMessage',
                code:
                    "if (window.parent && window.parent !== window) {\n" +
                    "  window.parent.postMessage({ type: 'cyber-preview', action: 'ping' }, '*');\n" +
                    '}\n\n' +
                    "window.addEventListener('message', function (ev) {\n" +
                    '  if (!ev.data || ev.data.type !== "cyber-host") return;\n' +
                    "  console.log('Host:', ev.data);\n" +
                    '});'
            },
            {
                group: 'Cyber — UI podglądu',
                name: 'Zmiana .status-head + kolor',
                code:
                    "var h = document.querySelector('h1.status-head');\n" +
                    "if (h) {\n" +
                    "  h.textContent = 'LINK ESTABLISHED';\n" +
                    "  h.style.color = '#28a745';\n" +
                    "  h.style.textShadow = '0 0 12px rgba(40, 167, 69, 0.7)';\n" +
                    '}'
            },
            {
                group: 'Cyber — UI podglądu',
                name: 'Bezpieczny query + tekst',
                code:
                    'function setText(sel, text) {\n' +
                    '  var el = document.querySelector(sel);\n' +
                    '  if (el) el.textContent = text;\n' +
                    '}\n' +
                    "setText('.protocol-sub', 'Checksum verified.');"
            },
            {
                group: 'Przechowywanie',
                name: 'localStorage JSON (get / set)',
                code:
                    'function storageGet(key, fallback) {\n' +
                    '  try {\n' +
                    '    var raw = localStorage.getItem(key);\n' +
                    '    return raw ? JSON.parse(raw) : fallback;\n' +
                    '  } catch (e) {\n' +
                    '    return fallback;\n' +
                    '  }\n' +
                    '}\n\n' +
                    'function storageSet(key, value) {\n' +
                    '  try {\n' +
                    '    localStorage.setItem(key, JSON.stringify(value));\n' +
                    '  } catch (e) {\n' +
                    '    console.warn(e);\n' +
                    '  }\n' +
                    '}'
            },
            {
                group: 'Przechowywanie',
                name: 'Debounce (np. pod input)',
                code:
                    'function debounce(fn, ms) {\n' +
                    '  var t;\n' +
                    '  return function () {\n' +
                    '    var ctx = this;\n' +
                    '    var args = arguments;\n' +
                    '    clearTimeout(t);\n' +
                    '    t = setTimeout(function () {\n' +
                    '      fn.apply(ctx, args);\n' +
                    '    }, ms);\n' +
                    '  };\n' +
                    '}'
            },
            {
                group: 'Sieć',
                name: 'fetch JSON (async)',
                code:
                    'async function loadJson(url) {\n' +
                    '  const res = await fetch(url);\n' +
                    '  if (!res.ok) throw new Error("HTTP " + res.status);\n' +
                    '  return res.json();\n' +
                    '}'
            },
            {
                group: 'Sieć',
                name: 'fetch + obsługa błędu',
                code:
                    "fetch('/api/status')\n" +
                    '  .then(function (r) {\n' +
                    '    if (!r.ok) throw new Error(r.status);\n' +
                    '    return r.json();\n' +
                    '  })\n' +
                    '  .then(function (data) {\n' +
                    '    console.log(data);\n' +
                    '  })\n' +
                    '  .catch(function (e) {\n' +
                    '    console.error(e);\n' +
                    '  });'
            },
            {
                group: 'Tablica / czas',
                name: 'Map / filter / reduce',
                code:
                    'const ids = items.map(function (x) {\n' +
                    '  return x.id;\n' +
                    '});\n' +
                    'const active = items.filter(function (x) {\n' +
                    '  return x.ok;\n' +
                    '});\n' +
                    'const sum = values.reduce(function (a, n) {\n' +
                    '  return a + n;\n' +
                    '}, 0);'
            },
            {
                group: 'Tablica / czas',
                name: 'setTimeout / setInterval',
                code:
                    'var id = setTimeout(function () {\n' +
                    "  console.log('tick');\n" +
                    '}, 500);\n\n' +
                    'var iv = setInterval(function () {}, 1000);\n' +
                    'clearInterval(iv);'
            }
        ]
    };

    /**
     * Zestawy: `parts` = kolejność wstawiania; każdy wpis `{ tab, snippetName }` musi pasować do `codeSnippets[tab][].name`.
     * @type {Array<{ group?: string, name: string, description?: string, parts: Array<{ tab: 'html'|'css'|'js', snippetName: string }> }>}
     */
    global.codeSnippetSets = [
        {
            group: 'Cyber — komplet',
            name: 'Pełna karta (jak domyślny podgląd)',
            description: 'HTML karty + CSS: paleta, body, centrowanie, karta, logo, status, przycisk',
            parts: [
                { tab: 'html', snippetName: 'Karta + logo (jak domyślny podgląd)' },
                { tab: 'css', snippetName: ':root paleta (jak podgląd)' },
                { tab: 'css', snippetName: 'Body + fonty (Orbitron + Share Tech Mono)' },
                { tab: 'css', snippetName: 'Centrowanie viewport (flex)' },
                { tab: 'css', snippetName: '.card + narożniki pomarańczowe' },
                { tab: 'css', snippetName: '.cyber-logo + wordmark' },
                { tab: 'css', snippetName: '.status-head + .status-line + .dot' },
                { tab: 'css', snippetName: 'Przycisk .cyber-btn' }
            ]
        },
        {
            group: 'Cyber — komplet',
            name: 'Strona minimalna (szkielet + styl)',
            description: 'DOCTYPE + karta + zmienne, fonty, centrowanie, .card',
            parts: [
                { tab: 'html', snippetName: 'HTML5 minimal + body cyber' },
                { tab: 'css', snippetName: ':root paleta (jak podgląd)' },
                { tab: 'css', snippetName: 'Body + fonty (Orbitron + Share Tech Mono)' },
                { tab: 'css', snippetName: 'Centrowanie viewport (flex)' },
                { tab: 'css', snippetName: '.card + narożniki pomarańczowe' }
            ]
        },
        {
            group: 'Komponenty',
            name: 'Readout + style',
            description: 'Panel K/V + arkusz .cyber-readout',
            parts: [
                { tab: 'html', snippetName: 'Panel danych (readout)' },
                { tab: 'css', snippetName: '.cyber-readout (wiersze K/V)' }
            ]
        },
        {
            group: 'Komponenty',
            name: 'Deck + divider + style',
            description: 'Separator, siatka 2 kolumn + CSS divider/deck',
            parts: [
                { tab: 'html', snippetName: 'Separator + etykieta sekcji' },
                { tab: 'html', snippetName: 'Siatka 2 kolumn (deck)' },
                { tab: 'css', snippetName: '.cyber-divider + .cyber-deck' }
            ]
        },
        {
            group: 'Komponenty',
            name: 'Formularz + style',
            description: 'Pole z etykietą + siatka pól + CSS pól',
            parts: [
                { tab: 'html', snippetName: 'Pole + etykieta' },
                { tab: 'html', snippetName: 'Wiersz pól (2x)' },
                { tab: 'css', snippetName: '.cyber-field + .cyber-fields-row' },
                { tab: 'css', snippetName: 'Media query — węższy deck' }
            ]
        },
        {
            group: 'Komponenty',
            name: 'Link + log + style',
            description: 'Link terminalowy, blok log + CSS',
            parts: [
                { tab: 'html', snippetName: 'Link w stylu terminala' },
                { tab: 'html', snippetName: 'Blok cytatu / log' },
                { tab: 'css', snippetName: '.cyber-link + .cyber-log' }
            ]
        },
        {
            group: 'Komponenty',
            name: 'Nagłówek + linia statusu + style',
            description: 'Nagłówek protokołu, status line + CSS status/puls',
            parts: [
                { tab: 'html', snippetName: 'Nagłówek protokołu' },
                { tab: 'html', snippetName: 'Linia statusu + kropka puls' },
                { tab: 'css', snippetName: '.status-head + .status-line + .dot' }
            ]
        },
        {
            group: 'Integracja',
            name: 'Rodzic: confirm + alert + postMessage',
            description: 'Trzy bloki JS do komunikacji z oknem nadrzędnym',
            parts: [
                { tab: 'js', snippetName: 'showCyberConfirm (modal jak strona główna)' },
                { tab: 'js', snippetName: 'showCyberAlert (komunikat)' },
                { tab: 'js', snippetName: 'Powiadomienie / postMessage' }
            ]
        },
        {
            group: 'Integracja',
            name: 'UI podglądu + utils',
            description: 'Manipulacja nagłówka, setText, debounce, localStorage',
            parts: [
                { tab: 'js', snippetName: 'Zmiana .status-head + kolor' },
                { tab: 'js', snippetName: 'Bezpieczny query + tekst' },
                { tab: 'js', snippetName: 'localStorage JSON (get / set)' },
                { tab: 'js', snippetName: 'Debounce (np. pod input)' }
            ]
        },
        {
            group: 'Sieć i dane',
            name: 'fetch + tablice (starter)',
            description: 'async JSON, fetch z catch, map/filter/reduce',
            parts: [
                { tab: 'js', snippetName: 'fetch JSON (async)' },
                { tab: 'js', snippetName: 'fetch + obsługa błędu' },
                { tab: 'js', snippetName: 'Map / filter / reduce' }
            ]
        }
    ];

    function findSnippetByName(tab, snippetName) {
        const arr = global.codeSnippets[tab] || [];
        return arr.find(function (s) {
            return s.name === snippetName;
        }) || null;
    }

    function setPartsSummary(parts) {
        const order = { html: 0, css: 1, js: 2 };
        const seen = Object.create(null);
        const tabs = [];
        for (let i = 0; i < parts.length; i++) {
            const t = parts[i].tab;
            if (!seen[t]) {
                seen[t] = true;
                tabs.push(t);
            }
        }
        tabs.sort(function (a, b) {
            return (order[a] ?? 9) - (order[b] ?? 9);
        });
        return tabs
            .map(function (t) {
                return t.toUpperCase();
            })
            .join(' → ');
    }

    let ctx = null;

    /**
     * @param {{ currentTab: string, editors: object, elements: { snippetsSidebar: object }, showNotification: function }} api
     */
    function registerCyberSnippetContext(api) {
        ctx = api;
    }

    function insertSnippet() {
        if (!ctx) return;
        const { currentTab, editors, elements, showNotification } = ctx;
        const items = global.codeSnippets[currentTab] || [];
        const sets = global.codeSnippetSets || [];
        if (items.length === 0 && sets.length === 0) {
            showNotification('No snippets available for this tab.', 'info');
            return;
        }

        const tabIcon = currentTab === 'html' ? 'fab fa-html5' : currentTab === 'css' ? 'fab fa-css3-alt' : 'fab fa-js';
        const tabName = currentTab.toUpperCase();

        let setsBlock = '';
        if (sets.length > 0) {
            setsBlock =
                '<div class="snippets-group-label snippets-group-label--zestawy" role="presentation">ZESTAWY</div>' +
                sets
                    .map(function (z, zi) {
                        const prevZ = sets[zi - 1];
                        const showSetGroup = z.group && (!prevZ || prevZ.group !== z.group);
                        const groupHdr = showSetGroup
                            ? `<div class="snippets-group-label snippets-group-label--sub" role="presentation">${escHtml(z.group)}</div>`
                            : '';
                        const summary = z.description ? z.description : setPartsSummary(z.parts);
                        const preview = summary.length > 150 ? summary.substring(0, 150) + '…' : summary;
                        return (
                            groupHdr +
                            `<div class="snippet-item snippet-item--set" role="button" tabindex="0" onclick="insertSnippetSet(${zi})">` +
                            '<div class="snippet-name">' +
                            '<i class="fas fa-layer-group setting-icon" aria-hidden="true"></i>' +
                            `<span>${escHtml(z.name)}</span>` +
                            '</div>' +
                            `<div class="snippet-code snippet-code--set-meta">${escHtml(preview)}</div>` +
                            `<div class="snippet-set-tabs">${escHtml(setPartsSummary(z.parts))}</div>` +
                            '</div>'
                        );
                    })
                    .join('');
        }

        const listHTML =
            '<div class="snippets-header-info">' +
            '<div class="snippets-tab-badge">' +
            `<i class="${tabIcon}"></i>` +
            `<span>${tabName} SNIPPETS</span>` +
            '</div>' +
            `<div class="snippets-count">${sets.length ? sets.length + ' zestawów · ' : ''}${items.length} snippetów</div>` +
            '</div>' +
            '<div class="snippets-list">' +
            setsBlock +
            items
                .map((s, idx) => {
                    const prev = items[idx - 1];
                    const showGroup = s.group && (!prev || prev.group !== s.group);
                    const header = showGroup
                        ? `<div class="snippets-group-label" role="presentation">${escHtml(s.group)}</div>`
                        : '';
                    const preview = s.code.length > 150 ? s.code.substring(0, 150) + '...' : s.code;
                    return (
                        header +
                        `<div class="snippet-item" onclick="insertSnippetCode(${idx})">` +
                        '<div class="snippet-name">' +
                        '<i class="fas fa-terminal setting-icon" aria-hidden="true"></i>' +
                        `<span>${escHtml(s.name)}</span>` +
                        '</div>' +
                        `<div class="snippet-code">${escHtml(preview)}</div>` +
                        '</div>'
                    );
                })
                .join('') +
            '</div>';

        elements.snippetsSidebar.body.innerHTML = listHTML;
        elements.snippetsSidebar.sidebar.classList.add('active');
        elements.snippetsSidebar.overlay.classList.add('active');
    }

    function closeSnippetsSidebar() {
        if (!ctx) return;
        ctx.elements.snippetsSidebar.sidebar.classList.remove('active');
        ctx.elements.snippetsSidebar.overlay.classList.remove('active');
    }

    function insertSnippetCode(index) {
        if (!ctx) return;
        const { currentTab, editors } = ctx;
        const s = global.codeSnippets[currentTab][index];
        const editor = editors[currentTab];
        if (!editor) return;
        const selection = editor.getSelection();
        const op = { range: selection, text: s.code, forceMoveMarkers: true };
        editor.executeEdits('snippet-insert', [op]);
        editor.focus();
        closeSnippetsSidebar();
    }

    function insertSnippetSet(setIndex) {
        if (!ctx) return;
        const sets = global.codeSnippetSets || [];
        const set = sets[setIndex];
        const { editors, showNotification } = ctx;
        if (!set || !set.parts || !set.parts.length) return;

        const missing = [];
        let lastTab = null;

        for (let i = 0; i < set.parts.length; i++) {
            const p = set.parts[i];
            const sn = findSnippetByName(p.tab, p.snippetName);
            if (!sn) {
                missing.push(p.tab + ': „' + p.snippetName + '”');
                continue;
            }
            const ed = editors[p.tab];
            if (!ed) {
                missing.push('brak edytora: ' + p.tab);
                continue;
            }
            const sel = ed.getSelection();
            ed.executeEdits('snippet-set-insert', [
                { range: sel, text: sn.code, forceMoveMarkers: true }
            ]);
            lastTab = p.tab;
        }

        if (missing.length && typeof showNotification === 'function') {
            showNotification('Zestaw częściowo: nie znaleziono ' + missing.join('; '), 'info');
        }
        if (lastTab && editors[lastTab]) {
            editors[lastTab].focus();
        }
        closeSnippetsSidebar();
    }

    global.registerCyberSnippetContext = registerCyberSnippetContext;
    global.insertSnippet = insertSnippet;
    global.closeSnippetsSidebar = closeSnippetsSidebar;
    global.insertSnippetCode = insertSnippetCode;
    global.insertSnippetSet = insertSnippetSet;
})(typeof window !== 'undefined' ? window : globalThis);
