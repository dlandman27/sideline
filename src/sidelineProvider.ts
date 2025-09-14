import * as vscode from 'vscode';
import * as path from 'path';
import { SportsApiService, SportsData } from './sportsApi';
import { LiveGameTracker } from './liveGameTracker';

export class SidelineProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    
    private panel: vscode.WebviewPanel | undefined;
    private extensionUri: vscode.Uri;
    private sportsApi: SportsApiService;
    private gameTracker: LiveGameTracker;

    constructor(extensionUri: vscode.Uri, gameTracker: LiveGameTracker) {
        this.extensionUri = extensionUri;
        this.sportsApi = new SportsApiService();
        this.gameTracker = gameTracker;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
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

    openPanel(): void {
        console.log('Opening Sideline panel...');
        console.log('Extension URI:', this.extensionUri.fsPath);
        
        if (this.panel) {
            console.log('Panel already exists, revealing...');
            this.panel.reveal(vscode.ViewColumn.One);
        } else {
            console.log('Creating new webview panel...');
            this.panel = vscode.window.createWebviewPanel(
                'sideline',
                'Sideline - Sports Stats',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    localResourceRoots: [this.extensionUri],
                    enableCommandUris: true
                }
            );

            console.log('Setting webview HTML content...');
            this.panel.webview.html = this.getWebviewContent();

            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });

            // Handle messages from the webview
            this.panel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'refresh':
                            this.refreshData();
                            return;
                        case 'selectTeam':
                            this.selectTeam(message.team);
                            return;
                        case 'openGame':
                            this.openGameInBrowser(message.url);
                            return;
                        case 'tailGame':
                            this.tailGame(message.gameData);
                            return;
                    }
                },
                undefined,
                []
            );
        }
    }

    private async refreshData(): Promise<void> {
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
                    (game as any).isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.nba?.games) {
                data.nba.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    (game as any).isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.premierLeague?.games) {
                data.premierLeague.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    (game as any).isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.nhl?.games) {
                data.nhl.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    (game as any).isTailing = trackedGameIds.has(gameId);
                });
            }
            if (data.mlb?.games) {
                data.mlb.games.forEach(game => {
                    const gameId = `${game.away.name}-${game.home.name}-${game.date}`;
                    (game as any).isTailing = trackedGameIds.has(gameId);
                });
            }
            
            // console.log('Fetched data:', JSON.stringify(data, null, 2)); // Debug log - commented out
            this.panel.webview.postMessage({
                command: 'updateData',
                data: data
            });
        }
    }

    private async selectTeam(team: string): Promise<void> {
        vscode.window.showInformationMessage(`Selected team: ${team}`);
        // Here you would typically save the user's team preference
    }

    private async openGameInBrowser(gameUrl: string): Promise<void> {
        vscode.env.openExternal(vscode.Uri.parse(gameUrl));
    }

    private async tailGame(gameData: any): Promise<void> {
        vscode.commands.executeCommand('sideline.tailGame', gameData);
        // Refresh data to update the frontend with the new tracking state
        await this.refreshData();
    }

    private async fetchSportsData(): Promise<SportsData> {
        return await this.sportsApi.fetchSportsData();
    }

    private getWebviewContent(): string {
        try {
            // Read the inline HTML file
            const htmlPath = path.join(this.extensionUri.fsPath, 'src', 'webview.html');
            const fs = require('fs');
            
            // Check if file exists first
            if (!fs.existsSync(htmlPath)) {
                console.error('Webview HTML file not found at:', htmlPath);
                return this.getFallbackHtml();
            }
            
            let html = fs.readFileSync(htmlPath, 'utf8');
            
            // Replace the image source with the proper webview URI
            const logoUri = this.panel?.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'src', 'SIDELINE.png'));
            html = html.replace('src="SIDELINE.png"', `src="${logoUri}"`);
            
            return html;
        } catch (error) {
            console.error('Error loading webview content:', error);
            return this.getFallbackHtml();
        }
    }
    
    private getFallbackHtml(): string {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Sideline</title>
        </head>
        <body>
            <h1>Sideline - Sports Stats</h1>
            <p>Loading sports data...</p>
            <p>If this page doesn't load properly, please check the console for errors.</p>
            <script>
                console.log('Fallback webview loaded');
                const vscode = acquireVsCodeApi();
                vscode.postMessage({ command: 'refresh' });
            </script>
        </body>
        </html>`;
    }
}