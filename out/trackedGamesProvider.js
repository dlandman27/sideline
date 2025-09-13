"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackedGameItem = exports.TrackedGamesWebviewItem = exports.NoGamesItem = exports.TrackedGamesProvider = void 0;
const vscode = require("vscode");
class TrackedGamesProvider {
    constructor(gameTracker, extensionUri) {
        this.gameTracker = gameTracker;
        this.extensionUri = extensionUri;
        // Listen for game updates
        this.gameTracker.setOnGameUpdate((trackedGame, hasScoreChanged) => {
            // Update the sidebar view when games change
            this.refresh();
        });
    }
    refresh() {
        if (this._view) {
            this.updateWebview();
        }
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };
        webviewView.webview.html = this.getTrackedGamesWebviewContent();
        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'stopTracking':
                    this.gameTracker.stopTracking(message.gameId);
                    this.refresh();
                    return;
                case 'getTrackedGames':
                    this.updateWebview();
                    return;
                case 'openMainComponent':
                    vscode.commands.executeCommand('sideline.openPanel');
                    return;
            }
        }, undefined, []);
        // Initial load
        this.updateWebview();
        // Set up automatic refresh every 30 seconds
        this.startAutoRefresh();
    }
    updateWebview() {
        if (this._view) {
            const trackedGames = this.gameTracker.getTrackedGames();
            this._view.webview.postMessage({
                command: 'updateTrackedGames',
                data: trackedGames
            });
        }
    }
    startAutoRefresh() {
        // Get refresh interval from configuration
        const config = vscode.workspace.getConfiguration('sideline');
        const refreshInterval = config.get('refreshInterval', 30);
        const intervalMs = refreshInterval * 1000; // Convert to milliseconds
        // Refresh at the configured interval
        setInterval(() => {
            if (this._view) {
                // Trigger a refresh of the game data
                this.gameTracker.refreshAllGames();
                this.updateWebview();
            }
        }, intervalMs);
    }
    getTrackedGamesWebviewContent() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tracked Games</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            color: var(--vscode-foreground);
            margin: 0;
            padding: 10px;
            min-height: 100vh;
            max-width: 300px;
            margin: 0 auto;
            background: var(--vscode-editor-background);
            position: relative;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            font-family: 'Impact', 'Arial Black', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
            letter-spacing: 1px;
        }
        
        .header p {
            color: #a0a0a0;
            margin: 8px 0 0 0;
            font-size: 16px;
        }
        
        .sport-section {
            margin-bottom: 0;
        }
        
        .section-divider {
            margin: 8px 0;
            border: none;
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .sport-title {
            color: #a0a0a0;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: color 0.2s ease;
        }
        
        .sport-title:hover {
            color: #ffffff;
        }
        
        .accordion-icon {
            font-size: 10px;
            transition: transform 0.2s ease;
            color: #a0a0a0;
        }
        
        .accordion-icon.collapsed {
            transform: rotate(-90deg);
        }

        #content {
            padding-bottom: 20px;
        }
        
        .sport-content {
            transition: all 0.3s ease;
            overflow: hidden;
            padding-top: 8px;
        }
        
        .sport-content.collapsed {
            max-height: 0;
            margin-bottom: 0;
            opacity: 0;
        }
        
        .sport-section.collapsed {
            margin-bottom: 5px;
        }
        
        .sport-header {
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(20px);
            padding: 16px 20px;
            font-family: 'Impact', 'Arial Black', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: 500;
            font-size: 18px;
            letter-spacing: 0.5px;
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .game {
            padding: 8px 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            flex-direction: column;
            transition: all 0.2s ease;
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-bottom: 4px;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .game.live {
            border-left: 3px solid #ff4444;
            background: rgba(255, 68, 68, 0.05);
        }
        
        .game.final {
            opacity: 0.85;
        }
        
        .teams {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            flex: 1;
        }
        
        .team {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            flex: 0 0 auto;
        }
        
        .team-logo {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            object-fit: contain;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 2px;
        }
        
        .team-logo-fallback {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
            color: #a0a0a0;
            padding: 2px;
        }
        
        .team-name {
            font-weight: 500;
            font-size: 10px;
            color: #ffffff;
            text-align: center;
            font-family: 'Impact', 'Arial Black', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
            letter-spacing: 0.3px;
        }
        
        .game-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            margin: 0 6px;
        }
        
        .game-score {
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            text-align: center;
        }
        
        .game-time {
            font-size: 8px;
            color: #a0a0a0;
            text-align: center;
        }
        
        .game-status-center {
            font-size: 8px;
            color: #a0a0a0;
            text-align: center;
        }
        
        .live-indicator {
            background: linear-gradient(45deg, #ff4444, #ff6666);
            color: white;
            padding: 2px 4px;
            border-radius: 6px;
            font-size: 7px;
            font-weight: 600;
            animation: pulse 2s infinite;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        
        .stop-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            background: transparent;
            color: rgba(255, 255, 255, 0.5);
            border: none;
            padding: 2px;
            border-radius: 2px;
            cursor: pointer;
            font-size: 10px;
            font-weight: 400;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 14px;
            height: 14px;
            line-height: 1;
            opacity: 0.7;
        }
        
        .stop-btn:hover {
            background: rgba(255, 107, 107, 0.1);
            color: rgba(255, 107, 107, 0.8);
            opacity: 1;
        }
        
        .no-games {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #ffa500 0%, #1a1a1a 25%, #1a1a1a 75%, #ffa500 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .no-games::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #ffa500 0%, #1a1a1a 25%, #1a1a1a 75%, #ffa500 100%);
            filter: blur(40px);
            opacity: 0.8;
            z-index: -1;
        }
        
        .no-games-logo {
            width: 80vw;
            max-width: 300px;
            height: auto;
            margin-bottom: 0;
            filter: brightness(0) invert(1);
        }
        
        .no-games-text {
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 25px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .no-games-btn {
            background: rgba(255, 165, 0, 0.2);
            color: #ffa500;
            border: 1px solid #ffa500;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            font-size: 12px;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
        }
        
        .no-games-btn:hover {
            background: #ffa500;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
        }
        
        
        .click-hint {
            font-size: 11px;
            color: #a0a0a0;
            text-align: center;
            margin-top: 10px;
            font-style: italic;
        }
    </style>
</head>
<body>
    
    <div id="content">
        <div class="no-games">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9Ijc1IiB2aWV3Qm94PSIwIDAgMzAwIDc1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxNTAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkltcGFjdCwgQXJpYWwgQmxhY2ssIEhlbHZldGljYSBOZXVlLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNjAwIiBsZXR0ZXItc3BhY2luZz0iMnB4Ij5TSURFTElORTwvdGV4dD4KPC9zdmc+" alt="SIDELINE" class="no-games-logo">
            <div class="no-games-text">Loading tracked games...</div>
        </div>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        function stopTracking(gameId) {
            vscode.postMessage({
                command: 'stopTracking',
                gameId: gameId
            });
        }
        
        function openMainComponent() {
            vscode.postMessage({
                command: 'openMainComponent'
            });
        }
        
        function formatGameTime(dateString, timeString) {
            if (!dateString) return 'TBD';
            
            try {
                const gameDate = new Date(dateString);
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const gameDay = new Date(gameDate.getFullYear(), gameDate.getMonth(), gameDate.getDate());
                
                let dayText = '';
                if (gameDay.getTime() === today.getTime()) {
                    dayText = 'Today';
                } else if (gameDay.getTime() === tomorrow.getTime()) {
                    dayText = 'Tomorrow';
                } else {
                    dayText = gameDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                }
                
                const timeText = gameDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                return \`\${dayText} \${timeText}\`;
            } catch (error) {
                return timeString || 'TBD';
            }
        }
        
        function formatBaseballInning(quarter, minute) {
            if (!quarter && !minute) return 'TBD';
            
            // Try to parse inning from quarter or minute
            let inning = quarter || minute;
            if (typeof inning === 'string') {
                // Look for patterns like "1st", "2nd", "3rd", "4th", etc.
                const inningMatch = inning.match(/(\d+)(st|nd|rd|th)/i);
                if (inningMatch) {
                    const inningNum = parseInt(inningMatch[1]);
                    const isTop = inning.toLowerCase().includes('top') || inning.toLowerCase().includes('1st') || inning.toLowerCase().includes('3rd') || inning.toLowerCase().includes('5th') || inning.toLowerCase().includes('7th') || inning.toLowerCase().includes('9th');
                    return isTop ? \`↑\${inningNum}\` : \`↓\${inningNum}\`;
                }
                
                // Look for just numbers
                const numMatch = inning.match(/(\d+)/);
                if (numMatch) {
                    const inningNum = parseInt(numMatch[1]);
                    // Default to top of inning if we can't determine
                    return \`↑\${inningNum}\`;
                }
            }
            
            return inning || 'TBD';
        }
        
        function renderTrackedGames(trackedGames) {
            const content = document.getElementById('content');
            
            if (!trackedGames || trackedGames.length === 0) {
                content.innerHTML = '<div class="no-games"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9Ijc1IiB2aWV3Qm94PSIwIDAgMzAwIDc1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxNTAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkltcGFjdCwgQXJpYWwgQmxhY2ssIEhlbHZldGljYSBOZXVlLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNjAwIiBsZXR0ZXItc3BhY2luZz0iMnB4Ij5TSURFTElORTwvdGV4dD4KPC9zdmc+" alt="SIDELINE" class="no-games-logo"><div class="no-games-text">No games being tailed</div><button class="no-games-btn" onclick="openMainComponent()">View All Games</button></div>';
                return;
            }
            
            // Group games by sport
            const gamesBySport = {};
            trackedGames.forEach(trackedGame => {
                const sport = trackedGame.sport;
                if (!gamesBySport[sport]) {
                    gamesBySport[sport] = [];
                }
                gamesBySport[sport].push(trackedGame);
            });
            
            let html = '';
            
            // Render each sport section
            const sportKeys = Object.keys(gamesBySport);
            sportKeys.forEach((sport, index) => {
                const games = gamesBySport[sport];
                
                // Get sport display info
                const sportInfo = getSportInfo(sport);
                
                html += \`
                    <div class="sport-section">
                        <div class="sport-title" onclick="toggleSportSection('\${sport}')">
                            \${sportInfo.emoji} \${sportInfo.name} (\${games.length})
                            <span class="accordion-icon" id="accordion-icon-\${sport}">▼</span>
                        </div>
                        <div class="sport-content" id="sport-content-\${sport}">
                        \${games.map(trackedGame => {
                            const game = trackedGame.game;
                            const isLive = game.status && (game.status.includes('LIVE') || game.status.includes('IN_PROGRESS') || game.status.includes('SECOND_HALF') || game.status.includes('FIRST_HALF') || game.status === 'Live');
                            const awayColor = game.away.colors?.primary || '#4a5568';
                            const homeColor = game.home.colors?.primary || '#4a5568';
                            
                            // Premier League has home team on the left, other sports have away team on the left
                            const isPremierLeague = trackedGame.sport === 'premierLeague';
                            const leftTeam = isPremierLeague ? game.home : game.away;
                            const rightTeam = isPremierLeague ? game.away : game.home;
                            const leftColor = isPremierLeague ? homeColor : awayColor;
                            const rightColor = isPremierLeague ? awayColor : homeColor;
                            const scoreDisplay = isPremierLeague ? \`\${game.home.score} - \${game.away.score}\` : \`\${game.away.score} - \${game.home.score}\`;
                            
                            const gradientStyle = \`background: linear-gradient(90deg, \${leftColor}40 0%, rgba(255,255,255,0.05) 50%, \${rightColor}40 100%);\`;
                            
                            return \`
                                <div class="game \${isLive ? 'live' : game.status === 'Final' || game.status === 'STATUS_FINAL' ? 'final' : ''}" style="\${gradientStyle}">
                                    <button class="stop-btn" onclick="stopTracking('\${trackedGame.id}')" title="Stop Tracking">×</button>
                                    <div class="teams">
                                        <div class="team">
                                            \${leftTeam.logo ? \`<img src="\${leftTeam.logo}" alt="\${leftTeam.name}" class="team-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">\` : \`<div class="team-logo-fallback">\${leftTeam.name.charAt(0)}</div>\`}
                                            \${leftTeam.logo ? \`<div class="team-logo-fallback" style="display: none;">\${leftTeam.name.charAt(0)}</div>\` : ''}
                                            <div class="team-name">\${leftTeam.abbreviation || leftTeam.name}</div>
                                        </div>
                                        <div class="game-center">
                                            <div class="game-score">\${scoreDisplay}</div>
                                            <div class="game-time">\${isLive ? '<span class="live-indicator">Live</span> ' : ''}\${game.status === 'STATUS_SCHEDULED' ? formatGameTime(game.date, game.time) : (game.status === 'STATUS_FINAL' || game.status === 'STATUS_FULL_TIME') ? '' : isLive ? (trackedGame.sport === 'mlb' ? formatBaseballInning(game.quarter, game.minute) : (game.quarter || game.minute || 'TBD')) : ''}</div>
                                            <div class="game-status-center">\${game.status === 'STATUS_SCHEDULED' ? '' : game.status === 'STATUS_FINAL' ? 'Final' : game.status === 'STATUS_FULL_TIME' ? 'Full Time' : game.status === 'STATUS_SECOND_HALF' ? '2nd Half' : game.status === 'STATUS_FIRST_HALF' ? '1st Half' : isLive ? 'Live' : game.status} \${isLive ? (trackedGame.sport === 'mlb' ? (game.quarter || game.minute ? \` - \${formatBaseballInning(game.quarter, game.minute)}\` : '') : (game.quarter ? \` - \${game.quarter}\` : game.minute ? \` - \${game.minute}\` : '')) : ''}</div>
                                        </div>
                                        <div class="team">
                                            \${rightTeam.logo ? \`<img src="\${rightTeam.logo}" alt="\${rightTeam.name}" class="team-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">\` : \`<div class="team-logo-fallback">\${rightTeam.name.charAt(0)}</div>\`}
                                            \${rightTeam.logo ? \`<div class="team-logo-fallback" style="display: none;">\${rightTeam.name.charAt(0)}</div>\` : ''}
                                            <div class="team-name">\${rightTeam.abbreviation || rightTeam.name}</div>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                        </div>
                    </div>
                \`;
                
                // Add HR between sections (but not after the last one)
                if (index < sportKeys.length - 1) {
                    html += '<hr class="section-divider">';
                }
            });
            
            content.innerHTML = html;
        }
        
        function getSportEmoji(sport) {
            switch (sport) {
                case 'nfl': return '🏈';
                case 'nba': return '🏀';
                case 'premierLeague': return '⚽';
                case 'nhl': return '🏒';
                case 'mlb': return '⚾';
                default: return '🏆';
            }
        }
        
        function getSportName(sport) {
            switch (sport) {
                case 'nfl': return 'NFL';
                case 'nba': return 'NBA';
                case 'premierLeague': return 'Premier League';
                case 'nhl': return 'NHL';
                case 'mlb': return 'MLB';
                default: return sport.toUpperCase();
            }
        }
        
        function getSportInfo(sport) {
            const logos = {
                'nfl': 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png',
                'nba': 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png',
                'premierLeague': 'https://logos-world.net/wp-content/uploads/2020/06/Premier-League-Logo.png',
                'nhl': 'https://a.espncdn.com/i/teamlogos/leagues/500/nhl.png',
                'mlb': 'https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png'
            };
            
            return {
                name: getSportName(sport),
                emoji: getSportEmoji(sport),
                logo: logos[sport] || ''
            };
        }
        
        
        function toggleSportSection(sportKey) {
            const content = document.getElementById(\`sport-content-\${sportKey}\`);
            const icon = document.getElementById(\`accordion-icon-\${sportKey}\`);
            const section = content?.closest('.sport-section');
            
            if (content && icon && section) {
                content.classList.toggle('collapsed');
                icon.classList.toggle('collapsed');
                section.classList.toggle('collapsed');
                
            }
        }
        
        
        // Listen for messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'updateTrackedGames':
                    renderTrackedGames(message.data);
                    break;
            }
        });
        
        // Initial load
        vscode.postMessage({ command: 'getTrackedGames' });
    </script>
</body>
</html>`;
    }
}
exports.TrackedGamesProvider = TrackedGamesProvider;
class NoGamesItem extends vscode.TreeItem {
    constructor() {
        super('No games being tracked', vscode.TreeItemCollapsibleState.None);
        this.description = 'Click "Tail" on any game to start';
        this.iconPath = new vscode.ThemeIcon('info');
    }
}
exports.NoGamesItem = NoGamesItem;
class TrackedGamesWebviewItem extends vscode.TreeItem {
    constructor(gameTracker) {
        const trackedGames = gameTracker.getTrackedGames();
        const count = trackedGames.length;
        const label = count === 0 ? '📌 Tracked Games' : `📌 ${count} game${count > 1 ? 's' : ''} being tracked`;
        const description = count === 0 ? 'No games tracked - Click to view' : 'Click to view in sidebar';
        super(label, vscode.TreeItemCollapsibleState.None);
        this.gameTracker = gameTracker;
        this.description = description;
        this.iconPath = new vscode.ThemeIcon('eye');
        this.contextValue = 'trackedGamesWebview';
        this.command = {
            command: 'sideline.showTrackedGamesWebview',
            title: 'Show Tracked Games Webview'
        };
    }
}
exports.TrackedGamesWebviewItem = TrackedGamesWebviewItem;
class TrackedGameItem extends vscode.TreeItem {
    constructor(trackedGame) {
        const game = trackedGame.game;
        const isLive = game.status && (game.status.includes('LIVE') || game.status.includes('IN_PROGRESS') || game.status.includes('SECOND_HALF') || game.status.includes('FIRST_HALF') || game.status === 'Live');
        const time = TrackedGameItem.formatTime(game);
        // Create a more detailed label with team names and score
        const awayTeam = game.away.name.length > 12 ? game.away.name.substring(0, 12) + '...' : game.away.name;
        const homeTeam = game.home.name.length > 12 ? game.home.name.substring(0, 12) + '...' : game.home.name;
        const label = `${awayTeam} @ ${homeTeam}`;
        // Create detailed description with score and status
        const scoreText = `${game.away.score} - ${game.home.score}`;
        const statusText = isLive ? '🔴 LIVE' : (game.status === 'STATUS_SCHEDULED' ? time : game.status);
        const quarterText = game.quarter ? ` • ${game.quarter}` : '';
        const description = `${scoreText} • ${statusText}${quarterText}`;
        super(label, vscode.TreeItemCollapsibleState.None);
        this.trackedGame = trackedGame;
        this.description = description;
        this.tooltip = this.createDetailedTooltip(game, trackedGame, !!isLive);
        // Set icon - use live indicator for live games, sport icon for others
        if (isLive) {
            this.iconPath = new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor('errorForeground'));
        }
        else {
            this.iconPath = this.getSportIcon(trackedGame.sport);
        }
        // Set context value for menu
        this.contextValue = 'trackedGame';
        // Add command to stop tracking
        this.command = {
            command: 'sideline.stopTracking',
            title: 'Stop Tracking',
            arguments: [trackedGame.id]
        };
    }
    createDetailedTooltip(game, trackedGame, isLive) {
        const awayTeam = game.away.name;
        const homeTeam = game.home.name;
        const score = `${game.away.score} - ${game.home.score}`;
        const status = game.status;
        const lastUpdate = trackedGame.lastUpdate.toLocaleTimeString();
        const sport = trackedGame.sport.toUpperCase();
        let tooltip = `🏈 ${sport} Game\\n`;
        tooltip += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`;
        tooltip += `📊 ${awayTeam} @ ${homeTeam}\\n`;
        tooltip += `🏆 Score: ${score}\\n`;
        tooltip += `📡 Status: ${status}\\n`;
        if (isLive) {
            tooltip += `🔴 LIVE GAME\\n`;
            if (game.quarter) {
                tooltip += `⏱️  ${game.quarter}\\n`;
            }
        }
        else if (game.status === 'STATUS_SCHEDULED') {
            const gameTime = TrackedGameItem.formatTime(game);
            tooltip += `⏰ Scheduled: ${gameTime}\\n`;
        }
        tooltip += `🕐 Last Update: ${lastUpdate}\\n`;
        tooltip += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`;
        tooltip += `❌ Click to stop tracking`;
        return tooltip;
    }
    static formatTime(game) {
        if (game.time) {
            // If game.time is already a formatted time string, return it as is
            // If it's a date string, format it properly
            if (game.time.includes(':')) {
                // Already formatted time string
                return game.time;
            }
            else {
                // Date string that needs formatting
                const date = new Date(game.time);
                if (isNaN(date.getTime())) {
                    return 'TBD';
                }
                return date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
            }
        }
        else if (game.quarter || game.minute) {
            // Show quarter/period for live games
            return game.quarter || game.minute || '';
        }
        else {
            return 'TBD';
        }
    }
    getSportIcon(sport) {
        switch (sport) {
            case 'nfl':
                return new vscode.ThemeIcon('sports-soccer'); // VS Code doesn't have football icon
            case 'nba':
                return new vscode.ThemeIcon('basketball');
            case 'premierLeague':
                return new vscode.ThemeIcon('sports-soccer');
            case 'nhl':
                return new vscode.ThemeIcon('sports-hockey');
            case 'mlb':
                return new vscode.ThemeIcon('baseball');
            default:
                return new vscode.ThemeIcon('eye');
        }
    }
}
exports.TrackedGameItem = TrackedGameItem;
//# sourceMappingURL=trackedGamesProvider.js.map