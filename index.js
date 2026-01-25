// --- Code Snippets Mock Data (Prevent errors) ---
window.codeSnippets = {
    html: [
        { name: "Boilerplate", code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>" },
        { name: "Button", code: "<button class=\"btn\">Click Me</button>" },
        { name: "Input Group", code: "<div class=\"input-group\">\n  <label>Label</label>\n  <input type=\"text\">\n</div>" },
        { name: "Card", code: "<div class=\"card\">\n  <h3>Card Title</h3>\n  <p>Card content goes here.</p>\n</div>" },
        { name: "Form", code: "<form>\n  <input type=\"text\" placeholder=\"Name\">\n  <input type=\"email\" placeholder=\"Email\">\n  <button type=\"submit\">Submit</button>\n</form>" },
        { name: "Navigation", code: "<nav>\n  <ul>\n    <li><a href=\"#\">Home</a></li>\n    <li><a href=\"#\">About</a></li>\n    <li><a href=\"#\">Contact</a></li>\n  </ul>\n</nav>" },
        { name: "Modal", code: "<div class=\"modal\">\n  <div class=\"modal-content\">\n    <span class=\"close\">&times;</span>\n    <p>Modal content</p>\n  </div>\n</div>" },
        { name: "Table", code: "<table>\n  <thead>\n    <tr>\n      <th>Header 1</th>\n      <th>Header 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Data 1</td>\n      <td>Data 2</td>\n    </tr>\n  </tbody>\n</table>" },
        { name: "Image", code: "<img src=\"image.jpg\" alt=\"Description\">" },
        { name: "Link", code: "<a href=\"#\" target=\"_blank\">Link Text</a>" },
        { name: "List", code: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>" },
        { name: "Container", code: "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col\">Content</div>\n  </div>\n</div>" }
    ],
    css: [
        { name: "Flex Center", code: "display: flex;\njustify-content: center;\nalign-items: center;" },
        { name: "Grid Layout", code: "display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 1rem;" },
        { name: "Reset", code: "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}" },
        { name: "Button Style", code: "button {\n  padding: 10px 20px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}" },
        { name: "Card Style", code: ".card {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  padding: 20px;\n}" },
        { name: "Hover Effect", code: ".element:hover {\n  transform: scale(1.05);\n  transition: transform 0.3s;\n}" },
        { name: "Gradient Background", code: "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);" },
        { name: "Centered Absolute", code: "position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);" },
        { name: "Full Width Height", code: "width: 100%;\nheight: 100vh;" },
        { name: "Text Shadow", code: "text-shadow: 2px 2px 4px rgba(0,0,0,0.3);" },
        { name: "Box Shadow", code: "box-shadow: 0 4px 6px rgba(0,0,0,0.1);" },
        { name: "Animation", code: "@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.element {\n  animation: fadeIn 0.5s;\n}" },
        { name: "Media Query", code: "@media (max-width: 768px) {\n  .element {\n    font-size: 14px;\n  }\n}" },
        { name: "Transform", code: "transform: rotate(45deg) scale(1.2);" },
        { name: "Transition", code: "transition: all 0.3s ease;" }
    ],
    js: [
        { name: "Console Log", code: "console.log('Debug:', variable);" },
        { name: "Query Selector", code: "const el = document.querySelector('.class');" },
        { name: "Event Listener", code: "document.addEventListener('click', (e) => {\n  // code\n});" },
        { name: "Arrow Function", code: "const func = (param) => {\n  return param * 2;\n};" },
        { name: "Fetch API", code: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data));" },
        { name: "Async/Await", code: "async function getData() {\n  const response = await fetch('url');\n  const data = await response.json();\n  return data;\n}" },
        { name: "Array Map", code: "const doubled = array.map(item => item * 2);" },
        { name: "Array Filter", code: "const filtered = array.filter(item => item > 10);" },
        { name: "Array Reduce", code: "const sum = array.reduce((acc, item) => acc + item, 0);" },
        { name: "LocalStorage Set", code: "localStorage.setItem('key', 'value');" },
        { name: "LocalStorage Get", code: "const value = localStorage.getItem('key');" },
        { name: "SetTimeout", code: "setTimeout(() => {\n  console.log('Delayed execution');\n}, 1000);" },
        { name: "SetInterval", code: "setInterval(() => {\n  console.log('Repeating');\n}, 1000);" },
        { name: "Class Definition", code: "class MyClass {\n  constructor(name) {\n    this.name = name;\n  }\n  method() {\n    return this.name;\n  }\n}" },
        { name: "Promise", code: "const promise = new Promise((resolve, reject) => {\n  if (success) resolve('Success');\n  else reject('Error');\n});" },
        { name: "Try Catch", code: "try {\n  // risky code\n} catch (error) {\n  console.error(error);\n}" },
        { name: "Template Literal", code: "const message = `Hello, ${name}!`;" },
        { name: "Destructuring", code: "const { name, age } = person;" },
        { name: "Spread Operator", code: "const newArray = [...oldArray, newItem];" },
        { name: "Toggle Class", code: "element.classList.toggle('active');" }
    ]
};

// --- PASTE USER JS HERE ---
// I will include the user provided JS logic below to ensure functionality

// --- DOM Elements ---
const elements = {
    previewIframe: document.getElementById('preview-iframe'),
    fileStatus: document.getElementById('file-status'),
    editorStatus: document.getElementById('editor-status'),
    themeBtn: document.getElementById('theme-btn'),
    modal: {
        container: document.getElementById('modal-container'),
        modal: document.querySelector('.modal'),
        title: document.getElementById('modal-title'),
        body: document.getElementById('modal-body'),
        actions: document.getElementById('modal-actions'),
        confirmBtn: document.getElementById('modal-confirm-btn'),
        cancelBtn: document.getElementById('modal-cancel-btn'),
    },
    settingsSidebar: {
        sidebar: document.getElementById('settings-sidebar'),
        overlay: document.getElementById('settings-sidebar-overlay'),
        body: document.getElementById('settings-sidebar-body'),
    },
    snippetsSidebar: {
        sidebar: document.getElementById('snippets-sidebar'),
        overlay: document.getElementById('snippets-sidebar-overlay'),
        body: document.getElementById('snippets-sidebar-body'),
    }
};

// --- State ---
let currentTab = 'html';
let autoSaveInterval;
let editors = {}; // To hold Monaco instances
let currentView = 'both'; // 'editor', 'preview', 'both'

// --- Editor Settings ---
let editorSettings = {
    fontSize: 14,
    fontFamily: '"JetBrains Mono", monospace',
    lineHeight: 0,
    wordWrap: 'off',
    minimap: true,
    lineNumbers: 'on',
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    tabSize: 4,
    insertSpaces: true,
    renderWhitespace: 'none',
    renderLineHighlight: 'all',
    renderIndentGuides: true,
    cursorStyle: 'line',
    cursorBlinking: 'blink',
    scrollBeyondLastLine: true,
    smoothScrolling: false,
    mouseWheelZoom: false,
    roundedSelection: false,
    formatOnPaste: false,
    formatOnType: false,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    quickSuggestions: {
        other: true,
        comments: false,
        strings: true
    },
    quickSuggestionsDelay: 100,
    autoIndent: 'full',
    bracketPairColorization: true,
    colorDecorators: true,
    folding: true,
    showFoldingControls: 'mouseover',
    matchBrackets: 'always',
    occurrencesHighlight: true,
    selectionHighlight: true,
    codeLens: false,
    links: true,
    multiCursorModifier: 'alt',
    dragAndDrop: true,
    emptySelectionClipboard: true,
    copyWithSyntaxHighlighting: true,
    cursorSmoothCaretAnimation: false,
    cursorSurroundingLines: 0,
    cursorSurroundingLinesStyle: 'default',
    stickyScroll: { enabled: false },
    guides: { bracketPairs: true }
};

// Kolorowe nawiasy - zawsze włączone (nie można wyłączyć)
const bracketSettings = {
    bracketPairColorization: true,
    matchingBrackets: 'always',
    coloredBrackets: true
};

// --- Default Content ---
const defaultContent = {
    html: `<!-- Cyber Structure -->
<div class="container">
    <div class="card">
        <h1>SYSTEM READY</h1>
        <p>Interface loaded successfully.</p>
        <div class="status-line">
            <span class="dot"></span> ONLINE
        </div>
        <button onclick="initSequence()">INITIALIZE</button>
    </div>
</div>`,
    css: `/* Cyber Styles */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

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

h1 {
    color: #ff7300;
    letter-spacing: 2px;
    margin-bottom: 10px;
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
    js: `// Cyber Logic
function initSequence() {
    const btn = document.querySelector('button');
    const h1 = document.querySelector('h1');
    
    btn.innerText = "PROCESSING...";
    btn.style.opacity = 0.7;
    
    // Simulate async operation
    setTimeout(() => {
        h1.innerText = "ACCESS GRANTED";
        h1.style.color = "#28a745";
        h1.style.textShadow = "0 0 15px rgba(40, 167, 69, 0.8)";
        
        btn.innerText = "SYSTEM ACTIVE";
        btn.style.borderColor = "#28a745";
        btn.style.color = "#28a745";
        btn.style.pointerEvents = "none";
        
        // Parent context notification (if in editor)
        console.log("System initialized successfully");
        try {
            if(window.parent.showAlertModal) {
               window.parent.showAlertModal("SUCCESS", "Protocol 7 initialized.");
            }
        } catch(e) {}
    }, 1500);
}

console.log("System Idle. Waiting for input.");`
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initializeEditors();
    setupEventListeners();
    loadTheme();
    loadSettings();
    loadView();
});

function initializeEditors() {
    console.log('Initializing Monaco Editor...');

    // Check if Monaco is already loaded
    if (window.monaco) {
        console.log('Monaco already loaded, creating editors...');
        createEditors();
        return;
    }

    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.49.0/min/vs' } });
    require(['vs/editor/editor.main'], () => {
        console.log('Monaco Editor loaded successfully');

        // Define custom themes immediately after Monaco loads
        if (window.defineMonacoThemes) {
            window.defineMonacoThemes();
        } else {
            console.warn('Theme definition function not found, using default theme');
        }

        createEditors();
    }, (error) => {
        console.error('Failed to load Monaco Editor:', error);
        showNotification('Błąd ładowania edytora. Sprawdź połączenie internetowe.', 'error');
    });
}

function createEditors() {
    try {
        console.log('Creating editors...');

        // Load saved content BEFORE creating editors
        let initialHtml = defaultContent.html;
        let initialCss = defaultContent.css;
        let initialJs = defaultContent.js;

        try {
            const autoSaved = localStorage.getItem('autoSavedProject');
            if (autoSaved) {
                const project = JSON.parse(autoSaved);
                if (project && (project.html || project.css || project.js)) {
                    initialHtml = project.html || defaultContent.html;
                    initialCss = project.css || defaultContent.css;
                    initialJs = project.js || defaultContent.js;
                    console.log('Loading saved content from autosave');
                }
            }
        } catch (e) {
            console.warn("Could not load autosave, using defaults:", e);
        }

        const sharedEditorOptions = getEditorOptions();

        editors.html = monaco.editor.create(document.getElementById('html-editor'), {
            ...sharedEditorOptions,
            value: initialHtml,
            language: 'html',
        });

        editors.css = monaco.editor.create(document.getElementById('css-editor'), {
            ...sharedEditorOptions,
            value: initialCss,
            language: 'css',
        });

        editors.js = monaco.editor.create(document.getElementById('js-editor'), {
            ...sharedEditorOptions,
            value: initialJs,
            language: 'javascript',
        });

        // Set theme after creation
        const savedTheme = localStorage.getItem('codeEditorTheme') || 'dark'; // Default to dark for this vibe
        let monacoTheme;
        if (savedTheme === 'dark') {
            // Check if custom terminal-dark theme is available
            try {
                monaco.editor.setTheme('terminal-dark');
                monacoTheme = 'terminal-dark';
            } catch (e) {
                // Fallback to vs-dark if custom theme not available
                monacoTheme = 'vs-dark';
                monaco.editor.setTheme(monacoTheme);
            }
        } else {
            // Check if custom terminal-light theme is available
            try {
                monaco.editor.setTheme('terminal-light');
                monacoTheme = 'terminal-light';
            } catch (e) {
                // Fallback to vs if custom theme not available
                monacoTheme = 'vs';
                monaco.editor.setTheme(monacoTheme);
            }
        }

        console.log('Editors created successfully');

        // Update preview and setup autosave
        updatePreview();
        setupAutoSave();
        configureBracketColors(); // Configure bracket colors after editors are ready

        Object.values(editors).forEach(editor => {
            editor.onDidChangeModelContent(() => {
                updatePreview();
                saveToLocalStorage(); // Save immediately on change
            });
        });

        // Show notification if content was restored
        if (initialHtml !== defaultContent.html || initialCss !== defaultContent.css || initialJs !== defaultContent.js) {
            updateStatus('Restored previous session');
            showNotification('Previous session restored.', 'info');
        } else {
            showNotification('SYSTEM READY. Editor Loaded.', 'success');
        }

    } catch (error) {
        console.error('Error creating editors:', error);
        showNotification('Editor creation error: ' + error.message, 'error');
    }
}

// This function is no longer needed as we load content before creating editors
// Keeping it for backward compatibility but it won't be called
function loadInitialContent() {
    // Content is now loaded in createEditors() before editor creation
    // This ensures saved content is used as initial value
}

// --- Event Listeners ---
function setupEventListeners() {
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.addEventListener('click', (e) => switchTab(e.currentTarget.dataset.tab, e.currentTarget));
    });

    document.getElementById('new-btn').addEventListener('click', newProject);
    document.getElementById('save-btn').addEventListener('click', saveProject);
    document.getElementById('load-btn').addEventListener('click', loadProject);
    document.getElementById('download-btn').addEventListener('click', downloadProject);
    elements.themeBtn.addEventListener('click', toggleTheme);

    document.getElementById('run-btn').addEventListener('click', runCode);
    document.getElementById('format-btn').addEventListener('click', formatCode);
    document.getElementById('clear-btn').addEventListener('click', clearCode);
    document.getElementById('clean-all-btn').addEventListener('click', cleanAll);
    document.getElementById('snippet-btn').addEventListener('click', insertSnippet);
    document.getElementById('shortcuts-btn').addEventListener('click', showShortcuts);
    document.getElementById('settings-btn').addEventListener('click', showSettings);

    document.getElementById('refresh-btn').addEventListener('click', refreshPreview);
    document.getElementById('new-window-btn').addEventListener('click', openInNewWindow);

    document.getElementById('view-editor-btn').addEventListener('click', () => switchView('editor'));
    document.getElementById('view-preview-btn').addEventListener('click', () => switchView('preview'));
    document.getElementById('view-both-btn').addEventListener('click', () => switchView('both'));

    elements.modal.cancelBtn.addEventListener('click', closeModal);
    elements.modal.container.addEventListener('click', (e) => {
        if (e.target === elements.modal.container) closeModal();
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            switch (e.key) {
                case 's': e.preventDefault(); saveProject(); break;
                case 'n': e.preventDefault(); newProject(); break;
                case 'o': e.preventDefault(); loadProject(); break;
                case 'Enter': e.preventDefault(); runCode(); break;
                case 't': e.preventDefault(); toggleTheme(); break;
            }
        }
        if (e.key === 'F1') { e.preventDefault(); showShortcuts(); }
        if (e.key === 'F5') { e.preventDefault(); refreshPreview(); }

        // Close any open modal with Escape
        if (e.key === 'Escape' && elements.modal.container.classList.contains('visible')) {
            e.preventDefault();
            closeModal();
        }
    });
}

// --- Core Functions ---

function switchTab(tab, tabElement) {
    currentTab = tab;
    document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    tabElement.classList.add('active');

    document.querySelectorAll('.editor-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tab + '-editor').classList.add('active');

    // Resize Monaco when tab becomes visible
    if (editors[tab]) editors[tab].layout();

    updateStatus(`Active: ${tab.toUpperCase()}`);
}

function updatePreview() {
    const fullHtml = `
                <!DOCTYPE html>
                <html lang="pl">
                <head>
                    <meta charset="UTF-8">
                    <style>${editors.css.getValue()}</style>
                </head>
                <body>
                    ${editors.html.getValue()}
                    <script>
                        try {
                            // Provide access to parent's modal functions
                            window.parent.showAlertModal = window.parent.showAlertModal || alert;
                            ${editors.js.getValue()}
                        } catch(e) {
                            console.error("JavaScript Error:", e);
                        }
                    <\/script>
                </body>
                </html>
            `;
    elements.previewIframe.srcdoc = fullHtml;
    updateStatus('Compiled.', 1000);
}

function runCode() {
    updatePreview();
    showNotification('Code executed.', 'success');
}

function refreshPreview() {
    updatePreview();
    showNotification('Preview refreshed.', 'info');
}

// --- Project Management Functions (Abbreviated for conciseness but functional) ---
function newProject() {
    showConfirmModal('New Protocol', 'Initialize new project sequence? Unsaved data will be purged.', () => {
        editors.html.setValue(defaultContent.html.replace("SYSTEM READY", "NEW PROJECT"));
        editors.css.setValue(defaultContent.css);
        editors.js.setValue(defaultContent.js);
        updatePreview();
        showNotification('New project initialized.', 'success');
    });
}

function saveProject() {
    showSaveProjectModal();
}

function showSaveProjectModal() {
    const modalHTML = `
                <div class="command-center-grid">
                    <div class="info-card">
                        <div class="card-header"><span>PROJECT NAME</span></div>
                        <input type="text" id="project-name" class="modal-input" placeholder="Enter protocol name">
                    </div>
                     <div class="info-card">
                        <div class="card-header"><span>CATEGORY</span></div>
                         <select id="project-category" class="modal-input">
                            <option>Website</option><option>Component</option><option>Experiment</option>
                        </select>
                    </div>
                </div>
                <div style="margin-top:15px; text-align:right;">
                    <button class="btn btn-primary" onclick="confirmSaveProject()">EXECUTE SAVE</button>
                </div>
            `;
    showCustomModal('ARCHIVE DATA', modalHTML, () => document.getElementById('project-name').focus(), 'archive-modal');
}

function confirmSaveProject() {
    const name = document.getElementById('project-name').value.trim();
    const category = document.getElementById('project-category').value || 'Website';

    if (!name) {
        showNotification('Name required.', 'warning');
        return;
    }

    try {
        const project = {
            id: Date.now(),
            name: name,
            category: category,
            html: editors.html.getValue(),
            css: editors.css.getValue(),
            js: editors.js.getValue(),
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        };

        const projects = JSON.parse(localStorage.getItem('savedProjects') || '[]');

        // Check if project with same name exists
        const existingIndex = projects.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
        if (existingIndex !== -1) {
            if (confirm(`Project "${name}" already exists. Overwrite?`)) {
                project.id = projects[existingIndex].id;
                project.created = projects[existingIndex].created;
                projects[existingIndex] = project;
            } else {
                return;
            }
        } else {
            projects.push(project);
        }

        // Try to save with error handling
        try {
            localStorage.setItem('savedProjects', JSON.stringify(projects));
            closeModal();
            showNotification(`Protocol "${name}" archived.`, 'success');
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                showNotification('Storage full. Please delete some projects.', 'error');
            } else {
                showNotification('Save failed: ' + e.message, 'error');
            }
        }
    } catch (e) {
        showNotification('Error saving project: ' + e.message, 'error');
        console.error('Save error:', e);
    }
}

function loadProject() {
    try {
        const projects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
        if (projects.length === 0) {
            showNotification('No archives found.', 'info');
            return;
        }

        // Sort by modified date (newest first)
        const sortedProjects = [...projects].sort((a, b) => {
            const dateA = new Date(a.modified || a.created);
            const dateB = new Date(b.modified || b.created);
            return dateB - dateA;
        });

        const listHTML = sortedProjects.map((p, idx) => {
            const originalIndex = projects.findIndex(proj => proj.id === p.id);
            const modified = p.modified || p.created;
            const category = p.category || 'Website';
            return `
                <div class="info-card project-card-clickable" onclick="loadProjectByIndex(${originalIndex})" style="margin-bottom:10px; position: relative;" onmouseenter="this.querySelector('.delete-btn-container').style.opacity='1'" onmouseleave="this.querySelector('.delete-btn-container').style.opacity='0'">
                    <div class="card-header">
                        <span>${p.name}</span>
                        <span class="card-status">${new Date(modified).toLocaleDateString()}</span>
                    </div>
                    <div class="card-body">
                        <i class="fas fa-folder"></i> ${category}
                        <span style="margin-left: auto; font-size: 0.7rem; color: var(--text-muted);">
                            <i class="fas fa-clock"></i> ${new Date(modified).toLocaleTimeString()}
                        </span>
                    </div>
                    <div class="delete-btn-container" style="position: absolute; top: 15px; right: 100px; opacity: 0; transition: opacity 0.2s ease;">
                        <button class="btn btn-icon btn-danger" onclick="event.stopPropagation(); deleteProject(${originalIndex});" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        showCustomModal('LOAD ARCHIVE', listHTML);
    } catch (e) {
        showNotification('Error loading projects: ' + e.message, 'error');
        console.error('Load error:', e);
    }
}

function loadProjectByIndex(index) {
    try {
        const projects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
        const p = projects[index];
        if (!p) {
            showNotification('Project not found.', 'error');
            return;
        }

        // Store project data for later use
        const projectToLoad = p;
        const projectIndex = index;

        // Close the project list modal first
        closeModal();

        // Show confirmation modal after modal animation completes
        setTimeout(() => {
            showConfirmModal(
                'Load Archive',
                `Load project "${projectToLoad.name}"?<br><br>Current unsaved changes will be lost.`,
                () => {
                    try {
                        editors.html.setValue(projectToLoad.html || '');
                        editors.css.setValue(projectToLoad.css || '');
                        editors.js.setValue(projectToLoad.js || '');
                        updatePreview();
                        showNotification(`Archive "${projectToLoad.name}" loaded.`, 'success');
                    } catch (e) {
                        showNotification('Error loading project: ' + e.message, 'error');
                        console.error('Load project error:', e);
                    }
                },
                'LOAD',
                'btn-primary'
            );
        }, 350); // Wait for modal close animation (300ms) + small buffer
    } catch (e) {
        showNotification('Error loading project: ' + e.message, 'error');
        console.error('Load project error:', e);
    }
}

function deleteProject(index) {
    showConfirmModal('Delete Project', 'Are you sure you want to delete this project? This action cannot be undone.', () => {
        try {
            const projects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
            if (index >= 0 && index < projects.length) {
                const projectName = projects[index].name;
                projects.splice(index, 1);
                localStorage.setItem('savedProjects', JSON.stringify(projects));
                showNotification(`Project "${projectName}" deleted.`, 'success');
                loadProject(); // Refresh the list
            }
        } catch (e) {
            showNotification('Error deleting project: ' + e.message, 'error');
            console.error('Delete error:', e);
        }
    }, 'DELETE', 'btn-danger');
}

function downloadProject() {
    const fullHtml = elements.previewIframe.srcdoc;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project_export.html';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Export successful.', 'success');
}

// --- Editor Features ---
async function formatCode() {
    await editors[currentTab].getAction('editor.action.formatDocument').run();
    showNotification('Syntax formatted.', 'success');
}

function clearCode() {
    showConfirmModal('Purge Buffer', `Clear active ${currentTab.toUpperCase()} buffer?`, () => {
        editors[currentTab].setValue('');
        updatePreview();
    }, 'PURGE', 'btn-danger');
}

function cleanAll() {
    showConfirmModal('Purge All Buffers', 'Clear all editors (HTML, CSS, JS)? This action cannot be undone.', () => {
        editors.html.setValue('');
        editors.css.setValue('');
        editors.js.setValue('');
        updatePreview();
        showNotification('All editors cleared.', 'success');
    }, 'PURGE ALL', 'btn-danger');
}

function insertSnippet() {
    const items = window.codeSnippets[currentTab] || [];
    if (items.length === 0) {
        showNotification('No snippets available for this tab.', 'info');
        return;
    }
    
    const tabIcon = currentTab === 'html' ? 'fab fa-html5' : (currentTab === 'css' ? 'fab fa-css3-alt' : 'fab fa-js');
    const tabName = currentTab.toUpperCase();
    
    const listHTML = `
        <div class="snippets-header-info">
            <div class="snippets-tab-badge">
                <i class="${tabIcon}"></i>
                <span>${tabName} SNIPPETS</span>
            </div>
            <div class="snippets-count">${items.length} available</div>
        </div>
        <div class="snippets-list">
            ${items.map((s, idx) => `
                <div class="snippet-item" onclick="insertSnippetCode(${idx})">
                    <div class="snippet-name">
                        <i class="fas fa-code setting-icon"></i>
                        <span>${s.name}</span>
                    </div>
                    <div class="snippet-code">${s.code.length > 150 ? s.code.substring(0, 150) + '...' : s.code}</div>
                </div>
            `).join('')}
        </div>
    `;

    elements.snippetsSidebar.body.innerHTML = listHTML;
    elements.snippetsSidebar.sidebar.classList.add('active');
    elements.snippetsSidebar.overlay.classList.add('active');
}

function closeSnippetsSidebar() {
    elements.snippetsSidebar.sidebar.classList.remove('active');
    elements.snippetsSidebar.overlay.classList.remove('active');
}
window.closeSnippetsSidebar = closeSnippetsSidebar;

function insertSnippetCode(index) {
    const s = window.codeSnippets[currentTab][index];
    const editor = editors[currentTab];
    const selection = editor.getSelection();
    const op = { range: selection, text: s.code, forceMoveMarkers: true };
    editor.executeEdits("snippet-insert", [op]);
    editor.focus();
    closeSnippetsSidebar();
}

// --- Settings & Utils ---
function getEditorOptions() {
    const currentTheme = localStorage.getItem('codeEditorTheme') || 'dark';
    const monacoTheme = currentTheme === 'dark' ? 'terminal-dark' : 'terminal-light';

    return {
        // Podstawowe ustawienia
        fontSize: editorSettings.fontSize,
        fontFamily: editorSettings.fontFamily,
        lineHeight: editorSettings.lineHeight || 0,
        automaticLayout: true,
        wordWrap: editorSettings.wordWrap || 'off',
        minimap: { enabled: editorSettings.minimap },
        theme: monacoTheme,

        // Kursor
        cursorBlinking: editorSettings.cursorBlinking || 'blink',
        cursorStyle: editorSettings.cursorStyle || 'line',
        cursorSmoothCaretAnimation: editorSettings.cursorSmoothCaretAnimation || false,
        cursorSurroundingLines: editorSettings.cursorSurroundingLines || 0,
        cursorSurroundingLinesStyle: editorSettings.cursorSurroundingLinesStyle || 'default',

        // Scroll i widok
        scrollBeyondLastLine: editorSettings.scrollBeyondLastLine !== false,
        roundedSelection: editorSettings.roundedSelection || false,
        renderLineHighlight: editorSettings.renderLineHighlight || 'all',
        renderIndentGuides: editorSettings.renderIndentGuides !== false,

        // Formatowanie
        tabSize: editorSettings.tabSize || 4,
        insertSpaces: editorSettings.insertSpaces !== false,
        renderWhitespace: editorSettings.renderWhitespace || 'none',
        formatOnPaste: editorSettings.formatOnPaste || false,
        formatOnType: editorSettings.formatOnType || false,
        autoIndent: editorSettings.autoIndent || 'full',

        // Nawiasy i kolorowanie
        bracketPairColorization: { enabled: editorSettings.bracketPairColorization !== false },
        matchBrackets: editorSettings.matchBrackets || 'always',
        guides: editorSettings.guides || { bracketPairs: true },

        // Zamykanie nawiasów i cudzysłowów
        autoClosingBrackets: editorSettings.autoClosingBrackets || 'always',
        autoClosingQuotes: editorSettings.autoClosingQuotes || 'always',

        // Podpowiedzi i sugestie
        suggestOnTriggerCharacters: editorSettings.suggestOnTriggerCharacters !== false,
        acceptSuggestionOnEnter: editorSettings.acceptSuggestionOnEnter || 'on',
        acceptSuggestionOnCommitCharacter: true,
        quickSuggestions: editorSettings.quickSuggestions || {
            other: true,
            comments: false,
            strings: true
        },
        quickSuggestionsDelay: editorSettings.quickSuggestionsDelay || 100,
        snippetSuggestions: 'top',
        wordBasedSuggestions: 'matchingDocuments',
        suggestSelection: 'first',
        tabCompletion: 'on',
        suggestLocality: 'recentFiles',

        // Zaawansowane podpowiedzi
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
            showIcons: true
        },

        // Parametry funkcji
        parameterHints: {
            enabled: true,
            cycle: false
        },

        // Podświetlanie
        occurrencesHighlight: editorSettings.occurrencesHighlight !== false,
        selectionHighlight: editorSettings.selectionHighlight !== false,
        colorDecorators: editorSettings.colorDecorators !== false,

        // Składanie kodu
        folding: editorSettings.folding !== false,
        showFoldingControls: editorSettings.showFoldingControls || 'mouseover',

        // Inne funkcje
        codeLens: editorSettings.codeLens || false,
        links: editorSettings.links !== false,
        mouseWheelZoom: editorSettings.mouseWheelZoom || false,
        multiCursorModifier: editorSettings.multiCursorModifier || 'alt',
        dragAndDrop: editorSettings.dragAndDrop !== false,
        emptySelectionClipboard: editorSettings.emptySelectionClipboard !== false,
        copyWithSyntaxHighlighting: editorSettings.copyWithSyntaxHighlighting !== false,
        smoothScrolling: editorSettings.smoothScrolling || false,
        stickyScroll: editorSettings.stickyScroll || { enabled: false }
    };
}

function loadSettings() {
    const saved = localStorage.getItem('codeEditorSettings');
    if (saved) editorSettings = { ...editorSettings, ...JSON.parse(saved) };
}

function showSettings() {
    const html = `
                <div class="settings-tabs">
                    <div class="settings-tab active" onclick="switchSettingsTab('general')">
                        <i class="fas fa-cog"></i> GENERAL
                    </div>
                    <div class="settings-tab" onclick="switchSettingsTab('cursor')">
                        <i class="fas fa-mouse-pointer"></i> CURSOR
                    </div>
                    <div class="settings-tab" onclick="switchSettingsTab('formatting')">
                        <i class="fas fa-code"></i> FORMATTING
                    </div>
                    <div class="settings-tab" onclick="switchSettingsTab('display')">
                        <i class="fas fa-eye"></i> DISPLAY
                    </div>
                    <div class="settings-tab" onclick="switchSettingsTab('advanced')">
                        <i class="fas fa-sliders-h"></i> ADVANCED
                    </div>
                </div>
                <div id="settings-general" class="settings-tab-content active">
                    <div class="setting-item setting-range">
                        <label class="setting-label">
                            <i class="fas fa-font setting-icon"></i>
                            <span>Font Size</span>
                        </label>
                        <div class="setting-control">
                            <input type="range" min="10" max="24" value="${editorSettings.fontSize}" 
                                onchange="updateSetting('fontSize', parseInt(this.value))" 
                                oninput="this.nextElementSibling.textContent = this.value + 'px'">
                            <span class="setting-value">${editorSettings.fontSize}px</span>
                        </div>
                    </div>
                    <div class="setting-item setting-range">
                        <label class="setting-label">
                            <i class="fas fa-text-height setting-icon"></i>
                            <span>Line Height</span>
                        </label>
                        <div class="setting-control">
                            <input type="range" min="0" max="50" value="${editorSettings.lineHeight || 0}" 
                                onchange="updateSetting('lineHeight', parseInt(this.value))" 
                                oninput="this.nextElementSibling.textContent = (this.value == 0 ? 'Auto' : this.value + 'px')">
                            <span class="setting-value">${editorSettings.lineHeight === 0 ? 'Auto' : editorSettings.lineHeight + 'px'}</span>
                        </div>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-font setting-icon"></i>
                            <span>Font Family</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('fontFamily', this.value)">
                            <option value='"JetBrains Mono", monospace' ${editorSettings.fontFamily.includes('JetBrains') ? 'selected' : ''}>JetBrains Mono</option>
                            <option value='"Share Tech Mono", monospace' ${editorSettings.fontFamily.includes('Share Tech') ? 'selected' : ''}>Share Tech Mono</option>
                            <option value='"Courier New", monospace' ${editorSettings.fontFamily.includes('Courier') ? 'selected' : ''}>Courier New</option>
                            <option value='monospace' ${editorSettings.fontFamily === 'monospace' ? 'selected' : ''}>System Monospace</option>
                        </select>
                    </div>
                    <div class="setting-item setting-range">
                        <label class="setting-label">
                            <i class="fas fa-indent setting-icon"></i>
                            <span>Tab Size</span>
                        </label>
                        <div class="setting-control">
                            <input type="range" min="2" max="8" value="${editorSettings.tabSize}" 
                                onchange="updateSetting('tabSize', parseInt(this.value))"
                                oninput="this.nextElementSibling.textContent = this.value">
                            <span class="setting-value">${editorSettings.tabSize}</span>
                        </div>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-text-width setting-icon"></i>
                            <span>Word Wrap</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('wordWrap', this.value)">
                            <option value="on" ${editorSettings.wordWrap === 'on' ? 'selected' : ''}>ON</option>
                            <option value="off" ${editorSettings.wordWrap === 'off' ? 'selected' : ''}>OFF</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-map setting-icon"></i>
                            <span>Minimap</span>
                            <input type="checkbox" ${editorSettings.minimap ? 'checked' : ''} 
                                onchange="updateSetting('minimap', this.checked)">
                        </label>
                    </div>
                </div>
                <div id="settings-cursor" class="settings-tab-content">
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-mouse-pointer setting-icon"></i>
                            <span>Cursor Style</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('cursorStyle', this.value)">
                            <option value="line" ${editorSettings.cursorStyle === 'line' ? 'selected' : ''}>LINE</option>
                            <option value="block" ${editorSettings.cursorStyle === 'block' ? 'selected' : ''}>BLOCK</option>
                            <option value="underline" ${editorSettings.cursorStyle === 'underline' ? 'selected' : ''}>UNDERLINE</option>
                            <option value="line-thin" ${editorSettings.cursorStyle === 'line-thin' ? 'selected' : ''}>LINE THIN</option>
                            <option value="block-outline" ${editorSettings.cursorStyle === 'block-outline' ? 'selected' : ''}>BLOCK OUTLINE</option>
                        </select>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-circle setting-icon"></i>
                            <span>Cursor Blinking</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('cursorBlinking', this.value)">
                            <option value="blink" ${editorSettings.cursorBlinking === 'blink' ? 'selected' : ''}>BLINK</option>
                            <option value="smooth" ${editorSettings.cursorBlinking === 'smooth' ? 'selected' : ''}>SMOOTH</option>
                            <option value="phase" ${editorSettings.cursorBlinking === 'phase' ? 'selected' : ''}>PHASE</option>
                            <option value="expand" ${editorSettings.cursorBlinking === 'expand' ? 'selected' : ''}>EXPAND</option>
                            <option value="solid" ${editorSettings.cursorBlinking === 'solid' ? 'selected' : ''}>SOLID</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-magic setting-icon"></i>
                            <span>Smooth Caret Animation</span>
                            <input type="checkbox" ${editorSettings.cursorSmoothCaretAnimation ? 'checked' : ''} 
                                onchange="updateSetting('cursorSmoothCaretAnimation', this.checked)">
                        </label>
                    </div>
                </div>
                <div id="settings-formatting" class="settings-tab-content">
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-brackets-curly setting-icon"></i>
                            <span>Auto Close Brackets</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('autoClosingBrackets', this.value)">
                            <option value="always" ${editorSettings.autoClosingBrackets === 'always' ? 'selected' : ''}>ALWAYS</option>
                            <option value="languageDefined" ${editorSettings.autoClosingBrackets === 'languageDefined' ? 'selected' : ''}>LANGUAGE DEFINED</option>
                            <option value="beforeWhitespace" ${editorSettings.autoClosingBrackets === 'beforeWhitespace' ? 'selected' : ''}>BEFORE WHITESPACE</option>
                            <option value="never" ${editorSettings.autoClosingBrackets === 'never' ? 'selected' : ''}>NEVER</option>
                        </select>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-quote-right setting-icon"></i>
                            <span>Auto Close Quotes</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('autoClosingQuotes', this.value)">
                            <option value="always" ${editorSettings.autoClosingQuotes === 'always' ? 'selected' : ''}>ALWAYS</option>
                            <option value="languageDefined" ${editorSettings.autoClosingQuotes === 'languageDefined' ? 'selected' : ''}>LANGUAGE DEFINED</option>
                            <option value="beforeWhitespace" ${editorSettings.autoClosingQuotes === 'beforeWhitespace' ? 'selected' : ''}>BEFORE WHITESPACE</option>
                            <option value="never" ${editorSettings.autoClosingQuotes === 'never' ? 'selected' : ''}>NEVER</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-palette setting-icon"></i>
                            <span>Bracket Pair Colorization</span>
                            <input type="checkbox" ${editorSettings.bracketPairColorization ? 'checked' : ''} 
                                onchange="updateSetting('bracketPairColorization', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-code-branch setting-icon"></i>
                            <span>Folding</span>
                            <input type="checkbox" ${editorSettings.folding ? 'checked' : ''} 
                                onchange="updateSetting('folding', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-indent setting-icon"></i>
                            <span>Insert Spaces</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('insertSpaces', this.value === 'true')">
                            <option value="true" ${editorSettings.insertSpaces ? 'selected' : ''}>SPACES</option>
                            <option value="false" ${!editorSettings.insertSpaces ? 'selected' : ''}>TABS</option>
                        </select>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-align-left setting-icon"></i>
                            <span>Auto Indent</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('autoIndent', this.value)">
                            <option value="none" ${editorSettings.autoIndent === 'none' ? 'selected' : ''}>NONE</option>
                            <option value="keep" ${editorSettings.autoIndent === 'keep' ? 'selected' : ''}>KEEP</option>
                            <option value="brackets" ${editorSettings.autoIndent === 'brackets' ? 'selected' : ''}>BRACKETS</option>
                            <option value="advanced" ${editorSettings.autoIndent === 'advanced' ? 'selected' : ''}>ADVANCED</option>
                            <option value="full" ${editorSettings.autoIndent === 'full' || !editorSettings.autoIndent ? 'selected' : ''}>FULL</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-paste setting-icon"></i>
                            <span>Format on Paste</span>
                            <input type="checkbox" ${editorSettings.formatOnPaste ? 'checked' : ''} 
                                onchange="updateSetting('formatOnPaste', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-keyboard setting-icon"></i>
                            <span>Format on Type</span>
                            <input type="checkbox" ${editorSettings.formatOnType ? 'checked' : ''} 
                                onchange="updateSetting('formatOnType', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-brackets-curly setting-icon"></i>
                            <span>Match Brackets</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('matchBrackets', this.value)">
                            <option value="always" ${editorSettings.matchBrackets === 'always' ? 'selected' : ''}>ALWAYS</option>
                            <option value="near" ${editorSettings.matchBrackets === 'near' ? 'selected' : ''}>NEAR</option>
                            <option value="never" ${editorSettings.matchBrackets === 'never' ? 'selected' : ''}>NEVER</option>
                        </select>
                    </div>
                </div>
                <div id="settings-display" class="settings-tab-content">
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-eye-slash setting-icon"></i>
                            <span>Render Whitespace</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('renderWhitespace', this.value)">
                            <option value="none" ${editorSettings.renderWhitespace === 'none' ? 'selected' : ''}>NONE</option>
                            <option value="boundary" ${editorSettings.renderWhitespace === 'boundary' ? 'selected' : ''}>BOUNDARY</option>
                            <option value="selection" ${editorSettings.renderWhitespace === 'selection' ? 'selected' : ''}>SELECTION</option>
                            <option value="trailing" ${editorSettings.renderWhitespace === 'trailing' ? 'selected' : ''}>TRAILING</option>
                            <option value="all" ${editorSettings.renderWhitespace === 'all' ? 'selected' : ''}>ALL</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-align-left setting-icon"></i>
                            <span>Render Indent Guides</span>
                            <input type="checkbox" ${editorSettings.renderIndentGuides ? 'checked' : ''} 
                                onchange="updateSetting('renderIndentGuides', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-arrows-alt-v setting-icon"></i>
                            <span>Scroll Beyond Last Line</span>
                            <input type="checkbox" ${editorSettings.scrollBeyondLastLine ? 'checked' : ''} 
                                onchange="updateSetting('scrollBeyondLastLine', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-search-plus setting-icon"></i>
                            <span>Mouse Wheel Zoom</span>
                            <input type="checkbox" ${editorSettings.mouseWheelZoom ? 'checked' : ''} 
                                onchange="updateSetting('mouseWheelZoom', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-highlighter setting-icon"></i>
                            <span>Occurrences Highlight</span>
                            <input type="checkbox" ${editorSettings.occurrencesHighlight ? 'checked' : ''} 
                                onchange="updateSetting('occurrencesHighlight', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-marker setting-icon"></i>
                            <span>Selection Highlight</span>
                            <input type="checkbox" ${editorSettings.selectionHighlight ? 'checked' : ''} 
                                onchange="updateSetting('selectionHighlight', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-highlighter setting-icon"></i>
                            <span>Render Line Highlight</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('renderLineHighlight', this.value)">
                            <option value="none" ${editorSettings.renderLineHighlight === 'none' ? 'selected' : ''}>NONE</option>
                            <option value="gutter" ${editorSettings.renderLineHighlight === 'gutter' ? 'selected' : ''}>GUTTER</option>
                            <option value="line" ${editorSettings.renderLineHighlight === 'line' ? 'selected' : ''}>LINE</option>
                            <option value="all" ${editorSettings.renderLineHighlight === 'all' || !editorSettings.renderLineHighlight ? 'selected' : ''}>ALL</option>
                        </select>
                    </div>
                </div>
                <div id="settings-advanced" class="settings-tab-content">
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-palette setting-icon"></i>
                            <span>Color Decorators</span>
                            <input type="checkbox" ${editorSettings.colorDecorators ? 'checked' : ''} 
                                onchange="updateSetting('colorDecorators', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-link setting-icon"></i>
                            <span>Links</span>
                            <input type="checkbox" ${editorSettings.links !== false ? 'checked' : ''} 
                                onchange="updateSetting('links', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-code setting-icon"></i>
                            <span>Code Lens</span>
                            <input type="checkbox" ${editorSettings.codeLens ? 'checked' : ''} 
                                onchange="updateSetting('codeLens', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-mouse setting-icon"></i>
                            <span>Drag and Drop</span>
                            <input type="checkbox" ${editorSettings.dragAndDrop !== false ? 'checked' : ''} 
                                onchange="updateSetting('dragAndDrop', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-copy setting-icon"></i>
                            <span>Empty Selection Clipboard</span>
                            <input type="checkbox" ${editorSettings.emptySelectionClipboard !== false ? 'checked' : ''} 
                                onchange="updateSetting('emptySelectionClipboard', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-highlighter setting-icon"></i>
                            <span>Copy with Syntax Highlighting</span>
                            <input type="checkbox" ${editorSettings.copyWithSyntaxHighlighting !== false ? 'checked' : ''} 
                                onchange="updateSetting('copyWithSyntaxHighlighting', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-sliders-h setting-icon"></i>
                            <span>Smooth Scrolling</span>
                            <input type="checkbox" ${editorSettings.smoothScrolling ? 'checked' : ''} 
                                onchange="updateSetting('smoothScrolling', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-circle setting-icon"></i>
                            <span>Rounded Selection</span>
                            <input type="checkbox" ${editorSettings.roundedSelection ? 'checked' : ''} 
                                onchange="updateSetting('roundedSelection', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-mouse-pointer setting-icon"></i>
                            <span>Multi Cursor Modifier</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('multiCursorModifier', this.value)">
                            <option value="ctrlCmd" ${editorSettings.multiCursorModifier === 'ctrlCmd' ? 'selected' : ''}>CTRL/CMD</option>
                            <option value="alt" ${editorSettings.multiCursorModifier === 'alt' || !editorSettings.multiCursorModifier ? 'selected' : ''}>ALT</option>
                        </select>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-code-branch setting-icon"></i>
                            <span>Show Folding Controls</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('showFoldingControls', this.value)">
                            <option value="always" ${editorSettings.showFoldingControls === 'always' ? 'selected' : ''}>ALWAYS</option>
                            <option value="mouseover" ${editorSettings.showFoldingControls === 'mouseover' || !editorSettings.showFoldingControls ? 'selected' : ''}>MOUSEOVER</option>
                            <option value="never" ${editorSettings.showFoldingControls === 'never' ? 'selected' : ''}>NEVER</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <i class="fas fa-lightbulb setting-icon"></i>
                            <span>Suggest on Trigger Characters</span>
                            <input type="checkbox" ${editorSettings.suggestOnTriggerCharacters !== false ? 'checked' : ''} 
                                onchange="updateSetting('suggestOnTriggerCharacters', this.checked)">
                        </label>
                    </div>
                    <div class="setting-item setting-select">
                        <label class="setting-label">
                            <i class="fas fa-keyboard setting-icon"></i>
                            <span>Accept Suggestion on Enter</span>
                        </label>
                        <select class="setting-select-input" onchange="updateSetting('acceptSuggestionOnEnter', this.value)">
                            <option value="on" ${editorSettings.acceptSuggestionOnEnter === 'on' || !editorSettings.acceptSuggestionOnEnter ? 'selected' : ''}>ON</option>
                            <option value="smart" ${editorSettings.acceptSuggestionOnEnter === 'smart' ? 'selected' : ''}>SMART</option>
                            <option value="off" ${editorSettings.acceptSuggestionOnEnter === 'off' ? 'selected' : ''}>OFF</option>
                        </select>
                    </div>
                    <div class="setting-item setting-range">
                        <label class="setting-label">
                            <i class="fas fa-clock setting-icon"></i>
                            <span>Quick Suggestions Delay</span>
                        </label>
                        <div class="setting-control">
                            <input type="range" min="0" max="1000" step="50" value="${editorSettings.quickSuggestionsDelay || 100}" 
                                onchange="updateSetting('quickSuggestionsDelay', parseInt(this.value))"
                                oninput="this.nextElementSibling.textContent = this.value + 'ms'">
                            <span class="setting-value">${editorSettings.quickSuggestionsDelay || 100}ms</span>
                        </div>
                    </div>
                </div>
            `;
    elements.settingsSidebar.body.innerHTML = html;
    elements.settingsSidebar.sidebar.classList.add('active');
    elements.settingsSidebar.overlay.classList.add('active');
}

function closeSettingsSidebar() {
    elements.settingsSidebar.sidebar.classList.remove('active');
    elements.settingsSidebar.overlay.classList.remove('active');
}
window.closeSettingsSidebar = closeSettingsSidebar;

function switchSettingsTab(tab) {
    // Hide all tab contents
    document.querySelectorAll('.settings-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.settings-tab').forEach(t => {
        t.classList.remove('active');
    });

    // Show selected tab content
    const content = document.getElementById('settings-' + tab);
    if (content) {
        content.classList.add('active');
    }

    // Add active class to clicked tab
    const clickedTab = event ? event.target.closest('.settings-tab') : null;
    if (clickedTab) {
        clickedTab.classList.add('active');
    } else {
        // Fallback: find tab by data attribute or text
        document.querySelectorAll('.settings-tab').forEach(t => {
            if (t.textContent.includes(tab.toUpperCase())) {
                t.classList.add('active');
            }
        });
    }
}

function updateSetting(key, val) {
    // Handle boolean values from string
    if (val === 'true' || val === true) {
        editorSettings[key] = true;
    } else if (val === 'false' || val === false) {
        editorSettings[key] = false;
    } else {
        editorSettings[key] = val;
    }

    localStorage.setItem('codeEditorSettings', JSON.stringify(editorSettings));

    // Update all editors with new options
    if (Object.keys(editors).length > 0) {
        Object.values(editors).forEach(e => {
            if (e) e.updateOptions(getEditorOptions());
        });
    }

    showNotification('Config updated.', 'success');
}

function showShortcuts() {
    const html = `
                <div class="info-card">
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        <div><strong style="color:var(--highlight)">Ctrl + S</strong> Save</div>
                        <div><strong style="color:var(--highlight)">Ctrl + Enter</strong> Run</div>
                        <div><strong style="color:var(--highlight)">F1</strong> Shortcuts</div>
                        <div><strong style="color:var(--highlight)">Ctrl + T</strong> Theme</div>
                    </div>
                </div>
             `;
    showCustomModal('KEY BINDINGS', html, null, 'keybindings-modal');
}

// --- Theme & Visuals ---
function toggleTheme() {
    const current = document.documentElement.getAttribute('theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('theme', next);
    localStorage.setItem('codeEditorTheme', next);

    if (window.monaco) {
        if (next === 'dark') {
            // Try to use custom terminal-dark theme, fallback to vs-dark
            try {
                monaco.editor.setTheme('terminal-dark');
            } catch (e) {
                monaco.editor.setTheme('vs-dark');
            }
        } else {
            // Try to use custom terminal-light theme, fallback to vs
            try {
                monaco.editor.setTheme('terminal-light');
            } catch (e) {
                monaco.editor.setTheme('vs');
            }
        }
    }

    elements.themeBtn.innerHTML = next === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

function loadTheme() {
    const saved = localStorage.getItem('codeEditorTheme') || 'dark';
    document.documentElement.setAttribute('theme', saved);
    if (elements.themeBtn) elements.themeBtn.innerHTML = saved === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

function switchView(view) {
    currentView = view;
    localStorage.setItem('codeEditorView', view);

    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');
    const dataGrid = document.getElementById('data-grid');
    const viewEditorBtn = document.getElementById('view-editor-btn');
    const viewPreviewBtn = document.getElementById('view-preview-btn');
    const viewBothBtn = document.getElementById('view-both-btn');

    // Remove active class from all view buttons
    viewEditorBtn.classList.remove('active');
    viewPreviewBtn.classList.remove('active');
    viewBothBtn.classList.remove('active');

    // Update grid layout and visibility
    if (view === 'editor') {
        dataGrid.style.gridTemplateColumns = '1fr';
        editorPane.style.display = 'flex';
        previewPane.style.display = 'none';
        viewEditorBtn.classList.add('active');
    } else if (view === 'preview') {
        dataGrid.style.gridTemplateColumns = '1fr';
        editorPane.style.display = 'none';
        previewPane.style.display = 'flex';
        viewPreviewBtn.classList.add('active');
    } else { // both
        dataGrid.style.gridTemplateColumns = '1fr 1fr';
        editorPane.style.display = 'flex';
        previewPane.style.display = 'flex';
        viewBothBtn.classList.add('active');
    }

    // Resize Monaco editors after view change
    setTimeout(() => {
        Object.values(editors).forEach(editor => {
            if (editor) editor.layout();
        });
    }, 100);

    updateStatus(`View: ${view.toUpperCase()}`);
}

function loadView() {
    const saved = localStorage.getItem('codeEditorView') || 'both';
    switchView(saved);
}

// Debounce function to avoid too frequent saves
let saveTimeout = null;
function saveToLocalStorage() {
    // Clear existing timeout
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }

    // Save after 500ms of no changes (debounce)
    saveTimeout = setTimeout(() => {
        try {
            if (!editors.html || !editors.css || !editors.js) return;

            const current = {
                html: editors.html.getValue(),
                css: editors.css.getValue(),
                js: editors.js.getValue()
            };

            const project = {
                html: current.html,
                css: current.css,
                js: current.js,
                timestamp: new Date().toISOString()
            };

            try {
                localStorage.setItem('autoSavedProject', JSON.stringify(project));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    console.warn('Autosave failed: Storage quota exceeded');
                    // Try to clear old autosave
                    try {
                        localStorage.removeItem('autoSavedProject');
                        localStorage.setItem('autoSavedProject', JSON.stringify(project));
                    } catch (err) {
                        console.error('Could not save autosave:', err);
                    }
                }
            }
        } catch (e) {
            console.error('Autosave error:', e);
        }
    }, 500); // Debounce: save 500ms after last change
}

function setupAutoSave() {
    // Save immediately on first load
    if (editors.html && editors.css && editors.js) {
        saveToLocalStorage();
    }
}

function configureBracketColors() {
    // Monaco handles this via options mainly, handled in getEditorOptions
}

// --- UI Utils ---
function updateStatus(msg, dur = 3000) {
    elements.fileStatus.textContent = msg;
    setTimeout(() => elements.fileStatus.textContent = 'Ready.', dur);
}

function showNotification(msg, type = 'info') {
    const c = document.getElementById('notification-container');
    const n = document.createElement('div');
    const color = type === 'success' ? 'var(--success-color)' :
        type === 'warning' ? 'var(--warning-color)' :
            type === 'error' ? 'var(--danger-color)' :
                'var(--info-color)';

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
        n.style.animation = 'fadeOutShrink 0.3s forwards';
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

// --- Modal System ---
function openModal() { elements.modal.container.classList.add('visible'); }
function closeModal() {
    elements.modal.container.classList.remove('visible');
    // Reset modal state after animation usually, simpler here:
    setTimeout(() => {
        elements.modal.body.innerHTML = '';
        elements.modal.actions.style.display = 'flex';
        elements.modal.confirmBtn.style.display = 'inline-flex';
        // Remove all size classes
        elements.modal.modal.classList.remove('snippets-modal', 'settings-modal', 'archive-modal', 'load-archive-modal', 'keybindings-modal', 'confirm-modal');
    }, 300);
}

function showConfirmModal(title, msg, onConfirm, confirmText = 'CONFIRM', confirmClass = 'btn-primary') {
    // Reset modal state first
    elements.modal.title.textContent = title;
    elements.modal.body.innerHTML = msg; // Use innerHTML to support HTML formatting
    elements.modal.actions.style.display = 'flex'; // Make sure actions are visible
    elements.modal.confirmBtn.style.display = 'inline-flex';
    elements.modal.cancelBtn.style.display = 'inline-flex';
    elements.modal.confirmBtn.textContent = confirmText;
    elements.modal.cancelBtn.textContent = 'CANCEL';
    elements.modal.confirmBtn.className = `btn ${confirmClass}`;
    elements.modal.cancelBtn.className = 'btn';
    elements.modal.confirmBtn.onclick = () => {
        if (onConfirm) onConfirm();
        closeModal();
    };
    elements.modal.cancelBtn.onclick = closeModal;

    // Remove all size classes and add confirm-modal
    elements.modal.modal.classList.remove('snippets-modal', 'settings-modal', 'archive-modal', 'load-archive-modal', 'keybindings-modal', 'confirm-modal');
    elements.modal.modal.classList.add('confirm-modal');

    openModal();
}

function showCustomModal(title, content, onOpen, sizeClass) {
    elements.modal.title.textContent = title;
    elements.modal.body.innerHTML = content;
    elements.modal.actions.style.display = 'none';

    // Remove all size classes first
    elements.modal.modal.classList.remove('snippets-modal', 'settings-modal', 'archive-modal', 'load-archive-modal', 'keybindings-modal', 'confirm-modal');

    // Add the specified size class
    if (sizeClass) {
        elements.modal.modal.classList.add(sizeClass);
    }

    openModal();
    if (onOpen) onOpen();
}

function openInNewWindow() {
    const w = window.open();
    w.document.write(elements.previewIframe.srcdoc);
}
