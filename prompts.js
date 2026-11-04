
const { blocks } = require('./environment');

const http = require('http');
const PORT = 3000;

// Convert blocks into a searchable list.
const prompts = blocks.flatMap(block =>
    Object.entries(block).map(([key, value]) => ({
        key,
        value: String(value)
    }))
);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Prompt Block Browser</title>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        background: #171717;
        color: #eee;
    }

    h2 {
        margin-top: 0;
    }

    .container {
        display: flex;
        gap: 20px;
        height: calc(100vh - 100px);
    }

    .left {
        width: 35%;
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .right {
        width: 65%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        min-width: 0;
    }

    input {
        padding: 12px;
        font-size: 16px;
        background: #292929;
        color: white;
        border: 1px solid #555;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    #results {
        overflow-y: auto;
        flex: 1;
    }

    .block {
        background: #292929;
        border: 1px solid #444;
        border-radius: 5px;
        padding: 12px;
        margin-bottom: 8px;
        cursor: pointer;
    }

    .block:hover {
        background: #3b3b3b;
        border-color: #888;
    }

    .block strong {
        display: block;
        color: #8ecbff;
        margin-bottom: 6px;
    }

    .block p {
        margin: 0;
        color: #ccc;
        font-size: 13px;
        line-height: 1.5;
    }

    .output-section {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
    }

    .output-section h3 {
        margin: 0 0 8px 0;
    }

    #tagList {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 10px;
        background: #292929;
        border: 1px solid #555;
        border-radius: 5px;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #244b68;
        border: 1px solid #3979a5;
        border-radius: 5px;
        padding: 7px 10px;
        height: fit-content;
        color: white;
        font-size: 13px;
    }

    .tag button {
        margin: 0;
        padding: 0;
        background: transparent;
        color: #ffaaaa;
        font-size: 18px;
        line-height: 14px;
        font-weight: bold;
    }

    .tag button:hover {
        color: white;
        background: transparent;
    }

    .empty-tags {
        color: #888;
        font-size: 13px;
    }

    textarea {
        flex: 1;
        width: 100%;
        min-height: 0;
        resize: none;
        padding: 15px;
        background: #292929;
        color: white;
        border: 1px solid #555;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
    }

    button {
        padding: 10px 16px;
        margin-top: 8px;
        margin-right: 6px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
        background: #2878bd;
        color: white;
        font-size: 14px;
    }

    button:hover {
        background: #3995df;
    }

    .count {
        color: #aaa;
        font-size: 13px;
        margin-bottom: 10px;
    }

    @media(max-width: 750px) {
        .container {
            flex-direction: column;
            height: auto;
        }

        .left, .right {
            width: 100%;
            height: 45vh;
        }
    }
</style>
</head>

<body>

<h2>Prompt Block Browser</h2>

<div class="container">

    <!-- LEFT: SEARCH AND BLOCKS -->

    <div class="left">

        <input
            type="text"
            id="search"
            placeholder="Filter blocks... e.g. Cam"
            autofocus
        >

        <div class="count" id="count"></div>

        <div id="results"></div>

    </div>

    <!-- RIGHT: OUTPUTS -->

    <div class="right">

        <!-- TAG OUTPUT -->

        <div class="output-section">

            <h3>1. Tags / Placeholders</h3>

            <div id="tagList">
                <span class="empty-tags">
                    Click blocks to add tags...
                </span>
            </div>

            <div>
                <button onclick="copyText('tagsOutput')">
                    Copy Tags
                </button>

                <button onclick="clearOutputs()">
                    Clear All
                </button>
            </div>

            <textarea
                id="tagsOutput"
                style="display:none"
            ></textarea>

        </div>

        <!-- EXPLODED PROMPT OUTPUT -->

        <div class="output-section">

            <h3>2. Exploded Prompt</h3>

            <textarea
                id="explodedOutput"
                placeholder="The expanded prompt will appear here..."
            ></textarea>

            <div>
                <button onclick="copyText('explodedOutput')">
                    Copy Exploded Prompt
                </button>
            </div>

        </div>

    </div>

</div>

<script>

// All available prompt blocks.
const prompts = ${JSON.stringify(prompts).replace(/</g, '\\u003c')};

// DOM elements.
const search = document.getElementById('search');
const results = document.getElementById('results');
const count = document.getElementById('count');

const tagList = document.getElementById('tagList');
const tagsOutput = document.getElementById('tagsOutput');
const explodedOutput = document.getElementById('explodedOutput');

// Selected prompt blocks, maintained in selection order.
let selectedPrompts = [];


// ============================================
// FILTER BLOCKS
// ============================================

function filterBlocks() {

    const query = search.value.trim().toLowerCase();

    const filtered = prompts.filter(item =>
        item.key.toLowerCase().includes(query) ||
        item.value.toLowerCase().includes(query)
    );

    results.innerHTML = '';

    count.textContent =
        filtered.length + ' of ' + prompts.length + ' blocks';

    filtered.forEach(item => {

        const block = document.createElement('div');
        block.className = 'block';

        const title = document.createElement('strong');
        title.textContent = '{' + item.key + '}';

        const description = document.createElement('p');
        description.textContent = item.value;

        block.appendChild(title);
        block.appendChild(description);

        block.addEventListener('click', () => {
            addPrompt(item);
        });

        results.appendChild(block);

    });
}


// ============================================
// ADD PROMPT
// ============================================

function addPrompt(item) {

    selectedPrompts.push(item);

    updateOutputs();

}


// ============================================
// REMOVE PROMPT
// ============================================

function removePrompt(index) {

    selectedPrompts.splice(index, 1);

    updateOutputs();

}


// ============================================
// UPDATE BOTH OUTPUTS
// ============================================

function updateOutputs() {

    // Clear current tag display.
    tagList.innerHTML = '';

    // Empty state.
    if (selectedPrompts.length === 0) {

        const empty = document.createElement('span');

        empty.className = 'empty-tags';
        empty.textContent = 'Click blocks to add tags...';

        tagList.appendChild(empty);

    }

    // Rebuild clickable tags.
    selectedPrompts.forEach((item, index) => {

        const tag = document.createElement('div');
        tag.className = 'tag';

        const label = document.createElement('span');

        label.textContent = '{' + item.key + '}';

        const remove = document.createElement('button');

        remove.textContent = '×';
        remove.title = 'Remove tag';

        remove.addEventListener('click', () => {
            removePrompt(index);
        });

        tag.appendChild(label);
        tag.appendChild(remove);

        tagList.appendChild(tag);

    });


    // OUTPUT 1: PLACEHOLDERS

    tagsOutput.value = selectedPrompts
        .map(item => '{' + item.key + '}')
        .join(' ');


    // OUTPUT 2: EXPLODED PROMPT

    explodedOutput.value = selectedPrompts
        .map(item => item.value)
        .join(' ');

}


// ============================================
// CLEAR OUTPUTS
// ============================================

function clearOutputs() {

    selectedPrompts = [];

    updateOutputs();

}


// ============================================
// COPY OUTPUT
// ============================================

async function copyText(id) {

    const textarea = document.getElementById(id);

    try {

        await navigator.clipboard.writeText(textarea.value);

    } catch (error) {

        textarea.style.display = 'block';
        textarea.select();
        document.execCommand('copy');
        textarea.style.display = 'none';

    }

}


// ============================================
// INITIALISE
// ============================================

search.addEventListener('input', filterBlocks);

filterBlocks();

updateOutputs();

</script>

</body>
</html>`;

// ============================================
// HTTP SERVER
// ============================================

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(html);

        return;

    }

    res.writeHead(404);

    res.end('Not found');

});

server.listen(PORT, () => {

    console.log('====================================');
    console.log(' PROMPT BLOCK BROWSER');
    console.log('====================================');

    console.log('Loaded prompts:', prompts.length);

    console.log('Open: http://localhost:' + PORT);

});
