"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidelineProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const sportsApi_1 = require("./sportsApi");
class SidelineProvider {
    constructor(extensionUri, gameTracker) {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.extensionUri = extensionUri;
        this.sportsApi = new sportsApi_1.SportsApiService();
        this.gameTracker = gameTracker;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return Promise.resolve([
                new vscode.TreeItem('🏈 NFL', vscode.TreeItemCollapsibleState.None),
                new vscode.TreeItem('🏀 NBA', vscode.TreeItemCollapsibleState.None),
                new vscode.TreeItem('⚽ Premier League', vscode.TreeItemCollapsibleState.None),
                new vscode.TreeItem('🏒 NHL', vscode.TreeItemCollapsibleState.None),
                new vscode.TreeItem('⚾ MLB', vscode.TreeItemCollapsibleState.None)
            ]);
        }
        return Promise.resolve([]);
    }
    openPanel() {
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.One);
        }
        else {
            this.panel = vscode.window.createWebviewPanel('sideline', 'Sideline - Sports Stats', vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [this.extensionUri],
                enableCommandUris: true
            });
            this.panel.webview.html = this.getWebviewContent();
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
            // Handle messages from the webview
            this.panel.webview.onDidReceiveMessage(message => {
                switch (message.command) {
                    case 'refresh':
                        this.refreshData();
                        return;
                    case 'selectTeam':
                        this.selectTeam(message.team);
                        return;
                    case 'openGame':
                        this.openGameInBrowser(message.gameUrl);
                        return;
                    case 'tailGame':
                        this.tailGame(message.gameData);
                        return;
                }
            }, undefined, []);
        }
    }
    async refreshData() {
        if (this.panel) {
            // Fetch fresh data and update the webview
            const data = await this.fetchSportsData();
            // Add tailing information to each game
            const trackedGames = this.gameTracker.getTrackedGames();
            const trackedGameIds = new Set(trackedGames.map(tg => tg.id));
            // Add isTailing property to each game
            if (data.nfl?.games) {
                data.nfl.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    game.isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.nba?.games) {
                data.nba.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    game.isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.premierLeague?.games) {
                data.premierLeague.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    game.isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.nhl?.games) {
                data.nhl.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    game.isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.mlb?.games) {
                data.mlb.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    game.isTailing = trackedGameIds.has(gameId);
                });
            }
            console.log('Fetched data:', JSON.stringify(data, null, 2)); // Debug log
            this.panel.webview.postMessage({
                command: 'updateData',
                data: data
            });
        }
    }
    async selectTeam(team) {
        vscode.window.showInformationMessage(`Selected team: ${team}`);
        // Here you would typically save the user's team preference
    }
    async openGameInBrowser(gameUrl) {
        vscode.env.openExternal(vscode.Uri.parse(gameUrl));
    }
    async tailGame(gameData) {
        vscode.commands.executeCommand('sideline.tailGame', gameData);
    }
    async fetchSportsData() {
        return await this.sportsApi.fetchSportsData();
    }
    getWebviewContent() {
        // Read the inline HTML file
        const htmlPath = path.join(this.extensionUri.fsPath, 'src', 'webview.html');
        const fs = require('fs');
        let html = fs.readFileSync(htmlPath, 'utf8');
        // Replace the image source with the proper webview URI
        const logoUri = this.panel?.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'src', 'SIDELINE.png'));
        html = html.replace('src="SIDELINE.png"', `src="${logoUri}"`);
        return html;
    }
}
exports.SidelineProvider = SidelineProvider;
//# sourceMappingURL=sidelineProvider.js.map