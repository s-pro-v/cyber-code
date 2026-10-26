// --- DOM Elements ---
const elements = {
  previewIframe: document.getElementById("preview-iframe"),
  fileStatus: document.getElementById("file-status"),
  editorStatus: document.getElementById("editor-status"),
  themeBtn: document.getElementById("theme-btn"),
  modal: {
    container: document.getElementById("modal-container"),
    modal: document.querySelector(".modal"),
    title: document.getElementById("modal-title"),
    body: document.getElementById("modal-body"),
    actions: document.getElementById("modal-actions"),
    confirmBtn: document.getElementById("modal-confirm-btn"),
    cancelBtn: document.getElementById("modal-cancel-btn"),
  },
  settingsSidebar: {
    sidebar: document.getElementById("settings-sidebar"),
    overlay: document.getElementById("settings-sidebar-overlay"),
    body: document.getElementById("settings-sidebar-body"),
  },
  snippetsSidebar: {
    sidebar: document.getElementById("snippets-sidebar"),
    overlay: document.getElementById("snippets-sidebar-overlay"),
    body: document.getElementById("snippets-sidebar-body"),
  },
};

// --- State ---
let currentTab = "html";
let autoSaveInterval;
let editors = {}; // To hold Monaco instances
let currentView = "both"; // 'editor', 'preview', 'both'

// --- Editor Settings ---
let editorSettings = {
  fontSize: 14,
  fontFamily: '"JetBrains Mono", monospace',
  lineHeight: 0,
  wordWrap: "off",
  minimap: true,
  lineNumbers: "on",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  tabSize: 4,
  insertSpaces: true,
  renderWhitespace: "none",
  renderLineHighlight: "all",
  renderIndentGuides: true,
  cursorStyle: "line",
  cursorBlinking: "blink",
  scrollBeyondLastLine: true,
  smoothScrolling: false,
  mouseWheelZoom: false,
  roundedSelection: false,
  formatOnPaste: false,
  formatOnType: false,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  quickSuggestions: {
    other: true,
    comments: false,
    strings: true,
  },
  quickSuggestionsDelay: 100,
  autoIndent: "full",
  bracketPairColorization: true,
  colorDecorators: true,
  folding: true,
  showFoldingControls: "mouseover",
  matchBrackets: "always",
  occurrencesHighlight: true,
  selectionHighlight: true,
  codeLens: false,
  links: true,
  multiCursorModifier: "alt",
  dragAndDrop: true,
  emptySelectionClipboard: true,
  copyWithSyntaxHighlighting: true,
  cursorSmoothCaretAnimation: false,
  cursorSurroundingLines: 0,
  cursorSurroundingLinesStyle: "default",
  stickyScroll: { enabled: false },
  guides: { bracketPairs: true },
};

// Kolorowe nawiasy - zawsze włączone (nie można wyłączyć)
const bracketSettings = {
  bracketPairColorization: true,
  matchingBrackets: "always",
  coloredBrackets: true,
};

// --- Default Content ---
const defaultContent = {
  html: `<!-- Cyber Structure -->
<div class="container">
    <div class="card">
        <div class="cyber-logo" aria-label="Cyber Code">
            <span class="cyber-logo__glyph" aria-hidden="true">&gt;_</span>
            <div class="cyber-logo__wordmark">
                <span class="cyber-logo__cyber">CYBER</span><span class="cyber-logo__code">CODE</span>
            </div>
        </div>
        <h1 class="status-head">SYSTEM READY</h1>
        <p>Interface loaded successfully.</p>
        <div class="status-line">
            <span class="dot"></span> ONLINE
        </div>
        <button onclick="initSequence()">INITIALIZE</button>
    </div>
</div>`,
  css: `/* Cyber Styles */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&display=swap');

body {
    background: #050505;
    color: #e9ecef;
    font-family: 'Share Tech Mono', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
}

.container {
    position: relative;
    z-index: 1;
}

.card {
    background: #111;
    border: 1px solid #333;
    padding: 2rem;
    box-shadow: 0 0 20px rgba(0,0,0,0.8);
    text-align: center;
    position: relative;
}

.card::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px;
    width: 15px; height: 15px;
    border-top: 2px solid #ff7300;
    border-left: 2px solid #ff7300;
}

.card::after {
    content: '';
    position: absolute;
    bottom: -2px; right: -2px;
    width: 15px; height: 15px;
    border-bottom: 2px solid #ff7300;
    border-right: 2px solid #ff7300;
}

.cyber-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #2a2a2a;
}

.cyber-logo__glyph {
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.75rem;
    color: #ff7300;
    line-height: 1;
    text-shadow: 0 0 12px rgba(255, 115, 0, 0.45);
    letter-spacing: 0.05em;
}

.cyber-logo__wordmark {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.35rem;
    letter-spacing: 0.2em;
    line-height: 1;
    text-transform: uppercase;
}

.cyber-logo__cyber {
    color: #ff7300;
    text-shadow: 0 0 10px rgba(255, 115, 0, 0.5);
}

.cyber-logo__code {
    color: #e9ecef;
}

h1.status-head {
    color: #ff7300;
    letter-spacing: 2px;
    margin: 0 0 10px;
    font-size: 1.15rem;
    font-family: 'Share Tech Mono', monospace;
    text-shadow: 0 0 10px rgba(255, 115, 0, 0.5);
}

.status-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #28a745;
    margin: 20px 0;
    font-size: 0.9rem;
}

.dot {
    width: 8px; height: 8px;
    background: #28a745;
    border-radius: 50%;
    box-shadow: 0 0 8px #28a745;
    animation: pulse 1s infinite;
}

button {
    background: transparent;
    border: 1px solid #ff7300;
    color: #ff7300;
    padding: 10px 20px;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
    text-transform: uppercase;
    font-weight: bold;
}

button:hover {
    background: #ff7300;
    color: #000;
    box-shadow: 0 0 15px rgba(255, 115, 0, 0.6);
}

@keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
}`,
  js: `// Cyber Logic — modal zatwierdzenia = showCyberConfirm() ze strony głównej (ten sam UI)
function initSequence() {
    var p = window.parent;
    if (p && typeof p.showCyberConfirm === 'function') {
        p.showCyberConfirm(
            'PROTOCOL INIT',
            'Potwierdź uruchomienie sekwencji inicjalizacji.<br><br><span style="color:var(--text-muted); font-size:0.85rem;">Spowoduje to zmianę statusu interfejsu i zapis w logu systemowym.</span>',
            function () { runInitSequence(); },
            'URUCHOM',
            'btn-primary'
        );
    } else {
        runInitSequence();
    }
}

function runInitSequence() {
    var btn = document.querySelector('button');
    var h1 = document.querySelector('h1.status-head');
    if (!btn || !h1) return;

    btn.innerText = 'PROCESSING...';
    btn.style.opacity = 0.7;

    setTimeout(function () {
        h1.innerText = 'ACCESS GRANTED';
        h1.style.color = '#28a745';
        h1.style.textShadow = '0 0 15px rgba(40, 167, 69, 0.8)';

        btn.innerText = 'SYSTEM ACTIVE';
        btn.style.borderColor = '#28a745';
        btn.style.color = '#28a745';
        btn.style.pointerEvents = 'none';

        console.log('System initialized successfully');
        try {
            var par = window.parent;
            if (par && typeof par.showCyberAlert === 'function') {
                par.showCyberAlert('SUKCES', 'Sekwencja inicjalizacji zakończona. System aktywny.', 'OK');
            } else if (par && typeof par.showNotification === 'function') {
                par.showNotification('Protokół 7 zakończony.', 'success');
            } else if (par && par.showAlertModal) {
                par.showAlertModal('SUCCESS', 'Protocol 7 initialized.');
            }
        } catch (e) {}
    }, 1500);
}

console.log('System Idle. Waiting for input.');`,
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initializeEditors();
  setupEventListeners();
  loadTheme();
  loadSettings();
  loadView();
  loadProjectTreeFromStorage();
});

function initializeEditors() {
  console.log("Initializing Monaco Editor...");

  // Check if Monaco is already loaded
  if (window.monaco) {
    console.log("Monaco already loaded, creating editors...");
    configureMonacoCssSupport();
    createEditors();
    return;
  }

  // Helper: wait until AMD require is available (vs/loader.js may still be downloading)
  const waitForRequire = (callback, maxWaitMs = 12000, intervalMs = 50) => {
    const startTime = Date.now();
    const check = () => {
      if (typeof window.require === "function" && typeof window.require.config === "function") {
        callback(null, window.require);
      } else if (Date.now() - startTime >= maxWaitMs) {
        callback(new Error("Timeout: Monaco AMD require loader not available after " + maxWaitMs + "ms"));
      } else {
        setTimeout(check, intervalMs);
      }
    };
    check();
  };

  waitForRequire((err, req) => {
    if (err) {
      console.error(err);
      showNotification(
        "Błąd ładowania edytora (brak loader.js). Sprawdź połączenie z internetem.",
        "error",
      );
      return;
    }

    req.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.0/min/vs",
      },
    });

    req(
      ["vs/editor/editor.main"],
      () => {
        console.log("Monaco Editor loaded successfully");

        // Define custom themes immediately after Monaco loads
        if (window.defineMonacoThemes) {
          window.defineMonacoThemes();
        } else {
          console.warn("Theme definition function not found, using default theme");
        }

        configureMonacoCssSupport();
        createEditors();
      },
      (error) => {
        console.error("Failed to load Monaco Editor:", error);
        showNotification(
          "Błąd ładowania edytora. Sprawdź połączenie internetowe.",
          "error",
        );
      },
    );
  });
}

function configureMonacoCssSupport() {
  if (!window.monaco?.languages?.css?.scssDefaults) return;

  // Native CSS nesting is parsed correctly by Monaco SCSS language service.
  monaco.languages.css.scssDefaults.setDiagnosticsOptions({
    validate: true,
  });
}

function createEditors() {
  try {
    console.log("Creating editors...");

    // Load saved content BEFORE creating editors
    let initialHtml = defaultContent.html;
    let initialCss = defaultContent.css;
    let initialJs = defaultContent.js;

    try {
      const autoSaved = localStorage.getItem("autoSavedProject");
      if (autoSaved) {
        const project = JSON.parse(autoSaved);
        if (project && typeof project === "object") {
          const h = project.html;
          const c = project.css;
          const j = project.js;
          if (
            typeof h === "string" ||
            typeof c === "string" ||
            typeof j === "string" ||
            project.timestamp
          ) {
            initialHtml = typeof h === "string" ? h : defaultContent.html;
            initialCss = typeof c === "string" ? c : defaultContent.css;
            initialJs = typeof j === "string" ? j : defaultContent.js;
            console.log("Loading saved content from autosave");
          }
        }
      }
    } catch (e) {
      console.warn("Could not load autosave, using defaults:", e);
    }

    const sharedEditorOptions = getEditorOptions();

    editors.html = monaco.editor.create(
      document.getElementById("html-editor"),
      {
        ...sharedEditorOptions,
        value: initialHtml,
        language: "html",
      },
    );

    editors.css = monaco.editor.create(document.getElementById("css-editor"), {
      ...sharedEditorOptions,
      value: initialCss,
      language: "scss",
    });

    editors.js = monaco.editor.create(document.getElementById("js-editor"), {
      ...sharedEditorOptions,
      value: initialJs,
      language: "javascript",
    });

    // Set theme after creation
    const savedTheme = localStorage.getItem("codeEditorTheme") || "dark";
    let monacoTheme;
    if (savedTheme === "dark") {
      try {
        monaco.editor.setTheme("terminal-dark");
        monacoTheme = "terminal-dark";
      } catch (e) {
        monacoTheme = "vs-dark";
        monaco.editor.setTheme(monacoTheme);
      }
    } else {
      try {
        monaco.editor.setTheme("terminal-light");
        monacoTheme = "terminal-light";
      } catch (e) {
        monacoTheme = "vs";
        monaco.editor.setTheme(monacoTheme);
      }
    }

    console.log("Editors created successfully");

    if (typeof registerCyberSnippetContext === "function") {
      registerCyberSnippetContext({
        get currentTab() {
          return currentTab;
        },
        get editors() {
          return editors;
        },
        elements,
        showNotification,
      });
    }

    initSyntaxSelect();
    if (typeof initAdvancedSuggestions === "function") {
      initAdvancedSuggestions();
    }

    // Update preview and setup autosave
    updatePreview();
    setupAutoSave();
    configureBracketColors();

    Object.entries(editors).forEach(([tabKey, editor]) => {
      editor.onDidChangeModelContent(() => {
        updatePreview();
        saveToLocalStorage();

        // Synchronizuj edytowany kod z aktualnie wybranym plikiem w drzewie projektu
        if (projectTreeFiles && projectTreeFiles.length && projectTreeActiveFiles[tabKey]) {
          const activePath = projectTreeActiveFiles[tabKey];
          const fileObj = projectTreeFiles.find(f => f.relativePath === activePath || f.name === activePath);
          if (fileObj) {
            fileObj.content = editor.getValue();
            saveProjectTreeToStorage();
          }
        }
      });
    });

    if (
      initialHtml !== defaultContent.html ||
      initialCss !== defaultContent.css ||
      initialJs !== defaultContent.js
    ) {
      updateStatus("Restored previous session", 3000, "success");
      showNotification("Previous session restored.", "info");
    } else {
      showNotification("SYSTEM READY. Editor Loaded.", "success");
    }
  } catch (error) {
    console.error("Error creating editors:", error);
    showNotification("Editor creation error: " + error.message, "error");
  }
}

function loadInitialContent() { }

// --- Event Listeners ---
let contextMenuTab = null;

function hideTabContextMenu() {
  const menu = document.getElementById("tab-context-menu");
  if (menu) menu.style.display = "none";
  contextMenuTab = null;
}

function setupEventListeners() {
  const tabContextMenu = document.getElementById("tab-context-menu");
  const ctxFormatBtn = document.getElementById("tab-ctx-format");
  const ctxImportBtn = document.getElementById("tab-ctx-import-one");
  const ctxClearOneBtn = document.getElementById("tab-ctx-clear-one");
  const ctxClearAllBtn = document.getElementById("tab-ctx-clear-all");

  document.querySelectorAll(".editor-tab").forEach((tab) => {
    tab.addEventListener("click", (e) =>
      switchTab(e.currentTarget.dataset.tab, e.currentTarget),
    );

    tab.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const targetTab = tab.dataset.tab;
      contextMenuTab = targetTab;

      // Aktywuj klikniętą prawym przyciskiem zakładkę
      switchTab(targetTab, tab);

      if (tabContextMenu) {
        const lbl = targetTab.toUpperCase();
        if (ctxImportBtn) {
          const importSpan = ctxImportBtn.querySelector("span");
          if (importSpan) importSpan.textContent = `Wczytaj plik (${lbl})`;
        }
        if (ctxClearOneBtn) {
          const span = ctxClearOneBtn.querySelector("span");
          if (span) span.textContent = `Wyczyść bufor ${lbl}`;
        }
        tabContextMenu.style.display = "flex";

        const menuWidth = 200;
        const menuHeight = 150;
        let left = e.clientX;
        let top = e.clientY;

        if (left + menuWidth > window.innerWidth) {
          left = window.innerWidth - menuWidth - 8;
        }
        if (top + menuHeight > window.innerHeight) {
          top = window.innerHeight - menuHeight - 8;
        }

        tabContextMenu.style.left = `${Math.max(8, left)}px`;
        tabContextMenu.style.top = `${Math.max(8, top)}px`;
      }
    });
  });

  if (ctxFormatBtn) {
    ctxFormatBtn.addEventListener("click", () => {
      const tabToFormat = contextMenuTab || currentTab;
      hideTabContextMenu();
      formatCode(tabToFormat);
    });
  }

  if (ctxImportBtn) {
    ctxImportBtn.addEventListener("click", () => {
      hideTabContextMenu();
      openSingleFilePicker();
    });
  }

  if (ctxClearOneBtn) {
    ctxClearOneBtn.addEventListener("click", () => {
      const tabToClear = contextMenuTab || currentTab;
      hideTabContextMenu();
      clearSingleTab(tabToClear);
    });
  }

  if (ctxClearAllBtn) {
    ctxClearAllBtn.addEventListener("click", () => {
      hideTabContextMenu();
      cleanAll();
    });
  }

  document.addEventListener("click", (e) => {
    if (tabContextMenu && !tabContextMenu.contains(e.target)) {
      hideTabContextMenu();
    }
  });

  document.getElementById("new-btn").addEventListener("click", newProject);
  document.getElementById("save-btn").addEventListener("click", saveProject);
  document.getElementById("load-btn").addEventListener("click", loadProject);
  document
    .getElementById("download-btn")
    .addEventListener("click", downloadProject);
  document
    .getElementById("export-projects-btn")
    .addEventListener("click", exportSavedProjectsArchive);
  document
    .getElementById("import-projects-btn")
    .addEventListener("click", openImportProjectsPicker);
  document
    .getElementById("import-projects-input")
    .addEventListener("change", onImportProjectsFileSelected);
  document
    .getElementById("import-single-file-btn")
    ?.addEventListener("click", openSingleFilePicker);
  document
    .getElementById("import-single-file-input")
    ?.addEventListener("change", onSingleFileSelected);
  document
    .getElementById("import-folder-btn")
    ?.addEventListener("click", openFolderPicker);
  document
    .getElementById("import-folder-input")
    ?.addEventListener("change", onFolderSelected);
  document
    .getElementById("toggle-tree-btn")
    ?.addEventListener("click", toggleProjectTreePanel);
  document
    .getElementById("project-tree-close-btn")
    ?.addEventListener("click", closeProjectTreePanel);
  document
    .getElementById("project-tree-clear-btn")
    ?.addEventListener("click", clearProjectTree);
  elements.themeBtn.addEventListener("click", toggleTheme);

  document.getElementById("run-btn").addEventListener("click", runCode);
  document.getElementById("format-btn").addEventListener("click", formatCode);
  document.getElementById("clean-all-btn").addEventListener("click", cleanAll);
  document
    .getElementById("snippet-btn")
    .addEventListener("click", insertSnippet);
  document
    .getElementById("shortcuts-btn")
    .addEventListener("click", showShortcuts);
  document
    .getElementById("settings-btn")
    .addEventListener("click", showSettings);

  document
    .getElementById("refresh-btn")
    .addEventListener("click", refreshPreview);
  document
    .getElementById("new-window-btn")
    .addEventListener("click", openInNewWindow);

  document
    .getElementById("view-editor-btn")
    .addEventListener("click", () => switchView("editor"));
  document
    .getElementById("view-preview-btn")
    .addEventListener("click", () => switchView("preview"));
  document
    .getElementById("view-both-btn")
    .addEventListener("click", () => switchView("both"));

  elements.modal.cancelBtn.addEventListener("click", closeModal);
  elements.modal.container.addEventListener("click", (e) => {
    if (e.target === elements.modal.container) closeModal();
  });

  // Keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case "s":
          e.preventDefault();
          saveProject();
          break;
        case "n":
          e.preventDefault();
          newProject();
          break;
        case "o":
          e.preventDefault();
          loadProject();
          break;
        case "Enter":
          e.preventDefault();
          runCode();
          break;
        case "t":
          e.preventDefault();
          toggleTheme();
          break;
      }
    }
    if (e.key === "F1") {
      e.preventDefault();
      showShortcuts();
    }
    if (e.key === "F5") {
      e.preventDefault();
      refreshPreview();
    }

    if (
      e.key === "Escape" &&
      document.getElementById("tab-context-menu") &&
      document.getElementById("tab-context-menu").style.display !== "none"
    ) {
      e.preventDefault();
      hideTabContextMenu();
      return;
    }

    if (
      e.key === "Escape" &&
      document.querySelector(".ja-select-list.ja-visible")
    ) {
      e.preventDefault();
      closeAllJaSelectLists();
      return;
    }

    if (
      e.key === "Escape" &&
      elements.modal.container.classList.contains("visible")
    ) {
      e.preventDefault();
      closeModal();
    }
  });
}

// --- Core Functions ---

/** Domyślny język Monaca wg zakładki (tryb „Auto”) */
const SYNTAX_TAB_DEFAULTS = { html: "html", css: "scss", js: "javascript" };

function syncSyntaxSelectUI() {
  const btn = document.getElementById("syntaxSelectBtn");
  const list = document.getElementById("syntaxSelectList");
  const icon = document.getElementById("syntaxSelectIcon");
  const label = document.getElementById("syntaxSelectLabel");
  if (!btn || !list || !icon || !label) return;

  const tab = currentTab;
  const ed = editors[tab];
  const lang = ed?.getModel()?.getLanguageId() || SYNTAX_TAB_DEFAULTS[tab];
  const def = SYNTAX_TAB_DEFAULTS[tab];

  list.querySelectorAll(".ja-select-item").forEach((li) => {
    li.classList.remove("ja-selected");
    const v = li.dataset.value;
    let sel = false;
    if (v === "auto") {
      sel = lang === def;
    } else if (v === "css") {
      sel = ["css", "scss", "less"].includes(lang);
    } else {
      sel = lang === v;
    }
    if (sel) li.classList.add("ja-selected");
  });

  const selected = list.querySelector(".ja-select-item.ja-selected");
  if (selected) {
    const img = selected.querySelector("img");
    if (img) icon.src = img.src;
    label.textContent =
      selected.dataset.label ||
      selected.textContent.replace(/\s+/g, " ").trim();
  } else {
    label.textContent = lang ? String(lang).toUpperCase() : "—";
  }
}

function applySyntaxLanguage(value) {
  const tab = currentTab;
  const ed = editors[tab];
  if (!ed || !window.monaco) return;
  const model = ed.getModel();
  if (!model) return;

  const langId = value === "auto" ? SYNTAX_TAB_DEFAULTS[tab] : value;
  monaco.editor.setModelLanguage(model, langId);
  syncSyntaxSelectUI();
}

function initSyntaxSelect() {
  const wrap = document.getElementById("syntaxSelectContainer");
  const btn = document.getElementById("syntaxSelectBtn");
  const list = document.getElementById("syntaxSelectList");
  if (!wrap || !btn || !list) return;

  function closeSyntaxSelect() {
    btn.classList.remove("ja-open");
    list.classList.remove("ja-visible");
    btn.setAttribute("aria-expanded", "false");
  }

  function openSyntaxSelect() {
    document
      .querySelectorAll("#syntaxSelectContainer .ja-select-list.ja-visible")
      .forEach((l) => {
        if (l !== list) {
          l.classList.remove("ja-visible");
          l.previousElementSibling?.classList.remove("ja-open");
        }
      });
    btn.classList.add("ja-open");
    list.classList.add("ja-visible");
    btn.setAttribute("aria-expanded", "true");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (list.classList.contains("ja-visible")) closeSyntaxSelect();
    else openSyntaxSelect();
  });

  list.querySelectorAll(".ja-select-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const value = item.dataset.value;
      applySyntaxLanguage(value);
      closeSyntaxSelect();
    });
  });

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) closeSyntaxSelect();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSyntaxSelect();
  });

  syncSyntaxSelectUI();
}

function switchTab(tab, tabElement) {
  currentTab = tab;
  document.querySelectorAll(".editor-tab").forEach((t) => {
    t.classList.remove("active");
    if (t.parentElement && t.parentElement.classList.contains("btn-bg")) {
      t.parentElement.classList.remove("active");
    }
  });

  if (tabElement) {
    tabElement.classList.add("active");
    if (
      tabElement.parentElement &&
      tabElement.parentElement.classList.contains("btn-bg")
    ) {
      tabElement.parentElement.classList.add("active");
    }
  }

  document
    .querySelectorAll(".editor-content")
    .forEach((c) => c.classList.remove("active"));
  const targetEditorEl = document.getElementById(tab + "-editor");
  if (targetEditorEl) {
    targetEditorEl.classList.add("active");
  }

  if (editors[tab]) editors[tab].layout();

  updateStatus(`Active: ${tab.toUpperCase()}`, 3000, "info");
  syncSyntaxSelectUI();
}

let previewTimeout = null;

/**
 * Buduje kompletny, jednolity dokument HTML z zawartości edytorów HTML, CSS i JS.
 * Zapobiega zagnieżdżaniu <!DOCTYPE>, <html> i <body> wewnątrz innego dokumentu,
 * bezpiecznie oczyszcza znaczniki <script> w kodzie JS oraz zabezpiecza przed
 * przedwczesnym zamykaniem tagu <script> przez ciągi znaków "</script>" (co powodowało
 * wyrzucenie błędu i drukowanie kodu JS jako zwykłego tekstu w oknie preview).
 */
function buildCompleteHtml(isForPreview = false) {
  let rawHtml = editors.html ? editors.html.getValue() : "";
  const rawCss = editors.css ? editors.css.getValue() : "";
  const rawJs = editors.js ? editors.js.getValue() : "";

  // W trybie preview neutralizujemy relatywne <link rel="stylesheet" href="..."> (np. style.css, index.css),
  // które w srcdoc powodują zapytanie HTTP i błąd 404 w konsoli przeglądarki.
  // Jeśli w drzewie projektu (projectTreeFiles) lub w edytorze CSS mamy ten plik, wstawiamy go jako <style>.
  if (isForPreview && rawHtml) {
    rawHtml = rawHtml.replace(
      /<link\s+[^>]*rel=[\x27\x22]stylesheet[\x27\x22][^>]*>/gi,
      (linkTag) => {
        const hrefMatch = linkTag.match(/href=[\x27\x22]([^\x27\x22]+)[\x27\x22]/i);
        if (!hrefMatch) return linkTag;
        const href = hrefMatch[1].trim();

        // Zewnętrzne arkusze CDN (http, https, //) pozostawiamy bez zmian
        if (/^(https?:)?\/\//i.test(href) || href.startsWith("data:")) {
          return linkTag;
        }

        // Relatywny plik CSS (np. "style.css", "./styles.css")
        const cleanHref = href.replace(/^(\.\/|\/)+/, "");
        const fileName = cleanHref.split("/").pop();

        // 1. Sprawdź czy plik jest w drzewie projektu
        if (typeof projectTreeFiles !== "undefined" && Array.isArray(projectTreeFiles)) {
          const found = projectTreeFiles.find(
            (f) =>
              f.name.toLowerCase() === fileName.toLowerCase() ||
              (f.relativePath && f.relativePath.toLowerCase().endsWith(cleanHref.toLowerCase()))
          );
          if (found && typeof found.content === "string") {
            return `<style data-injected-from="${fileName}">\n${found.content}\n</style>`;
          }
        }

        // 2. Jeśli nazwa odpowiada stylowi z edytora CSS (style.css / index.css itp.), a edytor ma treść
        if (/^(style|index|styles|main)\.css$/i.test(fileName) && rawCss.trim()) {
          // Ten styl jest już wstrzykiwany przez styleBlock, więc bezpiecznie wyciszamy link zapobiegając 404
          return `<!-- Virtualized link: ${fileName} (injected from CSS editor) -->`;
        }

        return `<!-- Suppressed local stylesheet to prevent 404: ${fileName} -->`;
      }
    );
  }

  const styleBlock = rawCss.trim() ? `<style>\n${rawCss}\n</style>` : "";

  const bridgeBlock = isForPreview
    ? `
<script>
try {
    var _p = window.parent;
    if (_p && _p !== window) {
        _p.showAlertModal = _p.showAlertModal || alert;
    }
} catch(e) {}
window.onerror = function(msg, url, line, col, error) {
    console.error("Preview Script Error: " + msg + (line ? " (line " + line + ")" : ""));
};
window.addEventListener("unhandledrejection", function(event) {
    console.error("Preview Unhandled Rejection:", event.reason);
});
<\/script>`
    : "";

  let processedJs = (rawJs || "").trim();
  const externalScripts = [];

  if (processedJs) {
    // Wyodrębnij zewnętrzne znaczniki <script src="...">, jeśli użytkownik wkleił je do edytora JS
    processedJs = processedJs.replace(
      /<script\s+[^>]*src=[\x27\x22]([^\x27\x22]+)[\x27\x22][^>]*>(?:\s*<\/script>)?/gi,
      (match, src) => {
        externalScripts.push(`<script src="${src}"><\/script>`);
        return "";
      },
    );

    // Jeśli cały kod JS został opakowany w <script> ... </script>, usuń zewnętrzne tagi
    const startsWithScript = /^<script(?:\s+[^>]*)?>/i.test(processedJs);
    const endsWithScript = /<\/script>$/i.test(processedJs);
    if (startsWithScript && endsWithScript) {
      processedJs = processedJs
        .replace(/^<script(?:\s+[^>]*)?>/i, "")
        .replace(/<\/script>$/i, "")
        .trim();
    } else {
      // Usuń ewentualne samotne znaczniki <script> lub </script> na początku/końcu linii
      processedJs = processedJs
        .replace(/^\s*<script(?:\s+[^>]*)?>\s*$/gim, "")
        .replace(/^\s*<\/script>\s*$/gim, "");
    }

    // Bezpieczne escapowanie wystąpień "</script" w stringach/szablonach JS.
    // Zapobiega zamknięciu tagu <script> przez tokenizer HTML przeglądarki.
    processedJs = processedJs.replace(/<\/script/gi, "<\\/script");
  }

  const extScriptsHtml = externalScripts.length
    ? externalScripts.join("\n") + "\n"
    : "";
  const inlineScriptHtml = processedJs.trim()
    ? `<script>
try {
${processedJs}
} catch(e) {
    console.error("JavaScript Error:", e);
}
<\/script>`
    : "";

  const scriptBlock = (extScriptsHtml + inlineScriptHtml).trim();

  const isFullDoc = /<!DOCTYPE\s+html|<html[\s>]/i.test(rawHtml);

  if (isFullDoc) {
    let result = rawHtml;

    // Funkcja pomocnicza znajdująca zamykający tag HTML pomijając <script>, <style> i komentarze
    // (zapobiega dopasowaniu znaczników takich jak </head> czy </body> występujących w stringach JS)
    const findClosingTagOutsideBlocks = (htmlStr, tagName) => {
      const tokenRegex = new RegExp(
        `<!--[\\s\\S]*?-->|<script(?:\\s+[^>]*)?>[\\s\\S]*?<\\/script>|<style(?:\\s+[^>]*)?>[\\s\\S]*?<\\/style>|<\\/${tagName}\\s*>`,
        "gi",
      );
      let match;
      let lastRealIndex = -1;
      while ((match = tokenRegex.exec(htmlStr)) !== null) {
        if (match[0].toLowerCase().startsWith(`</${tagName.toLowerCase()}`)) {
          lastRealIndex = match.index;
        }
      }
      return lastRealIndex;
    };

    // Wstrzyknięcie mostka preview i stylów do sekcji <head>
    const headInjection =
      (bridgeBlock ? bridgeBlock + "\n" : "") +
      (styleBlock ? styleBlock + "\n" : "");
    if (headInjection) {
      const headCloseIdx = findClosingTagOutsideBlocks(result, "head");
      if (headCloseIdx !== -1) {
        result =
          result.slice(0, headCloseIdx) +
          headInjection +
          result.slice(headCloseIdx);
      } else {
        const headOpenMatch = result.match(/<head(?:\s+[^>]*)?>/i);
        if (headOpenMatch) {
          const insertPos =
            result.indexOf(headOpenMatch[0]) + headOpenMatch[0].length;
          result =
            result.slice(0, insertPos) +
            "\n" +
            headInjection +
            result.slice(insertPos);
        } else {
          result = headInjection + result;
        }
      }
    }

    // Wstrzyknięcie skryptów przed właściwy zamykający </body> (lub </html>)
    if (scriptBlock) {
      const lastBodyIdx = findClosingTagOutsideBlocks(result, "body");
      if (lastBodyIdx !== -1) {
        result =
          result.slice(0, lastBodyIdx) +
          scriptBlock +
          "\n" +
          result.slice(lastBodyIdx);
      } else {
        const lastHtmlIdx = findClosingTagOutsideBlocks(result, "html");
        if (lastHtmlIdx !== -1) {
          result =
            result.slice(0, lastHtmlIdx) +
            scriptBlock +
            "\n" +
            result.slice(lastHtmlIdx);
        } else {
          result = result + "\n" + scriptBlock;
        }
      }
    }

    return result;
  }

  return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${bridgeBlock}
    ${styleBlock}
</head>
<body>
${rawHtml}
${scriptBlock}
</body>
</html>`;
}

function updatePreview() {
  if (previewTimeout) {
    clearTimeout(previewTimeout);
  }

  previewTimeout = setTimeout(() => {
    elements.previewIframe.srcdoc = buildCompleteHtml(true);
    updateStatus("Compiled.", 1000, "success");
  }, 300);
}

function runCode() {
  updatePreview();
  showNotification("Code executed.", "success");
}

function refreshPreview() {
  updatePreview();
  showNotification("Preview refreshed.", "info");
}

// --- Project Management Functions ---
function newProject() {
  showConfirmModal(
    "Nowy projekt",
    "Rozpocząć nowy projekt? Niezapisane zmiany w buforach edytora zostaną zastąpione szablonem startowym.",
    () => {
      editors.html.setValue(defaultContent.html);
      editors.css.setValue(defaultContent.css);
      editors.js.setValue(defaultContent.js);
      updatePreview();
      flushAutoSaveNow();
      showNotification("Utworzono nowy projekt.", "success");

      setTimeout(() => {
        if (editors[currentTab]) {
          editors[currentTab].layout();
          editors[currentTab].focus();
        }
      }, 50);
    },
    "UTWÓRZ",
    "btn-primary",
  );
}

function saveProject() {
  showSaveProjectModal();
}

function getProjectCategoryIconClass(category) {
  const c = String(category || "Website")
    .trim()
    .toLowerCase();
  if (c === "component") return "fas fa-cube";
  if (c === "experiment") return "fas fa-flask";
  return "fas fa-globe";
}

function getArchiveSourceIconClass(p) {
  return p.fromGithub === true ? "fab fa-github" : "fas fa-hdd";
}

function getArchiveSourceLabel(p) {
  return p.fromGithub === true
    ? "Import / sync: GitHub"
    : "Tylko lokalnie (dysk)";
}

function showSaveProjectModal() {
  const modalHTML = `
        <div class="modal-body-main">
        <p class="save-archive-hint">
            Zapis bieżącego kodu (HTML, CSS, JS) do <strong style="color:var(--text-color)">lokalnej biblioteki</strong> w tej przeglądarce.
        </p>
        <div class="command-center-grid">
            <div class="info-card">
                <div class="card-header"><span>NAZWA PROJEKTU</span></div>
                <input type="text" id="project-name" class="modal-input" placeholder="np. mój-layout-cyber" autocomplete="off">
            </div>
             <div class="info-card">
                <div class="card-header"><span>KATEGORIA</span></div>
                 <select id="project-category" class="setting-select-input archive-category-select" aria-label="Kategoria projektu">
                    <option value="Website" data-ja-icon="fas fa-globe" selected>Strona (Website)</option>
                    <option value="Component" data-ja-icon="fas fa-cube">Komponent</option>
                    <option value="Experiment" data-ja-icon="fas fa-flask">Eksperyment</option>
                </select>
            </div>
        </div>
        </div>
        <div class="modal-body-actions">
            <button type="button" class="btn modal-action-btn" onclick="closeModal()">
                <i class="fas fa-xmark modal-action-btn__icon" aria-hidden="true"></i>
                <span class="modal-action-btn__label">ANULUJ</span>
            </button>
            <button type="button" class="btn btn-primary modal-action-btn" onclick="confirmSaveProject()">
                <i class="fas fa-floppy-disk modal-action-btn__icon" aria-hidden="true"></i>
                <span class="modal-action-btn__label">ZAPISZ</span>
            </button>
        </div>
    `;
  showCustomModal(
    "Zapis w bibliotece",
    modalHTML,
    () => {
      initSettingJaSelects(elements.modal.body);
      const nameEl = document.getElementById("project-name");
      if (nameEl) nameEl.focus();
    },
    "archive-modal",
  );
}

function confirmSaveProject() {
  const nameEl = document.getElementById("project-name");
  const catEl = document.getElementById("project-category");
  if (!nameEl || !catEl) return;

  const name = nameEl.value.trim();
  const category = catEl.value || "Website";

  if (!name) {
    showNotification("Podaj nazwę projektu.", "warning");
    return;
  }

  const project = {
    id: Date.now(),
    name: name,
    category: category,
    html: editors.html.getValue(),
    css: editors.css.getValue(),
    js: editors.js.getValue(),
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    fromGithub: false,
  };

  let projects;
  try {
    projects = JSON.parse(localStorage.getItem("savedProjects") || "[]");
  } catch (e) {
    showNotification("Błąd odczytu biblioteki: " + e.message, "error");
    return;
  }

  const existingIndex = projects.findIndex(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  );

  const escArchive = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  function persistProjectList(list) {
    try {
      localStorage.setItem("savedProjects", JSON.stringify(list));
      closeModal();
      showNotification(`Zapisano w bibliotece: „${name}”.`, "success");
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        showNotification(
          "Brak miejsca w pamięci przeglądarki. Usuń stare wpisy z biblioteki i spróbuj ponownie.",
          "error",
        );
      } else {
        showNotification("Zapis nie powiódł się: " + e.message, "error");
      }
    }
  }

  if (existingIndex !== -1) {
    closeModal();
    setTimeout(() => {
      showConfirmModal(
        "Nadpisanie wpisu",
        `Projekt <strong style="color:var(--highlight)">${escArchive(name)}</strong> już jest w bibliotece. Nadpisać zawartość HTML, CSS i JS?`,
        () => {
          try {
            const list = JSON.parse(
              localStorage.getItem("savedProjects") || "[]",
            );
            const idx = list.findIndex(
              (p) => p.name.toLowerCase() === name.toLowerCase(),
            );
            if (idx === -1) {
              showNotification(
                "Nie znaleziono wpisu — zapis anulowany.",
                "warning",
              );
              return;
            }
            const merged = { ...project };
            merged.id = list[idx].id;
            merged.created = list[idx].created;
            merged.fromGithub = false;
            list[idx] = merged;
            persistProjectList(list);
          } catch (err) {
            showNotification("Błąd zapisu: " + err.message, "error");
            console.error("Overwrite save error:", err);
          }
        },
        "NADPISZ",
        "btn-danger",
      );
    }, 220);
    return;
  }

  projects.push(project);
  try {
    persistProjectList(projects);
  } catch (e) {
    showNotification("Błąd zapisu: " + e.message, "error");
    console.error("Save error:", e);
  }
}

function loadProject() {
  try {
    const projects = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    if (projects.length === 0) {
      closeModal();
      showNotification("Brak zapisanych projektów.", "info");
      return;
    }

    const sortedProjects = [...projects].sort((a, b) => {
      const dateA = new Date(a.modified || a.created);
      const dateB = new Date(b.modified || b.created);
      return dateB - dateA;
    });

    const listIntro = `<p class="load-archive-hint">Kliknij kartę, aby wczytać projekt do edytorów. <strong>Kosz</strong> — trwałe usunięcie z biblioteki.</p>`;

    const listHTML =
      listIntro +
      sortedProjects
        .map((p) => {
          const originalIndex = projects.findIndex((proj) => proj.id === p.id);
          const modified = p.modified || p.created;
          const category = p.category || "Website";
          const sourceIcon = getArchiveSourceIconClass(p);
          const sourceMod = p.fromGithub === true ? "github" : "local";
          const sourceTitle = getArchiveSourceLabel(p);
          const categoryIcon = getProjectCategoryIconClass(category);
          const esc = (s) =>
            String(s)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
          const nameSafe = esc(p.name);
          const categorySafe = esc(category);
          return `
                <div class="info-card project-card-clickable archive-card" onclick="loadProjectByIndex(${originalIndex})" onmouseenter="this.querySelector('.delete-btn-container').style.opacity='1'" onmouseleave="this.querySelector('.delete-btn-container').style.opacity='0'">
                    <div class="archive-card-top">
                        <div class="archive-card-icon archive-card-source--${sourceMod}" title="${esc(sourceTitle)}"><i class="${sourceIcon}" aria-hidden="true"></i></div>
                        <div class="archive-card-meta">
                            <span class="archive-card-category"><i class="${categoryIcon} archive-card-category-icon" aria-hidden="true"></i> ${categorySafe}</span>
                            <span class="archive-card-time"><i class="fas fa-clock"></i> ${new Date(modified).toLocaleTimeString()}</span>
                        </div>
                    </div>
                    <div class="archive-card-bottom">
                        <div class="archive-card-name" title=${JSON.stringify(p.name)}>${nameSafe}</div>
                        <div class="archive-card-date">${new Date(modified).toLocaleDateString()}</div>
                    </div>
                    <div class="delete-btn-container">
                        <button class="btn btn-icon btn-danger" onclick="event.stopPropagation(); deleteProject(${originalIndex});" title="Usuń z biblioteki">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        })
        .join("");

    showCustomModal(
      "Biblioteka projektów",
      listHTML,
      null,
      "load-archive-modal",
    );
  } catch (e) {
    showNotification("Błąd listy projektów: " + e.message, "error");
    console.error("Load error:", e);
  }
}

function loadProjectByIndex(index) {
  try {
    const projects = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    const p = projects[index];
    if (!p) {
      showNotification("Nie znaleziono projektu.", "error");
      return;
    }

    const projectToLoad = p;
    closeModal();

    setTimeout(() => {
      const escN = (s) =>
        String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      showConfirmModal(
        "Wczytaj projekt",
        `Wczytać <strong style="color:var(--highlight)">${escN(projectToLoad.name)}</strong> do edytorów?<br><br>Bieżąca, <strong>niezapisana</strong> treść w buforach zostanie zastąpiona.`,
        () => {
          try {
            editors.html.setValue(projectToLoad.html || "");
            editors.css.setValue(projectToLoad.css || "");
            editors.js.setValue(projectToLoad.js || "");
            updatePreview();
            flushAutoSaveNow();
            showNotification(`Wczytano: „${projectToLoad.name}”.`, "success");

            setTimeout(() => {
              if (editors[currentTab]) {
                editors[currentTab].layout();
                editors[currentTab].focus();
              }
            }, 50);
          } catch (e) {
            showNotification("Błąd wczytywania: " + e.message, "error");
            console.error("Load project error:", e);
          }
        },
        "WCZYTAJ",
        "btn-primary",
      );
    }, 350);
  } catch (e) {
    showNotification("Error loading project: " + e.message, "error");
    console.error("Load project error:", e);
  }
}

function deleteProject(index) {
  let projectToDelete = null;
  try {
    const projects = JSON.parse(
      localStorage.getItem("savedProjects") || "[]",
    );
    if (index >= 0 && index < projects.length) {
      projectToDelete = projects[index];
    }
  } catch (e) {
    console.error("Delete lookup error:", e);
  }

  if (!projectToDelete) {
    showNotification("Nie znaleziono projektu do usunięcia.", "error");
    return;
  }

  const projectName = projectToDelete.name;
  const isGhConfigured =
    typeof CyberGitHubProjects !== "undefined" &&
    typeof CyberGitHubProjects.isConfigured === "function" &&
    CyberGitHubProjects.isConfigured() &&
    CyberGitHubProjects.loadConfig().syncDelete !== false;

  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const confirmMsg = isGhConfigured
    ? `Usunąć wpis <strong style="color:var(--highlight)">„${esc(projectName)}”</strong> z biblioteki lokalnej <strong>oraz z pliku w repozytorium GitHub</strong>?<br><br>Tej operacji nie cofniesz.`
    : `Usunąć wpis <strong style="color:var(--highlight)">„${esc(projectName)}”</strong> z biblioteki lokalnej? Tej operacji nie cofniesz w aplikacji.`;

  showConfirmModal(
    "Usuń projekt",
    confirmMsg,
    async () => {
      try {
        const projects = JSON.parse(
          localStorage.getItem("savedProjects") || "[]",
        );
        const foundIdx = projects.findIndex(
          (p) =>
            (projectToDelete.id != null && p.id === projectToDelete.id) ||
            (p.name && p.name === projectName),
        );
        const idxToRemove = foundIdx !== -1 ? foundIdx : index;

        if (idxToRemove >= 0 && idxToRemove < projects.length) {
          projects.splice(idxToRemove, 1);
          localStorage.setItem("savedProjects", JSON.stringify(projects));
          loadProject();
        }

        if (isGhConfigured) {
          showNotification(
            `Usunięto „${projectName}” lokalnie. Usuwanie z GitHub…`,
            "info",
          );
          if (typeof setGithubPanelStatus === "function") {
            setGithubPanelStatus(`Usuwanie „${projectName}” z GitHub…`);
          }
          try {
            const res =
              await CyberGitHubProjects.deleteRemoteProject(projectToDelete);
            if (res.removed) {
              const successText = `Usunięto „${projectName}” z biblioteki i z GitHub (${res.count} pozostało).`;
              showNotification(successText, "success");
              if (typeof setGithubPanelStatus === "function") {
                setGithubPanelStatus(successText);
              }
            } else {
              const infoText =
                res.message ||
                `Usunięto „${projectName}” lokalnie (brak wpisu w repozytorium GitHub).`;
              showNotification(infoText, "info");
              if (typeof setGithubPanelStatus === "function") {
                setGithubPanelStatus(infoText);
              }
            }
          } catch (ghErr) {
            const errText = `Usunięto lokalnie, ale błąd GitHub: ${ghErr.message}`;
            showNotification(errText, "warning");
            if (typeof setGithubPanelStatus === "function") {
              setGithubPanelStatus(errText);
            }
            console.error("GitHub delete error:", ghErr);
          }
        } else {
          showNotification(`Usunięto: „${projectName}”.`, "success");
        }
      } catch (e) {
        showNotification("Błąd usuwania: " + e.message, "error");
        console.error("Delete error:", e);
      }
    },
    "USUŃ",
    "btn-danger",
  );
}

function downloadProject() {
  const fullHtml = buildCompleteHtml(false);
  const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project_export.html";
  a.click();
  URL.revokeObjectURL(url);
  showNotification("Pobrano plik HTML podglądu.", "success");
}

// --- Import / export zapisanych projektów (localStorage savedProjects) ---
const CYBER_PROJECTS_EXPORT_VERSION = 1;
const CYBER_PROJECTS_FILE_MARKER = "cyberCodeProjectsExport";

function normalizeImportedProjects(data) {
  let raw;
  if (Array.isArray(data)) {
    raw = data;
  } else if (data && Array.isArray(data.projects)) {
    raw = data.projects;
  } else {
    throw new Error(
      "Nieprawidłowy format pliku (oczekiwano tablicy lub { projects: [...] }).",
    );
  }
  return raw.map((p, i) => ({
    id: typeof p.id === "number" ? p.id : Date.now() + i,
    name: String(p.name || `Project ${i + 1}`).trim() || `Project ${i + 1}`,
    category: String(p.category || "Website"),
    html: String(p.html ?? ""),
    css: String(p.css ?? ""),
    js: String(p.js ?? ""),
    created: p.created || new Date().toISOString(),
    modified: p.modified || new Date().toISOString(),
    fromGithub: false,
  }));
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
      fromGithub: false,
      id: Date.now() + Math.floor(Math.random() * 1e9),
      name,
      modified: new Date().toISOString(),
    });
  });
  return out;
}

function exportSavedProjectsArchive() {
  try {
    const projects = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    if (!projects.length) {
      showNotification("Brak zapisanych projektów do eksportu.", "warning");
      return;
    }
    const payload = {
      [CYBER_PROJECTS_FILE_MARKER]: true,
      version: CYBER_PROJECTS_EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      projects,
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const d = new Date();
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    a.href = url;
    a.download = `cyber-code-projects-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification(`Eksport: ${projects.length} projekt(ów).`, "success");
  } catch (e) {
    showNotification("Eksport nie powiódł się: " + e.message, "error");
    console.error(e);
  }
}

let pendingImportProjects = null;

function applyProjectsImport(mode) {
  if (!pendingImportProjects || !pendingImportProjects.length) {
    showNotification("Brak danych importu.", "error");
    return;
  }
  try {
    const incoming = pendingImportProjects;
    pendingImportProjects = null;

    if (mode === "replace") {
      const base = Date.now();
      const replaced = incoming.map((p, i) => ({
        ...p,
        id: base + i,
        fromGithub: false,
      }));
      localStorage.setItem("savedProjects", JSON.stringify(replaced));
      showNotification(
        `Zastąpiono bibliotekę: ${replaced.length} projekt(ów).`,
        "success",
      );
      return;
    }

    const existing = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    const merged = mergeProjectLists(existing, incoming);
    localStorage.setItem("savedProjects", JSON.stringify(merged));
    showNotification(
      `Scalono: dodano ${incoming.length} projekt(ów) (łącznie ${merged.length}).`,
      "success",
    );
  } catch (e) {
    showNotification("Import nie powiódł się: " + e.message, "error");
    console.error(e);
  }
}
window.applyProjectsImport = applyProjectsImport;

function openImportProjectsPicker() {
  const input = document.getElementById("import-projects-input");
  if (input) input.click();
}

function onImportProjectsFileSelected(ev) {
  const file = ev.target.files && ev.target.files[0];
  ev.target.value = "";
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      const projects = normalizeImportedProjects(data);
      if (projects.length === 0) {
        showNotification("Plik nie zawiera projektów.", "warning");
        return;
      }
      pendingImportProjects = projects;
      const html = `
                <div class="modal-body-main">
                <p>Znaleziono <strong style="color:var(--highlight)">${projects.length}</strong> projekt(ów).</p>
                <p style="margin-top:10px; font-size:0.85rem; color:var(--text-muted); line-height:1.4;">
                    <strong>Scal</strong> — dopisz do istniejącej listy (powtarzające się nazwy dostaną sufiks <code>(import N)</code>).<br>
                    <strong>Zastąp wszystko</strong> — usuń obecną bibliotekę i wstaw tylko import (nieodwracalne).
                </p>
                </div>
                <div class="modal-body-actions">
                    <div class="btn-bg">
                        <button type="button" class="btn modal-action-btn" onclick="closeModal(); applyProjectsImport('merge');">
                            <i class="fas fa-layer-group modal-action-btn__icon" aria-hidden="true"></i>
                            <span class="modal-action-btn__label">SCAL</span>
                        </button>
                    </div>
                    <div class="btn-bg">
                        <button type="button" class="btn btn-danger modal-action-btn" onclick="closeModal(); applyProjectsImport('replace');">
                            <i class="fas fa-triangle-exclamation modal-action-btn__icon" aria-hidden="true"></i>
                            <span class="modal-action-btn__label">ZASTĄP WSZYSTKO</span>
                        </button>
                    </div>
                </div>
            `;
      showCustomModal("IMPORT PROJEKTÓW", html, null, "archive-modal");
    } catch (e) {
      pendingImportProjects = null;
      showNotification("Nie można wczytać pliku: " + e.message, "error");
      console.error(e);
    }
  };
  reader.onerror = () => {
    showNotification("Błąd odczytu pliku.", "error");
  };
  reader.readAsText(file, "UTF-8");
}

function openSingleFilePicker() {
  const input = document.getElementById("import-single-file-input");
  if (input) input.click();
}

function onSingleFileSelected(ev) {
  const file = ev.target.files && ev.target.files[0];
  ev.target.value = "";
  if (!file) return;

  const fileName = file.name.toLowerCase();
  let targetTab = null;
  if (fileName.endsWith(".html") || fileName.endsWith(".htm")) {
    targetTab = "html";
  } else if (fileName.endsWith(".css")) {
    targetTab = "css";
  } else if (fileName.endsWith(".js") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs")) {
    targetTab = "js";
  }

  if (!targetTab) {
    showNotification("Wybierz plik z rozszerzeniem .html, .css lub .js.", "warning");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const code = String(reader.result ?? "");
      const tabLabel = targetTab.toUpperCase();

      showConfirmModal(
        `Wczytaj ${file.name}`,
        `Wczytać zawartość pliku <strong style="color:var(--highlight)">${file.name}</strong> do bufora <strong>${tabLabel}</strong>?<br><br>Dotychczasowa treść tej zakładki zostanie zastąpiona.`,
        () => {
          if (editors[targetTab]) {
            editors[targetTab].setValue(code);
            switchTab(targetTab);
            updatePreview();
            flushAutoSaveNow();
            showNotification(`Wczytano plik „${file.name}” do bufora ${tabLabel}.`, "success");
          }
        },
        "WCZYTAJ",
        "btn-primary",
      );
    } catch (err) {
      showNotification("Błąd wczytywania pliku: " + err.message, "error");
      console.error(err);
    }
  };
  reader.onerror = () => {
    showNotification("Błąd odczytu pliku.", "error");
  };
  reader.readAsText(file, "UTF-8");
}

function openFolderPicker() {
  const input = document.getElementById("import-folder-input");
  if (input) input.click();
}

// --- Project File Tree Explorer State ---
const STORAGE_KEY_PROJECT_TREE = "cyberProjectTreeState";
let projectTreeFiles = [];
let projectTreeActivePath = null;
let projectTreeActiveFiles = { html: null, css: null, js: null };
let projectTreeRootName = "PROJEKT";

function saveProjectTreeToStorage() {
  try {
    if (!projectTreeFiles || !projectTreeFiles.length) {
      localStorage.removeItem(STORAGE_KEY_PROJECT_TREE);
      return;
    }
    const state = {
      rootName: projectTreeRootName || "PROJEKT",
      files: projectTreeFiles,
      activePath: projectTreeActivePath,
      activeFiles: projectTreeActiveFiles,
    };
    localStorage.setItem(STORAGE_KEY_PROJECT_TREE, JSON.stringify(state));
  } catch (e) {
    console.warn("Nie udało się zapisać drzewa plików do localStorage:", e);
  }
}

function loadProjectTreeFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECT_TREE);
    if (!raw) return false;
    const state = JSON.parse(raw);
    if (!state || !Array.isArray(state.files) || !state.files.length) return false;

    projectTreeRootName = state.rootName || "PROJEKT";
    projectTreeFiles = state.files;
    projectTreeActivePath = state.activePath || null;
    projectTreeActiveFiles = state.activeFiles || { html: null, css: null, js: null };

    renderProjectFileTree(projectTreeRootName, projectTreeFiles, false);
    return true;
  } catch (e) {
    console.warn("Błąd odczytu drzewa plików z localStorage:", e);
    return false;
  }
}

function toggleProjectTreePanel() {
  const panel = document.getElementById("project-tree-panel");
  const btn = document.getElementById("toggle-tree-btn");
  if (!panel) return;
  const isHidden = panel.style.display === "none";
  panel.style.display = isHidden ? "flex" : "none";
  if (btn) btn.classList.toggle("active", isHidden);
  if (editors[currentTab]) {
    setTimeout(() => editors[currentTab].layout(), 50);
  }
}

function closeProjectTreePanel() {
  const panel = document.getElementById("project-tree-panel");
  const btn = document.getElementById("toggle-tree-btn");
  if (panel) panel.style.display = "none";
  if (btn) btn.classList.remove("active");
  if (editors[currentTab]) {
    setTimeout(() => editors[currentTab].layout(), 50);
  }
}

function openProjectTreePanel() {
  const panel = document.getElementById("project-tree-panel");
  const btn = document.getElementById("toggle-tree-btn");
  if (panel) panel.style.display = "flex";
  if (btn) {
    btn.style.display = "inline-flex";
    btn.classList.add("active");
  }
  if (editors[currentTab]) {
    setTimeout(() => editors[currentTab].layout(), 50);
  }
}

function clearProjectTree() {
  if (!projectTreeFiles || !projectTreeFiles.length) {
    closeProjectTreePanel();
    const btn = document.getElementById("toggle-tree-btn");
    if (btn) btn.style.display = "none";
    return;
  }

  showConfirmModal(
    "Wyczyść listę plików",
    `Zamknąć bieżące drzewo projektu (<strong>${projectTreeFiles.length}</strong> plików) i wyczyścić listę?<br><br>Zawartość otwartych buforów edytora nie zostanie skasowana.`,
    () => {
      projectTreeFiles = [];
      projectTreeActivePath = null;
      projectTreeActiveFiles = { html: null, css: null, js: null };
      projectTreeRootName = "PROJEKT";
      const treeBody = document.getElementById("project-tree-body");
      if (treeBody) treeBody.innerHTML = "";
      closeProjectTreePanel();
      const btn = document.getElementById("toggle-tree-btn");
      if (btn) {
        btn.style.display = "none";
        btn.classList.remove("active");
      }
      saveProjectTreeToStorage();
      showNotification("Wyczyszczono listę plików projektu.", "info");
    },
    "WYCZYŚĆ LISTĘ",
    "btn-danger"
  );
}

function buildFileTreeStructure(files) {
  // Buduje zagnieżdżone drzewo katalogów i plików
  const root = { name: "root", type: "folder", children: {} };

  files.forEach((f) => {
    const rawPath = f.relativePath || f.name;
    const parts = rawPath.replace(/\\/g, "/").split("/").filter(Boolean);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        current.children[part] = {
          name: part,
          type: "file",
          fileData: f,
          path: rawPath
        };
      } else {
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            type: "folder",
            children: {}
          };
        }
        current = current.children[part];
      }
    }
  });

  return root;
}

function renderTreeBranch(node, container, depth = 0) {
  const sortedKeys = Object.keys(node.children).sort((a, b) => {
    const itemA = node.children[a];
    const itemB = node.children[b];
    if (itemA.type !== itemB.type) {
      return itemA.type === "folder" ? -1 : 1; // foldery najpierw
    }
    return itemA.name.localeCompare(itemB.name);
  });

  sortedKeys.forEach((key) => {
    const item = node.children[key];
    const row = document.createElement("div");
    row.className = "tree-node-row";
    row.style.paddingLeft = `${depth * 14 + 6}px`;

    if (item.type === "folder") {
      const caret = document.createElement("i");
      caret.className = "fas fa-chevron-down tree-folder-caret";

      const folderIcon = document.createElement("i");
      folderIcon.className = "fas fa-folder-open tree-node-icon icon-folder";

      const label = document.createElement("span");
      label.className = "tree-node-name";
      label.textContent = item.name;

      row.appendChild(caret);
      row.appendChild(folderIcon);
      row.appendChild(label);
      container.appendChild(row);

      const childrenContainer = document.createElement("div");
      childrenContainer.className = "tree-folder-children";
      container.appendChild(childrenContainer);

      row.addEventListener("click", () => {
        const isCollapsed = childrenContainer.style.display === "none";
        childrenContainer.style.display = isCollapsed ? "flex" : "none";
        caret.className = isCollapsed
          ? "fas fa-chevron-down tree-folder-caret"
          : "fas fa-chevron-right tree-folder-caret";
        folderIcon.className = isCollapsed
          ? "fas fa-folder-open tree-node-icon icon-folder"
          : "fas fa-folder tree-node-icon icon-folder";
      });

      renderTreeBranch(item, childrenContainer, depth + 1);
    } else {
      const f = item.fileData;
      let iconClass = "far fa-file tree-node-icon";
      let iconType = "";
      const lower = item.name.toLowerCase();
      if (lower.endsWith(".html") || lower.endsWith(".htm")) {
        iconClass = "fab fa-html5 tree-node-icon icon-html";
        iconType = "html";
      } else if (lower.endsWith(".css")) {
        iconClass = "fab fa-css3-alt tree-node-icon icon-css";
        iconType = "css";
      } else if (lower.endsWith(".js") || lower.endsWith(".mjs") || lower.endsWith(".cjs")) {
        iconClass = "fab fa-js tree-node-icon icon-js";
        iconType = "js";
      }

      const emptySpacer = document.createElement("span");
      emptySpacer.style.width = "10px";
      emptySpacer.style.display = "inline-block";

      const fileIcon = document.createElement("i");
      fileIcon.className = iconClass;

      const label = document.createElement("span");
      label.className = "tree-node-name";
      label.textContent = item.name;
      label.title = item.path;

      row.appendChild(emptySpacer);
      row.appendChild(fileIcon);
      row.appendChild(label);

      if (projectTreeActivePath === item.path) {
        row.classList.add("active");
      }

      row.addEventListener("click", () => {
        document.querySelectorAll(".tree-node-row").forEach(r => r.classList.remove("active"));
        row.classList.add("active");
        projectTreeActivePath = item.path;
        loadProjectTreeFileIntoEditor(f);
      });

      container.appendChild(row);
    }
  });
}

function loadProjectTreeFileIntoEditor(treeFile) {
  if (!treeFile) return;
  const fileName = treeFile.name.toLowerCase();
  let targetTab = "html";
  if (fileName.endsWith(".css")) {
    targetTab = "css";
  } else if (fileName.endsWith(".js") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs")) {
    targetTab = "js";
  }

  // Zapisz bieżący plik w tablicy per zakładka
  const currentPath = treeFile.relativePath || treeFile.name;
  projectTreeActiveFiles[targetTab] = currentPath;

  if (editors[targetTab]) {
    editors[targetTab].setValue(treeFile.content);
    switchTab(targetTab);
    updatePreview();
    flushAutoSaveNow();
    saveProjectTreeToStorage();
    showNotification(`Załadowano: ${currentPath}`, "info");
  }
}

function renderProjectFileTree(rootFolderName, files, shouldOpen = true) {
  const treeBody = document.getElementById("project-tree-body");
  const rootTitle = document.getElementById("project-tree-root-name");
  if (!treeBody) return;

  if (rootFolderName) {
    projectTreeRootName = rootFolderName;
  }
  if (rootTitle) {
    rootTitle.textContent = projectTreeRootName || "PROJEKT";
  }

  treeBody.innerHTML = "";
  const treeRoot = buildFileTreeStructure(files);
  renderTreeBranch(treeRoot, treeBody, 0);

  const btn = document.getElementById("toggle-tree-btn");
  if (btn) {
    btn.style.display = "inline-flex";
  }

  if (shouldOpen) {
    openProjectTreePanel();
  } else {
    // Zachowaj panel otwarty, jeśli użytkownik miał go otwarty
    const panel = document.getElementById("project-tree-panel");
    if (panel && panel.style.display === "none") {
      openProjectTreePanel();
    }
  }

  saveProjectTreeToStorage();
}

async function onFolderSelected(ev) {
  const files = Array.from(ev.target.files || []);
  ev.target.value = "";
  if (!files.length) return;

  // Filtruj pliki tekstowe projektu (HTML, CSS, JS)
  const codeFiles = files.filter(f => /\.(html|htm|css|js|mjs|cjs)$/i.test(f.name));

  if (!codeFiles.length) {
    showNotification("W wybranym folderze nie znaleziono plików .html, .css ani .js.", "warning");
    return;
  }

  const readFileText = (f) => new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result ?? ""));
    r.onerror = () => resolve("");
    r.readAsText(f, "UTF-8");
  });

  try {
    const fileEntries = await Promise.all(codeFiles.map(async (f) => {
      const content = await readFileText(f);
      return {
        name: f.name,
        relativePath: f.webkitRelativePath || f.name,
        size: f.size,
        content: content
      };
    }));

    projectTreeFiles = fileEntries;

    const htmlFiles = fileEntries.filter(f => /\.(html|htm)$/i.test(f.name));
    const cssFiles = fileEntries.filter(f => /\.css$/i.test(f.name));
    const jsFiles = fileEntries.filter(f => /\.(js|mjs|cjs)$/i.test(f.name));

    const pickBest = (list, preferredNames) => {
      if (!list.length) return null;
      for (const name of preferredNames) {
        const found = list.find(f => f.name.toLowerCase() === name.toLowerCase());
        if (found) return found;
      }
      return list.slice().sort((a, b) => {
        const depthA = a.relativePath.split("/").length;
        const depthB = b.relativePath.split("/").length;
        return depthA - depthB;
      })[0];
    };

    const selectedHtml = pickBest(htmlFiles, ["index.html", "main.html", "app.html"]);
    const selectedCss = pickBest(cssFiles, ["style.css", "index.css", "styles.css", "main.css"]);
    const selectedJs = pickBest(jsFiles, ["index.js", "script.js", "main.js", "app.js"]);

    const folderName = (files[0].webkitRelativePath ? files[0].webkitRelativePath.split("/")[0] : "folder");
    const summaryItems = [];
    if (selectedHtml) summaryItems.push(`HTML: <strong>${selectedHtml.relativePath}</strong>`);
    if (selectedCss) summaryItems.push(`CSS: <strong>${selectedCss.relativePath}</strong>`);
    if (selectedJs) summaryItems.push(`JS: <strong>${selectedJs.relativePath}</strong>`);

    const hasMultipleFiles = fileEntries.length > 1;

    let msg = `W folderze <strong style="color:var(--highlight)">${folderName}</strong> znaleziono <strong>${fileEntries.length}</strong> plików projektu.<br><br>` +
      `<ul style="margin: 8px 0; padding-left: 20px; line-height: 1.6;">` +
      summaryItems.map(item => `<li>${item}</li>`).join("") +
      `</ul>`;

    if (hasMultipleFiles) {
      msg += `<br><span style="color:var(--highlight);"><i class="fas fa-sitemap"></i> Zostanie otwarte drzewo plików z pełną strukturą folderu.</span>`;
    }

    showConfirmModal(
      `Wczytaj folder: ${folderName}`,
      msg,
      () => {
        let loadedCount = 0;
        if (selectedHtml && editors.html) {
          editors.html.setValue(selectedHtml.content);
          projectTreeActivePath = selectedHtml.relativePath;
          projectTreeActiveFiles.html = selectedHtml.relativePath;
          loadedCount++;
        }
        if (selectedCss && editors.css) {
          editors.css.setValue(selectedCss.content);
          projectTreeActiveFiles.css = selectedCss.relativePath;
          loadedCount++;
        }
        if (selectedJs && editors.js) {
          editors.js.setValue(selectedJs.content);
          projectTreeActiveFiles.js = selectedJs.relativePath;
          loadedCount++;
        }
        updatePreview();
        flushAutoSaveNow();

        // Jeśli folder ma więcej plików, renderujemy i pokazujemy drzewo plików
        if (hasMultipleFiles) {
          renderProjectFileTree(folderName, fileEntries);
        } else {
          closeProjectTreePanel();
          const treeBtn = document.getElementById("toggle-tree-btn");
          if (treeBtn) treeBtn.style.display = "none";
        }

        showNotification(`Wczytano projekt z folderu „${folderName}” (${fileEntries.length} plików).`, "success");
      },
      "WCZYTAJ PROJEKT",
      "btn-primary"
    );
  } catch (err) {
    showNotification("Błąd wczytywania folderu: " + err.message, "error");
    console.error(err);
  }
}

// --- Editor Features ---
async function formatCode(targetTab = currentTab) {
  if (!editors[targetTab]) return;
  await editors[targetTab].getAction("editor.action.formatDocument").run();
  showNotification(`Syntax formatted (${targetTab.toUpperCase()}).`, "success");
}

function clearSingleTab(tab = currentTab) {
  const tabLabel = tab === "html" ? "HTML" : tab === "css" ? "CSS" : "JS";
  showConfirmModal(
    `Wyczyść bufor ${tabLabel}`,
    `Wyczyścić tylko edytor <strong>${tabLabel}</strong>?<br><br>Niezapisana treść w tym buforze zostanie utracona.`,
    () => {
      if (editors[tab]) {
        editors[tab].setValue("");
        updatePreview();
        showNotification(`Wyczyszczono bufor ${tabLabel}.`, "info");
      }
    },
    "WYCZYŚĆ",
    "btn-danger",
  );
}

function cleanAll() {
  showConfirmModal(
    "Wyczyść wszystkie bufory",
    "Wyczyścić <strong>HTML, CSS i JS</strong> naraz? Niezapisana treść w edytorach zostanie utracona.",
    () => {
      editors.html.setValue("");
      editors.css.setValue("");
      editors.js.setValue("");
      updatePreview();
      showNotification("Wyczyszczono wszystkie edytory.", "success");
    },
    "WYCZYŚĆ WSZYSTKO",
    "btn-danger",
  );
}

// --- Settings & Utils ---
function getEditorOptions() {
  const currentTheme = localStorage.getItem("codeEditorTheme") || "dark";
  const monacoTheme =
    currentTheme === "dark" ? "terminal-dark" : "terminal-light";

  return {
    fontSize: editorSettings.fontSize,
    fontFamily: editorSettings.fontFamily,
    lineHeight: editorSettings.lineHeight || 0,
    automaticLayout: true,
    wordWrap: editorSettings.wordWrap || "off",
    minimap: { enabled: editorSettings.minimap },
    theme: monacoTheme,

    cursorBlinking: editorSettings.cursorBlinking || "blink",
    cursorStyle: editorSettings.cursorStyle || "line",
    cursorSmoothCaretAnimation:
      editorSettings.cursorSmoothCaretAnimation || false,
    cursorSurroundingLines: editorSettings.cursorSurroundingLines || 0,
    cursorSurroundingLinesStyle:
      editorSettings.cursorSurroundingLinesStyle || "default",

    scrollBeyondLastLine: editorSettings.scrollBeyondLastLine !== false,
    roundedSelection: editorSettings.roundedSelection || false,
    renderLineHighlight: editorSettings.renderLineHighlight || "all",
    renderIndentGuides: editorSettings.renderIndentGuides !== false,

    tabSize: editorSettings.tabSize || 4,
    insertSpaces: editorSettings.insertSpaces !== false,
    renderWhitespace: editorSettings.renderWhitespace || "none",
    formatOnPaste: editorSettings.formatOnPaste || false,
    formatOnType: editorSettings.formatOnType || false,
    autoIndent: editorSettings.autoIndent || "full",

    bracketPairColorization: {
      enabled: editorSettings.bracketPairColorization !== false,
    },
    matchBrackets: editorSettings.matchBrackets || "always",
    guides: editorSettings.guides || { bracketPairs: true },

    autoClosingBrackets: editorSettings.autoClosingBrackets || "always",
    autoClosingQuotes: editorSettings.autoClosingQuotes || "always",

    suggestOnTriggerCharacters:
      editorSettings.suggestOnTriggerCharacters !== false,
    acceptSuggestionOnEnter: editorSettings.acceptSuggestionOnEnter || "on",
    acceptSuggestionOnCommitCharacter: true,
    quickSuggestions: editorSettings.quickSuggestions || {
      other: true,
      comments: false,
      strings: true,
    },
    quickSuggestionsDelay: editorSettings.quickSuggestionsDelay || 100,
    snippetSuggestions: "top",
    wordBasedSuggestions: "matchingDocuments",
    suggestSelection: "first",
    tabCompletion: "on",
    suggestLocality: "recentFiles",

    suggest: {
      showKeywords: true,
      showSnippets: true,
      showClasses: true,
      showFunctions: true,
      showVariables: true,
      showFields: true,
      showInterfaces: true,
      showStructs: true,
      showModules: true,
      showProperties: true,
      showEvents: true,
      showOperators: true,
      showUnits: true,
      showValues: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showIssues: true,
      showUsers: true,
      showText: true,
      showCustomcolors: true,
      showIcons: true,
    },

    parameterHints: {
      enabled: true,
      cycle: false,
    },

    occurrencesHighlight: editorSettings.occurrencesHighlight !== false,
    selectionHighlight: editorSettings.selectionHighlight !== false,
    colorDecorators: editorSettings.colorDecorators !== false,

    folding: editorSettings.folding !== false,
    showFoldingControls: editorSettings.showFoldingControls || "mouseover",

    codeLens: editorSettings.codeLens || false,
    links: editorSettings.links !== false,
    mouseWheelZoom: editorSettings.mouseWheelZoom || false,
    multiCursorModifier: editorSettings.multiCursorModifier || "alt",
    dragAndDrop: editorSettings.dragAndDrop !== false,
    emptySelectionClipboard: editorSettings.emptySelectionClipboard !== false,
    copyWithSyntaxHighlighting:
      editorSettings.copyWithSyntaxHighlighting !== false,
    smoothScrolling: editorSettings.smoothScrolling || false,
    stickyScroll: editorSettings.stickyScroll || { enabled: false },
  };
}

function loadSettings() {
  const saved = localStorage.getItem("codeEditorSettings");
  if (saved) editorSettings = { ...editorSettings, ...JSON.parse(saved) };
}

function closeAllJaSelectLists() {
  document.querySelectorAll(".ja-select-list.ja-visible").forEach((list) => {
    list.classList.remove("ja-visible");
    const wrap = list.closest(".ja-select-wrap");
    const btn = wrap
      ? wrap.querySelector(".ja-select-btn")
      : list.previousElementSibling;
    const bg = wrap ? wrap.querySelector(".btn-bg") : null;
    if (btn && btn.classList && btn.classList.contains("ja-select-btn")) {
      btn.classList.remove("ja-open");
      btn.setAttribute("aria-expanded", "false");
    }
    if (bg) bg.classList.remove("active");
    if (wrap) wrap.classList.remove("ja-select-open");
  });
}

let _settingsJaSelectDocBound = false;
function bindSettingsJaSelectOutsideOnce() {
  if (_settingsJaSelectDocBound) return;
  _settingsJaSelectDocBound = true;
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".ja-select-wrap")) {
      closeAllJaSelectLists();
    }
  });
}

function initSettingJaSelects(root) {
  if (!root) return;
  bindSettingsJaSelectOutsideOnce();

  root
    .querySelectorAll("select.setting-select-input:not([data-ja-select-init])")
    .forEach((sel) => {
      sel.setAttribute("data-ja-select-init", "1");

      const wrap = document.createElement("div");
      wrap.className = "ja-select-wrap";

      const btnBg = document.createElement("div");
      btnBg.className = "btn-bg";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ja-select-btn";
      btn.setAttribute("aria-haspopup", "listbox");
      btn.setAttribute("aria-expanded", "false");

      const labelSpan = document.createElement("span");
      labelSpan.className = "ja-select-value";

      const arrow = document.createElement("span");
      arrow.className = "ja-select-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "▼";

      btn.appendChild(labelSpan);
      btn.appendChild(arrow);
      btnBg.appendChild(btn);

      const list = document.createElement("div");
      list.className = "ja-select-list";
      list.setAttribute("role", "listbox");

      function syncFromSelect() {
        const opt = sel.options[sel.selectedIndex];
        labelSpan.textContent = "";
        if (!opt) return;
        const label = opt.textContent.trim();
        const iconClasses = (opt.dataset.jaIcon || "").trim();
        if (iconClasses) {
          const ic = document.createElement("i");
          ic.className = iconClasses;
          ic.setAttribute("aria-hidden", "true");
          const tx = document.createElement("span");
          tx.className = "ja-select-value-text";
          tx.textContent = label;
          labelSpan.appendChild(ic);
          labelSpan.appendChild(tx);
        } else {
          labelSpan.textContent = label;
        }
        list.querySelectorAll(".ja-select-item").forEach((el) => {
          const v = el.getAttribute("data-value");
          el.classList.toggle("ja-selected", v === sel.value);
        });
      }

      Array.from(sel.options).forEach((opt) => {
        const item = document.createElement("div");
        item.className =
          "ja-select-item" + (opt.selected ? " ja-selected" : "");
        item.setAttribute("role", "option");
        item.setAttribute("data-value", opt.value);

        const prefix = document.createElement("span");
        prefix.className = "ja-select-prefix";
        const optIcon = (opt.dataset.jaIcon || "").trim();
        if (optIcon) {
          prefix.classList.add("ja-select-prefix--icon");
          const pi = document.createElement("i");
          pi.className = optIcon;
          pi.setAttribute("aria-hidden", "true");
          prefix.appendChild(pi);
        } else {
          prefix.textContent = "›";
        }

        const text = document.createElement("span");
        text.textContent = opt.textContent.trim();

        item.appendChild(prefix);
        item.appendChild(text);

        item.addEventListener("click", (e) => {
          e.stopPropagation();
          if (sel.value === opt.value) {
            closeList();
            return;
          }
          sel.value = opt.value;
          sel.dispatchEvent(new Event("change", { bubbles: true }));
          syncFromSelect();
          closeList();
        });

        list.appendChild(item);
      });

      sel.classList.add("ja-select-native");
      sel.setAttribute("tabindex", "-1");

      sel.parentNode.insertBefore(wrap, sel);
      wrap.appendChild(btnBg);
      wrap.appendChild(list);
      wrap.appendChild(sel);

      syncFromSelect();

      function closeList() {
        btn.classList.remove("ja-open");
        btnBg.classList.remove("active");
        list.classList.remove("ja-visible");
        btn.setAttribute("aria-expanded", "false");
        wrap.classList.remove("ja-select-open");
      }

      function openList() {
        document.querySelectorAll(".ja-select-list.ja-visible").forEach((l) => {
          if (l !== list) {
            l.classList.remove("ja-visible");
            const w = l.closest(".ja-select-wrap");
            const b = w ? w.querySelector(".ja-select-btn") : null;
            const bg = w ? w.querySelector(".btn-bg") : null;
            if (b) {
              b.classList.remove("ja-open");
              b.setAttribute("aria-expanded", "false");
            }
            if (bg) bg.classList.remove("active");
            if (w) w.classList.remove("ja-select-open");
          }
        });
        btn.classList.add("ja-open");
        btnBg.classList.add("active");
        list.classList.add("ja-visible");
        btn.setAttribute("aria-expanded", "true");
        wrap.classList.add("ja-select-open");
      }

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (list.classList.contains("ja-visible")) closeList();
        else openList();
      });
    });
}

function showSettings() {
  const gh =
    typeof CyberGitHubProjects !== "undefined"
      ? CyberGitHubProjects.loadConfig()
      : {
        owner: "",
        repo: "",
        path: "data/cyber-code-projects.json",
        branch: "main",
        token: "",
      };
  const escAttrGh = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");

  const html = `
        <div class="settings-tabs-chassis">
            <div class="settings-tabs" role="tablist">
                <div class="btn-bg active">
                    <button type="button" class="settings-tab active" data-settings-tab="general" onclick="switchSettingsTab('general')">
                        <i class="fas fa-cog"></i> <span>GENERAL</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="settings-tab" data-settings-tab="cursor" onclick="switchSettingsTab('cursor')">
                        <i class="fas fa-mouse-pointer"></i> <span>CURSOR</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="settings-tab" data-settings-tab="formatting" onclick="switchSettingsTab('formatting')">
                        <i class="fas fa-code"></i> <span>FORMATTING</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="settings-tab" data-settings-tab="display" onclick="switchSettingsTab('display')">
                        <i class="fas fa-eye"></i> <span>DISPLAY</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="settings-tab" data-settings-tab="advanced" onclick="switchSettingsTab('advanced')">
                        <i class="fas fa-sliders-h"></i> <span>ADVANCED</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="settings-tab" data-settings-tab="github" onclick="switchSettingsTab('github')">
                        <i class="fab fa-github"></i> <span>GITHUB</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="settings-general" class="settings-tab-content active">
            <div class="setting-item setting-range">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-font"></i> Font Size</span>
                    <span class="setting-value">${editorSettings.fontSize}px</span>
                </label>
                <div class="btn-bg btn-bg-full">
                    <div class="setting-control">
                        <input type="range" min="10" max="24" value="${editorSettings.fontSize}" 
                            data-setting="fontSize" data-unit="px"
                            onchange="updateSetting('fontSize', parseInt(this.value))" 
                            oninput="this.closest('.setting-range').querySelector('.setting-value').textContent = this.value + 'px'">
                    </div>
                </div>
            </div>
            <div class="setting-item setting-range">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-text-height"></i> Line Height</span>
                    <span class="setting-value">${editorSettings.lineHeight === 0 ? "Auto" : editorSettings.lineHeight + "px"}</span>
                </label>
                <div class="btn-bg btn-bg-full">
                    <div class="setting-control">
                        <input type="range" min="0" max="50" value="${editorSettings.lineHeight || 0}" 
                            data-setting="lineHeight" data-unit="px" data-auto="true"
                            onchange="updateSetting('lineHeight', parseInt(this.value))" 
                            oninput="this.closest('.setting-range').querySelector('.setting-value').textContent = (this.value == 0 ? 'Auto' : this.value + 'px')">
                    </div>
                </div>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-font"></i> Font Family</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('fontFamily', this.value)">
                    <option value='"JetBrains Mono", monospace' ${editorSettings.fontFamily.includes("JetBrains") ? "selected" : ""}>JetBrains Mono</option>
                    <option value='"Share Tech Mono", monospace' ${editorSettings.fontFamily.includes("Share Tech") ? "selected" : ""}>Share Tech Mono</option>
                    <option value='"Courier New", monospace' ${editorSettings.fontFamily.includes("Courier") ? "selected" : ""}>Courier New</option>
                    <option value='monospace' ${editorSettings.fontFamily === "monospace" ? "selected" : ""}>System Monospace</option>
                </select>
            </div>
            <div class="setting-item setting-range">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-indent"></i> Tab Size</span>
                    <span class="setting-value">${editorSettings.tabSize}</span>
                </label>
                <div class="btn-bg btn-bg-full">
                    <div class="setting-control">
                        <input type="range" min="2" max="8" value="${editorSettings.tabSize}" 
                            data-setting="tabSize"
                            onchange="updateSetting('tabSize', parseInt(this.value))"
                            oninput="this.closest('.setting-range').querySelector('.setting-value').textContent = this.value">
                    </div>
                </div>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-text-width"></i> Word Wrap</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('wordWrap', this.value)">
                    <option value="on" ${editorSettings.wordWrap === "on" ? "selected" : ""}>ON</option>
                    <option value="off" ${editorSettings.wordWrap === "off" ? "selected" : ""}>OFF</option>
                </select>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-map"></i> Minimap</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.minimap ? "checked" : ""} 
                            onchange="updateSetting('minimap', this.checked)">
                    </div>
                </label>
            </div>
        </div>
        <div id="settings-cursor" class="settings-tab-content">
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-mouse-pointer"></i> Cursor Style</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('cursorStyle', this.value)">
                    <option value="line" ${editorSettings.cursorStyle === "line" ? "selected" : ""}>LINE</option>
                    <option value="block" ${editorSettings.cursorStyle === "block" ? "selected" : ""}>BLOCK</option>
                    <option value="underline" ${editorSettings.cursorStyle === "underline" ? "selected" : ""}>UNDERLINE</option>
                    <option value="line-thin" ${editorSettings.cursorStyle === "line-thin" ? "selected" : ""}>LINE THIN</option>
                    <option value="block-outline" ${editorSettings.cursorStyle === "block-outline" ? "selected" : ""}>BLOCK OUTLINE</option>
                </select>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-circle"></i> Cursor Blinking</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('cursorBlinking', this.value)">
                    <option value="blink" ${editorSettings.cursorBlinking === "blink" ? "selected" : ""}>BLINK</option>
                    <option value="smooth" ${editorSettings.cursorBlinking === "smooth" ? "selected" : ""}>SMOOTH</option>
                    <option value="phase" ${editorSettings.cursorBlinking === "phase" ? "selected" : ""}>PHASE</option>
                    <option value="expand" ${editorSettings.cursorBlinking === "expand" ? "selected" : ""}>EXPAND</option>
                    <option value="solid" ${editorSettings.cursorBlinking === "solid" ? "selected" : ""}>SOLID</option>
                </select>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-magic"></i> Smooth Caret Animation</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.cursorSmoothCaretAnimation ? "checked" : ""} 
                            onchange="updateSetting('cursorSmoothCaretAnimation', this.checked)">
                    </div>
                </label>
            </div>
        </div>
        <div id="settings-formatting" class="settings-tab-content">
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-brackets-curly"></i> Auto Close Brackets</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('autoClosingBrackets', this.value)">
                    <option value="always" ${editorSettings.autoClosingBrackets === "always" ? "selected" : ""}>ALWAYS</option>
                    <option value="languageDefined" ${editorSettings.autoClosingBrackets === "languageDefined" ? "selected" : ""}>LANGUAGE DEFINED</option>
                    <option value="beforeWhitespace" ${editorSettings.autoClosingBrackets === "beforeWhitespace" ? "selected" : ""}>BEFORE WHITESPACE</option>
                    <option value="never" ${editorSettings.autoClosingBrackets === "never" ? "selected" : ""}>NEVER</option>
                </select>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-quote-right"></i> Auto Close Quotes</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('autoClosingQuotes', this.value)">
                    <option value="always" ${editorSettings.autoClosingQuotes === "always" ? "selected" : ""}>ALWAYS</option>
                    <option value="languageDefined" ${editorSettings.autoClosingQuotes === "languageDefined" ? "selected" : ""}>LANGUAGE DEFINED</option>
                    <option value="beforeWhitespace" ${editorSettings.autoClosingQuotes === "beforeWhitespace" ? "selected" : ""}>BEFORE WHITESPACE</option>
                    <option value="never" ${editorSettings.autoClosingQuotes === "never" ? "selected" : ""}>NEVER</option>
                </select>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-palette"></i> Bracket Pair Colorization</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.bracketPairColorization ? "checked" : ""} 
                            onchange="updateSetting('bracketPairColorization', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-code-branch"></i> Folding</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.folding ? "checked" : ""} 
                            onchange="updateSetting('folding', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-indent"></i> Insert Spaces</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('insertSpaces', this.value === 'true')">
                    <option value="true" ${editorSettings.insertSpaces ? "selected" : ""}>SPACES</option>
                    <option value="false" ${!editorSettings.insertSpaces ? "selected" : ""}>TABS</option>
                </select>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-align-left"></i> Auto Indent</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('autoIndent', this.value)">
                    <option value="none" ${editorSettings.autoIndent === "none" ? "selected" : ""}>NONE</option>
                    <option value="keep" ${editorSettings.autoIndent === "keep" ? "selected" : ""}>KEEP</option>
                    <option value="brackets" ${editorSettings.autoIndent === "brackets" ? "selected" : ""}>BRACKETS</option>
                    <option value="advanced" ${editorSettings.autoIndent === "advanced" ? "selected" : ""}>ADVANCED</option>
                    <option value="full" ${editorSettings.autoIndent === "full" || !editorSettings.autoIndent ? "selected" : ""}>FULL</option>
                </select>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-paste"></i> Format on Paste</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.formatOnPaste ? "checked" : ""} 
                            onchange="updateSetting('formatOnPaste', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-keyboard"></i> Format on Type</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.formatOnType ? "checked" : ""} 
                            onchange="updateSetting('formatOnType', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-brackets-curly"></i> Match Brackets</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('matchBrackets', this.value)">
                    <option value="always" ${editorSettings.matchBrackets === "always" ? "selected" : ""}>ALWAYS</option>
                    <option value="near" ${editorSettings.matchBrackets === "near" ? "selected" : ""}>NEAR</option>
                    <option value="never" ${editorSettings.matchBrackets === "never" ? "selected" : ""}>NEVER</option>
                </select>
            </div>
        </div>
        <div id="settings-display" class="settings-tab-content">
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-eye-slash"></i> Render Whitespace</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('renderWhitespace', this.value)">
                    <option value="none" ${editorSettings.renderWhitespace === "none" ? "selected" : ""}>NONE</option>
                    <option value="boundary" ${editorSettings.renderWhitespace === "boundary" ? "selected" : ""}>BOUNDARY</option>
                    <option value="selection" ${editorSettings.renderWhitespace === "selection" ? "selected" : ""}>SELECTION</option>
                    <option value="trailing" ${editorSettings.renderWhitespace === "trailing" ? "selected" : ""}>TRAILING</option>
                    <option value="all" ${editorSettings.renderWhitespace === "all" ? "selected" : ""}>ALL</option>
                </select>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-align-left"></i> Render Indent Guides</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.renderIndentGuides ? "checked" : ""} 
                            onchange="updateSetting('renderIndentGuides', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-arrows-alt-v"></i> Scroll Beyond Last Line</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.scrollBeyondLastLine ? "checked" : ""} 
                            onchange="updateSetting('scrollBeyondLastLine', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-search-plus"></i> Mouse Wheel Zoom</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.mouseWheelZoom ? "checked" : ""} 
                            onchange="updateSetting('mouseWheelZoom', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-highlighter"></i> Occurrences Highlight</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.occurrencesHighlight ? "checked" : ""} 
                            onchange="updateSetting('occurrencesHighlight', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-marker"></i> Selection Highlight</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.selectionHighlight ? "checked" : ""} 
                            onchange="updateSetting('selectionHighlight', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-highlighter"></i> Render Line Highlight</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('renderLineHighlight', this.value)">
                    <option value="none" ${editorSettings.renderLineHighlight === "none" ? "selected" : ""}>NONE</option>
                    <option value="gutter" ${editorSettings.renderLineHighlight === "gutter" ? "selected" : ""}>GUTTER</option>
                    <option value="line" ${editorSettings.renderLineHighlight === "line" ? "selected" : ""}>LINE</option>
                    <option value="all" ${editorSettings.renderLineHighlight === "all" || !editorSettings.renderLineHighlight ? "selected" : ""}>ALL</option>
                </select>
            </div>
        </div>
        <div id="settings-advanced" class="settings-tab-content">
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-palette"></i> Color Decorators</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.colorDecorators ? "checked" : ""} 
                            onchange="updateSetting('colorDecorators', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-link"></i> Links</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.links !== false ? "checked" : ""} 
                            onchange="updateSetting('links', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-code"></i> Code Lens</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.codeLens ? "checked" : ""} 
                            onchange="updateSetting('codeLens', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-mouse"></i> Drag and Drop</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.dragAndDrop !== false ? "checked" : ""} 
                            onchange="updateSetting('dragAndDrop', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-copy"></i> Empty Selection Clipboard</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.emptySelectionClipboard !== false ? "checked" : ""} 
                            onchange="updateSetting('emptySelectionClipboard', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-highlighter"></i> Copy with Syntax Highlighting</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.copyWithSyntaxHighlighting !== false ? "checked" : ""} 
                            onchange="updateSetting('copyWithSyntaxHighlighting', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-sliders-h"></i> Smooth Scrolling</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.smoothScrolling ? "checked" : ""} 
                            onchange="updateSetting('smoothScrolling', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-circle"></i> Rounded Selection</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.roundedSelection ? "checked" : ""} 
                            onchange="updateSetting('roundedSelection', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-mouse-pointer"></i> Multi Cursor Modifier</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('multiCursorModifier', this.value)">
                    <option value="ctrlCmd" ${editorSettings.multiCursorModifier === "ctrlCmd" ? "selected" : ""}>CTRL/CMD</option>
                    <option value="alt" ${editorSettings.multiCursorModifier === "alt" || !editorSettings.multiCursorModifier ? "selected" : ""}>ALT</option>
                </select>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-code-branch"></i> Show Folding Controls</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('showFoldingControls', this.value)">
                    <option value="always" ${editorSettings.showFoldingControls === "always" ? "selected" : ""}>ALWAYS</option>
                    <option value="mouseover" ${editorSettings.showFoldingControls === "mouseover" || !editorSettings.showFoldingControls ? "selected" : ""}>MOUSEOVER</option>
                    <option value="never" ${editorSettings.showFoldingControls === "never" ? "selected" : ""}>NEVER</option>
                </select>
            </div>
            <div class="setting-item">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-lightbulb"></i> Suggest on Trigger Characters</span>
                    <div class="btn-bg">
                        <input type="checkbox" ${editorSettings.suggestOnTriggerCharacters !== false ? "checked" : ""} 
                            onchange="updateSetting('suggestOnTriggerCharacters', this.checked)">
                    </div>
                </label>
            </div>
            <div class="setting-item setting-select">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-keyboard"></i> Accept Suggestion on Enter</span>
                </label>
                <select class="setting-select-input" onchange="updateSetting('acceptSuggestionOnEnter', this.value)">
                    <option value="on" ${editorSettings.acceptSuggestionOnEnter === "on" || !editorSettings.acceptSuggestionOnEnter ? "selected" : ""}>ON</option>
                    <option value="smart" ${editorSettings.acceptSuggestionOnEnter === "smart" ? "selected" : ""}>SMART</option>
                    <option value="off" ${editorSettings.acceptSuggestionOnEnter === "off" ? "selected" : ""}>OFF</option>
                </select>
            </div>
            <div class="setting-item setting-range">
                <label class="setting-label">
                    <span class="setting-label-text"><i class="fas fa-clock"></i> Quick Suggestions Delay</span>
                    <span class="setting-value">${editorSettings.quickSuggestionsDelay || 100}ms</span>
                </label>
                <div class="btn-bg btn-bg-full">
                    <div class="setting-control">
                        <input type="range" min="0" max="1000" step="50" value="${editorSettings.quickSuggestionsDelay || 100}" 
                            data-setting="quickSuggestionsDelay" data-unit="ms"
                            onchange="updateSetting('quickSuggestionsDelay', parseInt(this.value))"
                            oninput="this.closest('.setting-range').querySelector('.setting-value').textContent = this.value + 'ms'">
                    </div>
                </div>
            </div>
        </div>
        <div id="settings-github" class="settings-tab-content settings-github-panel">
            <p class="settings-github-intro">
                Synchronizacja archiwum (<code>savedProjects</code>) z plikiem JSON w repozytorium GitHub.
                Token (PAT) tylko lokalnie. Ikona obok pola tokena pobiera wartość z
                — pole <code>cyber_data</code>. <strong>XOR + Base64</strong>: hasło powyżej; puste = bez deszyfrowania.
                ${typeof location !== "undefined" &&
      location.protocol === "file:"
      ? "<br><br><strong>Uwaga:</strong> otwierasz stronę z dysku (<code>file://</code>). Żądania do API GitHub mogą być blokowane — uruchom aplikację przez lokalny serwer (np. <code>npx serve</code> lub „Live Server”)."
      : ""
    }
            </p>
            <div class="setting-item setting-github-field">
                <label class="setting-label" for="gh-owner">
                    <i class="fab fa-github setting-icon"></i>
                    <span>Owner / org</span>
                </label>
                <input type="text" id="gh-owner" class="settings-github-input" autocomplete="off"
                    placeholder="np. twoj-login" value="${escAttrGh(gh.owner)}">
            </div>
            <div class="setting-item setting-github-field">
                <label class="setting-label" for="gh-repo">
                    <i class="fas fa-database setting-icon"></i>
                    <span>Repository</span>
                </label>
                <input type="text" id="gh-repo" class="settings-github-input" autocomplete="off"
                    placeholder="nazwa-repo" value="${escAttrGh(gh.repo)}">
            </div>
            <div class="setting-item setting-github-field">
                <label class="setting-label" for="gh-path">
                    <i class="fas fa-file-code setting-icon"></i>
                    <span>Ścieżka pliku</span>
                </label>
                <input type="text" id="gh-path" class="settings-github-input" autocomplete="off"
                    placeholder="data/cyber-code-projects.json" value="${escAttrGh(gh.path)}">
            </div>
            <div class="setting-item setting-github-field">
                <label class="setting-label" for="gh-branch">
                    <i class="fas fa-code-branch setting-icon"></i>
                    <span>Branch</span>
                </label>
                <input type="text" id="gh-branch" class="settings-github-input" autocomplete="off"
                    placeholder="main" value="${escAttrGh(gh.branch)}">
            </div>
            <div class="setting-item setting-github-field">
                <label class="setting-label" for="gh-xor-key">
                    <i class="fas fa-unlock-alt setting-icon"></i>
                    <span>Hasło XOR (deszyfrowanie)</span>
                </label>
                <input type="password" id="gh-xor-key" class="settings-github-input" autocomplete="off"
                    placeholder="${escAttrGh(gh.xorKey ? "Zapisane — puste = bez zmiany" : "Klucz do odszyfrowania wartości z auth.json")}"
                    value="">
            </div>
            <div class="setting-item setting-github-field">
                <label class="setting-label" for="gh-token">
                    <i class="fas fa-key setting-icon"></i>
                    <span>Token (PAT)</span>
                </label>
                <div class="settings-github-token-row">
                    <input type="password" id="gh-token" class="settings-github-input" autocomplete="off"
                        placeholder="${escAttrGh(gh.token ? "Zapisany — puste = bez zmiany" : "Wymagany do zapisu w repo")}"
                        value="">
                    <div class="btn-bg">
                        <button type="button" class="btn settings-github-fetch-key" onclick="cyberGithubFetchTokenKey()"
                            title="Pobierz klucz z auth.json (cyber_data)"
                            aria-label="Pobierz klucz z auth.json">
                            <i class="fas fa-cloud-download-alt" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="settings-github-auth-field" aria-live="polite">
                    <span class="settings-github-keypick-label">Pole w auth.json</span>
                    <div class="settings-github-cyber-data-row">
                        <code id="gh-cyber-data-field" class="settings-github-cyber-data-tag">cyber_data</code>
                        <span id="gh-cyber-data-ok" class="settings-github-cyber-data-ok" hidden></span>
                    </div>
                </div>
            </div>
            <div class="setting-item setting-github-field">
                <label class="setting-label settings-github-checkbox-label" for="gh-sync-delete">
                    <span>
                        <i class="fas fa-trash-alt setting-icon"></i>
                        <span>Usuwaj z GitHub przy usuwaniu projektu</span>
                    </span>
                    <input type="checkbox" id="gh-sync-delete" class="settings-github-checkbox" ${gh.syncDelete !== false ? "checked" : ""}>
                </label>
            </div>
            <div class="settings-github-actions">
                <div class="btn-bg">
                    <button type="button" class="btn btn-primary settings-github-action-btn" onclick="saveGithubPanelConfig()">
                        <span class="settings-github-action-icon" aria-hidden="true"><i class="fas fa-save"></i></span>
                        <span class="settings-github-action-label">Zapisz konfigurację</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="btn settings-github-action-btn" onclick="cyberGithubPullMerge()">
                        <span class="settings-github-action-icon" aria-hidden="true"><i class="fas fa-download"></i></span>
                        <span class="settings-github-action-label">Pobierz (scal)</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="btn btn-danger settings-github-action-btn" onclick="cyberGithubPullReplace()">
                        <span class="settings-github-action-icon" aria-hidden="true"><i class="fas fa-sync"></i></span>
                        <span class="settings-github-action-label">Pobierz (zastąp)</span>
                    </button>
                </div>
                <div class="btn-bg">
                    <button type="button" class="btn settings-github-action-btn" onclick="cyberGithubPush()">
                        <span class="settings-github-action-icon" aria-hidden="true"><i class="fas fa-upload"></i></span>
                        <span class="settings-github-action-label">Wyślij tylko nowe do pliku</span>
                    </button>
                </div>
            </div>
            <p id="gh-panel-status" class="settings-github-status" role="status" aria-live="polite"></p>
        </div>
    `;
  elements.settingsSidebar.body.innerHTML = html;
  initSettingJaSelects(elements.settingsSidebar.body);
  elements.settingsSidebar.sidebar.classList.add("active");
  elements.settingsSidebar.overlay.classList.add("active");
}

function closeSettingsSidebar() {
  closeAllJaSelectLists();
  elements.settingsSidebar.sidebar.classList.remove("active");
  elements.settingsSidebar.overlay.classList.remove("active");
}
window.closeSettingsSidebar = closeSettingsSidebar;

function setGithubPanelStatus(msg) {
  const el = document.getElementById("gh-panel-status");
  if (el) el.textContent = msg || "";
}

function saveGithubPanelConfig() {
  if (typeof CyberGitHubProjects === "undefined") {
    showNotification("Brak modułu github-projects.js.", "error");
    return;
  }
  showConfirmModal(
    "GitHub — zapis konfiguracji",
    "Zapisać ustawienia synchronizacji (owner, repo, ścieżka pliku, branch, token, hasło XOR) w pamięci lokalnej przeglądarki?",
    () => saveGithubPanelConfigExecute(),
    "ZAPISZ",
    "btn-primary",
  );
}
window.saveGithubPanelConfig = saveGithubPanelConfig;

function saveGithubPanelConfigExecute() {
  const owner = document.getElementById("gh-owner")?.value?.trim() ?? "";
  const repo = document.getElementById("gh-repo")?.value?.trim() ?? "";
  const pathVal =
    document.getElementById("gh-path")?.value?.trim() ||
    "data/cyber-code-projects.json";
  const branch = document.getElementById("gh-branch")?.value?.trim() || "main";
  let token = document.getElementById("gh-token")?.value?.trim() ?? "";
  let xorKey = document.getElementById("gh-xor-key")?.value?.trim() ?? "";
  const syncDelete = document.getElementById("gh-sync-delete")
    ? document.getElementById("gh-sync-delete").checked
    : true;
  const prev = CyberGitHubProjects.loadConfig();
  if (!token) {
    token = prev.token || "";
  }
  if (!xorKey) {
    xorKey = prev.xorKey || "";
  }
  CyberGitHubProjects.setConfig({
    owner,
    repo,
    path: pathVal,
    branch,
    token,
    xorKey,
    syncDelete,
  });
  const tokInput = document.getElementById("gh-token");
  if (tokInput) tokInput.value = "";
  const xorInput = document.getElementById("gh-xor-key");
  if (xorInput) xorInput.value = "";
  showNotification("GitHub: zapisano konfigurację.", "success");
  setGithubPanelStatus("Konfiguracja zapisana lokalnie.");
}

async function cyberGithubFetchTokenKey() {
  if (typeof CyberGitHubProjects === "undefined") {
    showNotification("Brak modułu github-projects.js.", "error");
    return;
  }
  const keyName = "cyber_data";
  let xorKey = document.getElementById("gh-xor-key")?.value?.trim() ?? "";
  if (!xorKey) {
    xorKey = CyberGitHubProjects.loadConfig().xorKey || "";
  }
  const okEl = document.getElementById("gh-cyber-data-ok");
  if (okEl) {
    okEl.textContent = "";
    okEl.hidden = true;
    okEl.classList.remove("is-visible");
  }
  setGithubPanelStatus("Pobieranie auth.json…");
  try {
    const { value, keyUsed, decrypted } =
      await CyberGitHubProjects.fetchPatFromAuthJson({
        keyName,
        xorKey,
      });
    const inp = document.getElementById("gh-token");
    if (inp) inp.value = value;
    const note = decrypted ? " (XOR → jawny token)" : "";
    showNotification(
      `Wczytano cyber_data${note}. Zapisz konfigurację.`,
      "success",
    );
    setGithubPanelStatus(
      `cyber_data: klucz w polu tokena${note} — zapisz konfigurację.`,
    );
    if (okEl && keyUsed === "cyber_data") {
      okEl.textContent = "✓ pobrano";
      okEl.hidden = false;
      okEl.classList.add("is-visible");
    }
  } catch (e) {
    showNotification(e.message || String(e), "error");
    setGithubPanelStatus("Nie udało się pobrać cyber_data z auth.json.");
  }
}
window.cyberGithubFetchTokenKey = cyberGithubFetchTokenKey;

function cyberGithubPullMerge() {
  if (typeof CyberGitHubProjects === "undefined") {
    showNotification("Brak modułu github-projects.js.", "error");
    return;
  }
  showConfirmModal(
    "GitHub — pobierz (scal)",
    "Pobrać projekty z pliku w repozytorium i <strong>scalić</strong> z lokalną biblioteką?<br><br>Nowe wpisy zostaną dopisane; powtarzające się nazwy dostaną sufiks (import).",
    () => {
      cyberGithubPullMergeRun();
    },
    "SCAL",
    "btn-primary",
  );
}
window.cyberGithubPullMerge = cyberGithubPullMerge;

async function cyberGithubPullMergeRun() {
  setGithubPanelStatus("Pobieranie z GitHub…");
  try {
    const r = await CyberGitHubProjects.pull({ mode: "merge" });
    if (r.message) {
      showNotification(r.message, "info");
      setGithubPanelStatus(r.message);
    } else {
      const line = `Scalono: ${r.count} z GitHub → biblioteka ${r.total} projektów.`;
      showNotification(line, "success");
      setGithubPanelStatus(line);
    }
  } catch (e) {
    showNotification(e.message || String(e), "error");
    setGithubPanelStatus("Błąd pobierania.");
  }
}

function cyberGithubPullReplace() {
  if (typeof CyberGitHubProjects === "undefined") {
    showNotification("Brak modułu github-projects.js.", "error");
    return;
  }
  showConfirmModal(
    "GitHub — pobierz (zastąp)",
    "<strong>Całkowicie zastąpić</strong> lokalną bibliotekę projektów zawartością pliku z repozytorium?<br><br>Obecna lista w przeglądarce zostanie usunięta — tej operacji nie cofniesz z poziomu aplikacji.",
    () => {
      cyberGithubPullReplaceRun();
    },
    "ZASTĄP",
    "btn-danger",
  );
}
window.cyberGithubPullReplace = cyberGithubPullReplace;

async function cyberGithubPullReplaceRun() {
  setGithubPanelStatus("Zastępowanie biblioteki…");
  try {
    const r = await CyberGitHubProjects.pull({ mode: "replace" });
    const line = `Biblioteka zastąpiona: ${r.count} projekt(ów).`;
    showNotification(line, "success");
    setGithubPanelStatus(line);
  } catch (e) {
    showNotification(e.message || String(e), "error");
    setGithubPanelStatus("Błąd.");
  }
}

function cyberGithubPush() {
  if (typeof CyberGitHubProjects === "undefined") {
    showNotification("Brak modułu github-projects.js.", "error");
    return;
  }
  let n = 0;
  try {
    n = JSON.parse(localStorage.getItem("savedProjects") || "[]").length;
  } catch (_) {
    n = 0;
  }
  showConfirmModal(
    "GitHub — wyślij nowe",
    `Plik w repozytorium zostanie <strong>rozszerzony</strong> — bez kasowania wpisów, które już tam są.<br><br>Na GitHub trafią wyłącznie projekty <strong>zapisane lokalnie w tej przeglądarce</strong> (nie te oznaczone jako pobrane z synchronizacji GitHub), o <strong>nazwach</strong>, których jeszcze <strong>nie ma</strong> w zdalnym pliku.<br><br>Lokalna biblioteka: <strong>${n}</strong> projekt(ów). Wymagany token z uprawnieniem zapisu (Contents).`,
    () => {
      cyberGithubPushRun();
    },
    "WYŚLIJ",
    "btn-primary",
  );
}
window.cyberGithubPush = cyberGithubPush;

async function cyberGithubPushRun() {
  setGithubPanelStatus("Wysyłanie na GitHub…");
  try {
    const r = await CyberGitHubProjects.push({
      message: `Cyber Code: nowe projekty ${new Date().toISOString()}`,
    });
    if (r.message) {
      showNotification(r.message, "info");
      setGithubPanelStatus(r.message);
    } else {
      const line = `Dopisano ${r.added} nowych projekt(ów). W pliku na GitHub: ${r.projects} łącznie.`;
      showNotification(line, "success");
      setGithubPanelStatus(line);
    }
  } catch (e) {
    showNotification(e.message || String(e), "error");
    setGithubPanelStatus("Błąd wysyłki (token / ścieżka / sieć).");
  }
}

function switchSettingsTab(tab) {
  closeAllJaSelectLists();

  document.querySelectorAll(".settings-tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  document.querySelectorAll(".settings-tab").forEach((t) => {
    t.classList.remove("active");
    if (t.parentElement && t.parentElement.classList.contains("btn-bg")) {
      t.parentElement.classList.remove("active");
    }
  });

  const content = document.getElementById("settings-" + tab);
  if (content) {
    content.classList.add("active");
  }

  const targetTab =
    document.querySelector(`.settings-tab[data-settings-tab="${tab}"]`) ||
    Array.from(document.querySelectorAll(".settings-tab")).find((t) =>
      t.textContent.trim().toUpperCase().includes(String(tab).toUpperCase()),
    );

  if (targetTab) {
    targetTab.classList.add("active");
    if (
      targetTab.parentElement &&
      targetTab.parentElement.classList.contains("btn-bg")
    ) {
      targetTab.parentElement.classList.add("active");
    }
  }
}
window.switchSettingsTab = switchSettingsTab;

function updateSetting(key, val) {
  if (val === "true" || val === true) {
    editorSettings[key] = true;
  } else if (val === "false" || val === false) {
    editorSettings[key] = false;
  } else {
    editorSettings[key] = val;
  }

  localStorage.setItem("codeEditorSettings", JSON.stringify(editorSettings));

  if (Object.keys(editors).length > 0) {
    Object.values(editors).forEach((e) => {
      if (e) e.updateOptions(getEditorOptions());
    });
  }

  showNotification("Config updated.", "success");
}

function showShortcuts() {
  const html = `
        <div class="info-card">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:0.8rem;">
                <div><strong style="color:var(--highlight)">Ctrl + S</strong> — zapis autosave / archiwum</div>
                <div><strong style="color:var(--highlight)">Ctrl + Enter</strong> — uruchom podgląd</div>
                <div><strong style="color:var(--highlight)">Ctrl + N</strong> — nowy projekt</div>
                <div><strong style="color:var(--highlight)">Ctrl + O</strong> — biblioteka projektów</div>
                <div><strong style="color:var(--highlight)">F1</strong> — ten panel</div>
                <div><strong style="color:var(--highlight)">Ctrl + T</strong> — motyw jasny / ciemny</div>
            </div>
            <p style="margin-top:12px; font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
                Eksport / import biblioteki (JSON): ikony na pasku <i class="fas fa-file-export" aria-hidden="true"></i> oraz <i class="fas fa-file-import" aria-hidden="true"></i>.
            </p>
        </div>
     `;
  showCustomModal("Skróty klawiszowe", html, null, "keybindings-modal");
}

// --- Theme & Visuals ---
function toggleTheme() {
  const current = document.documentElement.getAttribute("theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("theme", next);
  localStorage.setItem("codeEditorTheme", next);

  if (window.monaco) {
    if (next === "dark") {
      try {
        monaco.editor.setTheme("terminal-dark");
      } catch (e) {
        monaco.editor.setTheme("vs-dark");
      }
    } else {
      try {
        monaco.editor.setTheme("terminal-light");
      } catch (e) {
        monaco.editor.setTheme("vs");
      }
    }
  }

  elements.themeBtn.innerHTML =
    next === "dark"
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
}

function loadTheme() {
  const saved = localStorage.getItem("codeEditorTheme") || "dark";
  document.documentElement.setAttribute("theme", saved);
  if (elements.themeBtn)
    elements.themeBtn.innerHTML =
      saved === "dark"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
}

function switchView(view) {
  currentView = view;
  localStorage.setItem("codeEditorView", view);

  const editorPane = document.getElementById("editor-pane");
  const previewPane = document.getElementById("preview-pane");
  const dataGrid = document.getElementById("data-grid");
  const viewEditorBtn = document.getElementById("view-editor-btn");
  const viewPreviewBtn = document.getElementById("view-preview-btn");
  const viewBothBtn = document.getElementById("view-both-btn");

  viewEditorBtn.classList.remove("active");
  viewPreviewBtn.classList.remove("active");
  viewBothBtn.classList.remove("active");

  if (view === "editor") {
    dataGrid.style.gridTemplateColumns = "1fr";
    editorPane.style.display = "flex";
    previewPane.style.display = "none";
    viewEditorBtn.classList.add("active");
  } else if (view === "preview") {
    dataGrid.style.gridTemplateColumns = "1fr";
    editorPane.style.display = "none";
    previewPane.style.display = "flex";
    viewPreviewBtn.classList.add("active");
  } else {
    dataGrid.style.gridTemplateColumns = "1fr 1fr";
    editorPane.style.display = "flex";
    previewPane.style.display = "flex";
    viewBothBtn.classList.add("active");
  }

  setTimeout(() => {
    Object.values(editors).forEach((editor) => {
      if (editor) editor.layout();
    });
  }, 100);

  updateStatus(`View: ${view.toUpperCase()}`, 3000, "info");
}

function loadView() {
  const saved = localStorage.getItem("codeEditorView") || "both";
  switchView(saved);
}

// Debounce function to avoid too frequent saves
let saveTimeout = null;

function writeAutoSavedProjectPayload(project) {
  try {
    localStorage.setItem("autoSavedProject", JSON.stringify(project));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      console.warn("Autosave failed: Storage quota exceeded");
      try {
        localStorage.removeItem("autoSavedProject");
        localStorage.setItem("autoSavedProject", JSON.stringify(project));
      } catch (err) {
        console.error("Could not save autosave:", err);
      }
    }
  }
}

function flushAutoSaveNow() {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveTimeout = null;
  }
  try {
    if (!editors.html || !editors.css || !editors.js) return;
    const project = {
      html: editors.html.getValue(),
      css: editors.css.getValue(),
      js: editors.js.getValue(),
      timestamp: new Date().toISOString(),
    };
    writeAutoSavedProjectPayload(project);
  } catch (e) {
    console.error("Autosave flush error:", e);
  }
}

function saveToLocalStorage() {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(() => {
    try {
      if (!editors.html || !editors.css || !editors.js) return;

      const current = {
        html: editors.html.getValue(),
        css: editors.css.getValue(),
        js: editors.js.getValue(),
      };

      const project = {
        html: current.html,
        css: current.css,
        js: current.js,
        timestamp: new Date().toISOString(),
      };

      writeAutoSavedProjectPayload(project);
    } catch (e) {
      console.error("Autosave error:", e);
    }
  }, 500);
}

function setupAutoSave() {
  if (editors.html && editors.css && editors.js) {
    saveToLocalStorage();
  }
}

function configureBracketColors() { }

// --- UI Utils ---
const FILE_STATUS_DEFAULT_MSG = "Ready to code";
let fileStatusRestoreTimer = null;

function updateStatus(msg, dur = 3000, kind = "neutral") {
  if (fileStatusRestoreTimer) clearTimeout(fileStatusRestoreTimer);
  elements.fileStatus.textContent = msg;
  elements.fileStatus.setAttribute("data-status", kind);
  fileStatusRestoreTimer = setTimeout(() => {
    elements.fileStatus.textContent = FILE_STATUS_DEFAULT_MSG;
    elements.fileStatus.setAttribute("data-status", "neutral");
    fileStatusRestoreTimer = null;
  }, dur);
}

function showNotification(msg, type = "info") {
  const c = document.getElementById("notification-container");
  const n = document.createElement("div");
  const color =
    type === "success"
      ? "var(--success-color)"
      : type === "warning"
        ? "var(--warning-color)"
        : type === "error"
          ? "var(--danger-color)"
          : "var(--info-color)";

  n.style.cssText = `
        background: var(--panel-bg);
        color: var(--text-color);
        padding: 10px 15px;
        border: 1px solid var(--border-color);
        border-left: 4px solid ${color};
        box-shadow: var(--shadow-drop);
        font-family: "Share Tech Mono";
        font-size: 1rem;
        text-transform: uppercase;
        animation: fadeInGrow 0.3s forwards;
        min-width: 250px;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
  n.innerHTML = `<strong style="color: ${color}">■</strong> ${msg}`;
  c.appendChild(n);
  setTimeout(() => {
    n.style.animation = "fadeOutShrink 0.3s forwards";
    setTimeout(() => n.remove(), 300);
  }, 3000);
}

// --- Modal System ---
function openModal() {
  elements.modal.container.classList.add("visible");
}

function closeModal() {
  elements.modal.container.classList.remove("visible");
  setTimeout(() => {
    elements.modal.body.innerHTML = "";
    elements.modal.actions.style.display = "flex";
    elements.modal.confirmBtn.style.display = "inline-flex";
    elements.modal.modal.classList.remove(
      "snippets-modal",
      "settings-modal",
      "archive-modal",
      "load-archive-modal",
      "keybindings-modal",
      "confirm-modal",
    );
    elements.modal.modal.removeAttribute("data-alert-type");
  }, 300);
}

function layoutConfirmHtmlAfterQuestion(html) {
  return String(html).replace(/\?(?!\s*<br)(?=.)/gi, "?<br><br>");
}

function showConfirmModal(
  title,
  msg,
  onConfirm,
  confirmText = "ZATWIERDŹ",
  confirmClass = "btn-primary",
) {
  elements.modal.title.textContent = title;
  let hudType = "info";
  const cc = String(confirmClass || "");
  if (cc.includes("danger")) {
    hudType = "critical";
  } else if (cc.includes("warning")) {
    hudType = "warning";
  } else if (cc.includes("success")) {
    hudType = "success";
  }
  elements.modal.modal.setAttribute("data-alert-type", hudType);
  elements.modal.body.innerHTML = `<div class="confirm-message">${layoutConfirmHtmlAfterQuestion(msg)}</div>`;
  elements.modal.actions.style.display = "flex";
  elements.modal.confirmBtn.style.display = "inline-flex";
  elements.modal.cancelBtn.style.display = "inline-flex";

  const cancelLabel = elements.modal.cancelBtn.querySelector(
    ".modal-action-btn__label",
  );
  const confirmLabel = elements.modal.confirmBtn.querySelector(
    ".modal-action-btn__label",
  );
  if (cancelLabel) cancelLabel.textContent = "ANULUJ";
  else elements.modal.cancelBtn.textContent = "ANULUJ";
  if (confirmLabel) confirmLabel.textContent = confirmText;
  else elements.modal.confirmBtn.textContent = confirmText;

  elements.modal.confirmBtn.className = `btn modal-action-btn ${confirmClass}`;
  elements.modal.cancelBtn.className = "btn modal-action-btn";

  const confirmIcon = document.getElementById("modal-confirm-icon");
  if (confirmIcon) {
    confirmIcon.className = "fas modal-action-btn__icon";
    const ct = String(confirmText || "").toUpperCase();
    if (cc.includes("danger")) {
      if (ct === "NADPISZ") {
        confirmIcon.classList.add("fa-floppy-disk");
      } else if (ct === "ZASTĄP" || ct === "ZASTĄP WSZYSTKO") {
        confirmIcon.classList.add("fa-triangle-exclamation");
      } else if (ct.includes("WYCZYŚĆ")) {
        confirmIcon.classList.add("fa-eraser");
      } else {
        confirmIcon.classList.add("fa-trash-can");
      }
    } else if (ct === "LOAD" || ct === "WCZYTAJ") {
      confirmIcon.classList.add("fa-folder-open");
    } else if (ct === "UTWÓRZ") {
      confirmIcon.classList.add("fa-file-circle-plus");
    } else if (/URUCHOM|RUN|EXECUTE|START/i.test(String(confirmText))) {
      confirmIcon.classList.add("fa-play");
    } else if (ct === "ZAPISZ") {
      confirmIcon.classList.add("fa-floppy-disk");
    } else if (ct === "SCAL") {
      confirmIcon.classList.add("fa-layer-group");
    } else if (ct === "WYŚLIJ") {
      confirmIcon.classList.add("fa-upload");
    } else {
      confirmIcon.classList.add("fa-check");
    }
  }
  elements.modal.confirmBtn.onclick = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };
  elements.modal.cancelBtn.onclick = closeModal;

  elements.modal.modal.classList.remove(
    "snippets-modal",
    "settings-modal",
    "archive-modal",
    "load-archive-modal",
    "keybindings-modal",
    "confirm-modal",
  );
  elements.modal.modal.classList.add("confirm-modal");

  openModal();
}

function showCyberConfirm(
  title,
  message,
  onConfirm,
  confirmText,
  confirmClass,
) {
  showConfirmModal(
    title,
    message,
    onConfirm,
    confirmText || "ZATWIERDŹ",
    confirmClass || "btn-primary",
  );
}
window.showCyberConfirm = showCyberConfirm;

function showCyberAlert(title, message, okLabel) {
  const safe = String(message || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const label = String(okLabel || "OK")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  showCustomModal(
    title,
    '<div class="modal-body-main"><p style="color:var(--text-color); font-size:0.9rem; line-height:1.5;">' +
    safe +
    "</p></div>" +
    '<div class="modal-body-actions">' +
    '<div class="btn-bg">' +
    '<button type="button" class="btn btn-primary modal-action-btn" onclick="closeModal()">' +
    '<i class="fas fa-check modal-action-btn__icon" aria-hidden="true"></i>' +
    '<span class="modal-action-btn__label">' +
    label +
    "</span></button></div></div>",
    null,
    "confirm-modal",
  );
}
window.showCyberAlert = showCyberAlert;

function showCustomModal(title, content, onOpen, sizeClass) {
  elements.modal.title.textContent = title;
  elements.modal.body.innerHTML = content;
  elements.modal.actions.style.display = "none";

  elements.modal.modal.classList.remove(
    "snippets-modal",
    "settings-modal",
    "archive-modal",
    "load-archive-modal",
    "keybindings-modal",
    "confirm-modal",
  );

  if (sizeClass) {
    elements.modal.modal.classList.add(sizeClass);
  }

  if (sizeClass === "confirm-modal") {
    elements.modal.modal.setAttribute("data-alert-type", "info");
  } else {
    elements.modal.modal.removeAttribute("data-alert-type");
  }

  openModal();
  if (onOpen) onOpen();
}

function openInNewWindow() {
  const w = window.open();
  if (w) {
    w.document.write(elements.previewIframe.srcdoc || buildCompleteHtml(false));
    w.document.close();
  }
}