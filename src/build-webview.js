const fs = require('fs');
const path = require('path');

// Read all the modular files
const mainCSS = fs.readFileSync(path.join(__dirname, 'styles', 'main.css'), 'utf8');
const sportSectionCSS = fs.readFileSync(path.join(__dirname, 'styles', 'sport-section.css'), 'utf8');
const gameCSS = fs.readFileSync(path.join(__dirname, 'styles', 'game.css'), 'utf8');
const apiJS = fs.readFileSync(path.join(__dirname, 'js', 'api.js'), 'utf8');
const rendererJS = fs.readFileSync(path.join(__dirname, 'js', 'renderer.js'), 'utf8');

// Create the inline HTML
const inlineHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sideline</title>
    <style>
        ${mainCSS}
        ${sportSectionCSS}
        ${gameCSS}
    </style>
</head>
<body>
    <!-- Header Component -->
    <div class="header">
        <h1>🏈 Sideline</h1>
        <div class="click-hint">Click any game to view detailed stats online • Click "Tail" to track live updates</div>
    </div>
    
    <button class="refresh-btn" onclick="refreshData()">🔄 Refresh Scores</button>
    
    <!-- Main Content -->
    <div id="content">
        <div class="loading">Loading sports data...</div>
    </div>
    
    <!-- Debug Panel -->
    <div id="debug" class="debug" style="display: none;">
        <strong>Debug Info:</strong><br>
        <div id="debug-content"></div>
    </div>
    
    <script>
        ${apiJS}
        ${rendererJS}
    </script>
</body>
</html>`;

// Write the inline HTML file
fs.writeFileSync(path.join(__dirname, 'webview-inline.html'), inlineHTML);
console.log('✅ Built inline webview successfully!');
