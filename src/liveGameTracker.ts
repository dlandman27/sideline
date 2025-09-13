import * as vscode from 'vscode';
import { SportsApiService, Game } from './sportsApi';
import { TeamColorService, TeamColors } from './teamColors';

export interface TrackedGame {
    id: string;
    game: Game;
    sport: 'nfl' | 'nba' | 'mlb' | 'nhl' | 'premierLeague';
    lastUpdate: Date;
    refreshInterval: number; // in seconds
}

export class LiveGameTracker {
    private trackedGames: Map<string, TrackedGame> = new Map();
    private refreshTimers: Map<string, NodeJS.Timeout> = new Map();
    private sportsApi: SportsApiService;
    private statusBarItem: vscode.StatusBarItem;
    private onGameUpdateCallback?: (game: TrackedGame) => void;

    constructor() {
        this.sportsApi = new SportsApiService();
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBarItem.command = 'sideline.showTrackedGames';
        this.updateStatusBar();
    }

    // Start tracking a game
    startTracking(gameId: string, game: Game, sport: 'nfl' | 'nba' | 'mlb' | 'nhl' | 'premierLeague'): void {
        const trackedGame: TrackedGame = {
            id: gameId,
            game,
            sport,
            lastUpdate: new Date(),
            refreshInterval: 30 // 30 seconds default
        };

        this.trackedGames.set(gameId, trackedGame);
        this.startRefreshTimer(gameId);
        this.updateStatusBar();
        
        vscode.window.showInformationMessage(`Now tracking ${game.away.name} @ ${game.home.name}`);
    }

    // Stop tracking a game
    stopTracking(gameId: string): void {
        this.trackedGames.delete(gameId);
        this.stopRefreshTimer(gameId);
        this.updateStatusBar();
        
        vscode.window.showInformationMessage(`Stopped tracking game ${gameId}`);
    }

    // Get all tracked games
    getTrackedGames(): TrackedGame[] {
        return Array.from(this.trackedGames.values());
    }

    // Set callback for game updates
    setOnGameUpdate(callback: (game: TrackedGame) => void): void {
        this.onGameUpdateCallback = callback;
    }

    // Start refresh timer for a specific game
    private startRefreshTimer(gameId: string): void {
        const trackedGame = this.trackedGames.get(gameId);
        if (!trackedGame) return;

        const timer = setInterval(async () => {
            try {
                await this.refreshGame(gameId);
            } catch (error) {
                console.error(`Error refreshing game ${gameId}:`, error);
            }
        }, trackedGame.refreshInterval * 1000);

        this.refreshTimers.set(gameId, timer);
    }

    // Stop refresh timer for a specific game
    private stopRefreshTimer(gameId: string): void {
        const timer = this.refreshTimers.get(gameId);
        if (timer) {
            clearInterval(timer);
            this.refreshTimers.delete(gameId);
        }
    }

    // Refresh a specific game
    private async refreshGame(gameId: string): Promise<void> {
        const trackedGame = this.trackedGames.get(gameId);
        if (!trackedGame) return;

        try {
            const data = await this.sportsApi.fetchSportsData();
            let updatedGame: Game | undefined;

            // Find the updated game data
            switch (trackedGame.sport) {
                case 'nfl':
                    updatedGame = data.nfl.games.find(g => this.getGameId(g) === gameId);
                    break;
                case 'nba':
                    updatedGame = data.nba.games.find(g => this.getGameId(g) === gameId);
                    break;
                case 'mlb':
                    updatedGame = data.mlb.games.find(g => this.getGameId(g) === gameId);
                    break;
                case 'nhl':
                    updatedGame = data.nhl.games.find(g => this.getGameId(g) === gameId);
                    break;
                case 'premierLeague':
                    updatedGame = data.premierLeague.games.find(g => this.getGameId(g) === gameId);
                    break;
            }

            if (updatedGame) {
                // Check if the game has been updated
                const hasChanged = this.hasGameChanged(trackedGame.game, updatedGame);
                
                trackedGame.game = updatedGame;
                trackedGame.lastUpdate = new Date();

                if (hasChanged && this.onGameUpdateCallback) {
                    this.onGameUpdateCallback(trackedGame);
                }
            }
        } catch (error) {
            console.error(`Error refreshing game ${gameId}:`, error);
        }
    }

    // Generate a unique ID for a game
    private getGameId(game: Game): string {
        return `${game.away.name}-${game.home.name}-${game.date}`;
    }

    // Check if a game has changed
    private hasGameChanged(oldGame: Game, newGame: Game): boolean {
        return (
            oldGame.away.score !== newGame.away.score ||
            oldGame.home.score !== newGame.home.score ||
            oldGame.status !== newGame.status ||
            oldGame.quarter !== newGame.quarter ||
            oldGame.minute !== newGame.minute
        );
    }

    // Update the status bar
    private updateStatusBar(): void {
        const count = this.trackedGames.size;
        if (count > 0) {
            this.statusBarItem.text = `$(eye) ${count} game${count > 1 ? 's' : ''} tracked`;
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }

    // Get status bar item for VS Code integration
    getStatusBarItem(): vscode.StatusBarItem {
        return this.statusBarItem;
    }

    // Refresh all tracked games
    async refreshAllGames(): Promise<void> {
        const gameIds = Array.from(this.trackedGames.keys());
        for (const gameId of gameIds) {
            await this.refreshGame(gameId);
        }
    }

    // Cleanup all timers
    dispose(): void {
        this.refreshTimers.forEach(timer => clearInterval(timer));
        this.refreshTimers.clear();
        this.trackedGames.clear();
        this.statusBarItem.dispose();
    }
}
