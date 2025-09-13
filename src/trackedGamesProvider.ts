import * as vscode from 'vscode';
import * as path from 'path';
import { LiveGameTracker, TrackedGame } from './liveGameTracker';

export class TrackedGamesProvider implements vscode.WebviewViewProvider {
    private gameTracker: LiveGameTracker;
    private extensionUri: vscode.Uri;
    private _view?: vscode.WebviewView;

    constructor(gameTracker: LiveGameTracker, extensionUri: vscode.Uri) {
        this.gameTracker = gameTracker;
        this.extensionUri = extensionUri;
        
        // Listen for game updates
        this.gameTracker.setOnGameUpdate(() => {
            this.refresh();
        });
    }

    refresh(): void {
        if (this._view) {
            this.updateWebview();
        }
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        webviewView.webview.html = this.getTrackedGamesWebviewContent();

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            message => {
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
            },
            undefined,
            []
        );

        // Initial load
        this.updateWebview();
        
        // Set up automatic refresh every 30 seconds
        this.startAutoRefresh();
    }

    private updateWebview(): void {
        if (this._view) {
            const trackedGames = this.gameTracker.getTrackedGames();
            this._view.webview.postMessage({
                command: 'updateTrackedGames',
                data: trackedGames
            });
        }
    }

    private startAutoRefresh(): void {
        // Get refresh interval from configuration
        const config = vscode.workspace.getConfiguration('sideline');
        const refreshInterval = config.get<number>('refreshInterval', 30);
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

    private getTrackedGamesWebviewContent(): string {
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
            margin-bottom: 25px;
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
            left: 4px;
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
            text-align: center;
            color: #a0a0a0;
            padding: 20px;
            font-size: 14px;
            font-style: italic;
        }
        
        .open-main-btn {
            position: fixed;
            top: 8px;
            right: 8px;
            background: rgba(255, 165, 0, 0.2);
            color: #ffa500;
            border: 1px solid #ffa500;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            font-size: 12px;
            transition: all 0.2s ease;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            z-index: 10;
        }
        
        .open-main-btn:hover {
            background: #ffa500;
            color: white;
            transform: scale(1.1);
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
    
    <button class="open-main-btn" onclick="openMainComponent()" title="View All Games">+</button>
    
    <div id="content">
        <div class="no-games">Loading tracked games...</div>
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
        
        function renderTrackedGames(trackedGames) {
            const content = document.getElementById('content');
            
            if (!trackedGames || trackedGames.length === 0) {
                content.innerHTML = '<div class="no-games">No games being tracked<br><br>Click "View All Games" above to browse and start tracking!</div>';
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
            Object.keys(gamesBySport).forEach(sport => {
                const games = gamesBySport[sport];
                
                html += \`
                    <div class="sport-section">
                        \${games.map(trackedGame => {
                            const game = trackedGame.game;
                            const isLive = game.status && (game.status.includes('LIVE') || game.status.includes('IN_PROGRESS') || game.status.includes('SECOND_HALF') || game.status.includes('FIRST_HALF') || game.status === 'Live');
                            const awayColor = game.away.colors?.primary || '#4a5568';
                            const homeColor = game.home.colors?.primary || '#4a5568';
                            const gradientStyle = \`background: linear-gradient(90deg, \${awayColor}40 0%, rgba(255,255,255,0.05) 50%, \${homeColor}40 100%);\`;
                            
                            return \`
                                <div class="game \${isLive ? 'live' : game.status === 'Final' || game.status === 'STATUS_FINAL' ? 'final' : ''}" style="\${gradientStyle}">
                                    <button class="stop-btn" onclick="stopTracking('\${trackedGame.id}')" title="Stop Tracking">×</button>
                                    <div class="teams">
                                        <div class="team">
                                            \${game.away.logo ? \`<img src="\${game.away.logo}" alt="\${game.away.name}" class="team-logo" onerror="this.style.display='none'">\` : \`<div class="team-logo-fallback">\${game.away.name.charAt(0)}</div>\`}
                                            <div class="team-name">\${game.away.name}</div>
                                        </div>
                                        <div class="game-center">
                                            <div class="game-score">\${game.away.score} - \${game.home.score}</div>
                                            <div class="game-time">\${isLive ? '<span class="live-indicator">Live</span> ' : ''}\${game.status === 'STATUS_SCHEDULED' ? formatGameTime(game.date, game.time) : (game.quarter || game.minute || 'TBD')}</div>
                                            <div class="game-status-center">\${game.status === 'STATUS_SCHEDULED' ? 'Scheduled' : game.status === 'STATUS_FINAL' ? 'Final' : isLive ? 'Live' : game.status} \${game.quarter ? \` - \${game.quarter}\` : game.minute ? \` - \${game.minute}\` : ''}</div>
                                        </div>
                                        <div class="team">
                                            \${game.home.logo ? \`<img src="\${game.home.logo}" alt="\${game.home.name}" class="team-logo" onerror="this.style.display='none'">\` : \`<div class="team-logo-fallback">\${game.home.name.charAt(0)}</div>\`}
                                            <div class="team-name">\${game.home.name}</div>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
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

export class NoGamesItem extends vscode.TreeItem {
    constructor() {
        super('No games being tracked', vscode.TreeItemCollapsibleState.None);
        this.description = 'Click "Tail" on any game to start';
        this.iconPath = new vscode.ThemeIcon('info');
    }
}

export class TrackedGamesWebviewItem extends vscode.TreeItem {
    constructor(private gameTracker: LiveGameTracker) {
        const trackedGames = gameTracker.getTrackedGames();
        const count = trackedGames.length;
        
        const label = count === 0 ? '📌 Tracked Games' : `📌 ${count} game${count > 1 ? 's' : ''} being tracked`;
        const description = count === 0 ? 'No games tracked - Click to view' : 'Click to view in sidebar';
        
        super(label, vscode.TreeItemCollapsibleState.None);
        this.description = description;
        this.iconPath = new vscode.ThemeIcon('eye');
        this.contextValue = 'trackedGamesWebview';
        
        this.command = {
            command: 'sideline.showTrackedGamesWebview',
            title: 'Show Tracked Games Webview'
        };
    }
}



export class TrackedGameItem extends vscode.TreeItem {
    constructor(public trackedGame: TrackedGame) {
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
        
        this.description = description;
        this.tooltip = this.createDetailedTooltip(game, trackedGame, !!isLive);
        
        // Set icon - use live indicator for live games, sport icon for others
        if (isLive) {
            this.iconPath = new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor('errorForeground'));
        } else {
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
    
    private createDetailedTooltip(game: any, trackedGame: TrackedGame, isLive: boolean): string {
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
        } else if (game.status === 'STATUS_SCHEDULED') {
            const gameTime = TrackedGameItem.formatTime(game);
            tooltip += `⏰ Scheduled: ${gameTime}\\n`;
        }
        
        tooltip += `🕐 Last Update: ${lastUpdate}\\n`;
        tooltip += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`;
        tooltip += `❌ Click to stop tracking`;
        
        return tooltip;
    }

    private static formatTime(game: any): string {
        if (game.time) {
            // Format time like "8:30 PM"
            const date = new Date(game.time);
            return date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        } else if (game.quarter || game.minute) {
            // Show quarter/period for live games
            return game.quarter || game.minute || '';
        } else {
            return 'TBD';
        }
    }


    private getSportIcon(sport: string): vscode.ThemeIcon {
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

