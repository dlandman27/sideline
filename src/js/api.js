// API and data handling functions
const vscode = acquireVsCodeApi();

function refreshData() {
    vscode.postMessage({
        command: 'refresh'
    });
}

function selectTeam(team) {
    vscode.postMessage({
        command: 'selectTeam',
        team: team
    });
}

function openGame(gameUrl) {
    vscode.postMessage({
        command: 'openGame',
        gameUrl: gameUrl
    });
}

function tailGame(gameData) {
    vscode.postMessage({
        command: 'tailGame',
        gameData: gameData
    });
}

function generateGameUrl(homeTeam, awayTeam, sport) {
    const baseUrls = {
        'nfl': 'https://www.espn.com/nfl/game/_/gameId/',
        'nba': 'https://www.espn.com/nba/game/_/gameId/',
        'premierLeague': 'https://www.espn.com/soccer/match/_/gameId/',
        'nhl': 'https://www.espn.com/nhl/game/_/gameId/',
        'mlb': 'https://www.espn.com/mlb/game/_/gameId/'
    };
    
    // For now, we'll use a generic ESPN search URL since we don't have game IDs
    const searchQuery = encodeURIComponent(`${awayTeam} vs ${homeTeam}`);
    return `https://www.espn.com/search/results?q=${searchQuery}`;
}

// Listen for messages from the extension
window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
        case 'updateData':
            renderData(message.data);
            break;
    }
});

// Initial data load
refreshData();
