"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const sidelineProvider_1 = require("./sidelineProvider");
const liveGameTracker_1 = require("./liveGameTracker");
const trackedGamesProvider_1 = require("./trackedGamesProvider");
function activate(context) {
    console.log('Sideline extension is now active!');
    // Create the live game tracker
    const gameTracker = new liveGameTracker_1.LiveGameTracker();
    // Create the provider
    const provider = new sidelineProvider_1.SidelineProvider(context.extensionUri, gameTracker);
    // Create the tracked games provider
    const trackedGamesProvider = new trackedGamesProvider_1.TrackedGamesProvider(gameTracker, context.extensionUri);
    // Register the tree data provider
    vscode.window.registerTreeDataProvider('sideline', provider);
    // Register the webview view providers (both locations)
    vscode.window.registerWebviewViewProvider('sidelineTracked', trackedGamesProvider);
    vscode.window.registerWebviewViewProvider('sidelineTrackedSecondary', trackedGamesProvider);
    // Register the command to open the panel
    const openPanelCommand = vscode.commands.registerCommand('sideline.openPanel', () => {
        provider.openPanel();
    });
    // Register the refresh command
    const refreshCommand = vscode.commands.registerCommand('sideline.refresh', () => {
        provider.refresh();
        trackedGamesProvider.refresh();
    });
    // Register the tail game command
    const tailGameCommand = vscode.commands.registerCommand('sideline.tailGame', (gameData) => {
        if (gameData) {
            const gameId = `${gameData.away.name}-${gameData.home.name}-${gameData.date}`;
            gameTracker.startTracking(gameId, gameData, gameData.sport);
            trackedGamesProvider.refresh();
        }
    });
    // Register the stop tracking command
    const stopTrackingCommand = vscode.commands.registerCommand('sideline.stopTracking', (gameId) => {
        if (gameId) {
            gameTracker.stopTracking(gameId);
            trackedGamesProvider.refresh();
        }
    });
    // Register the open tracked games panel command
    const openTrackedGamesPanelCommand = vscode.commands.registerCommand('sideline.openTrackedGamesPanel', () => {
        // This command is no longer needed since we show games directly in the sidebar
        vscode.window.showInformationMessage('Tracked games are shown in the sidebar below');
    });
    // Add status bar item
    context.subscriptions.push(gameTracker.getStatusBarItem());
    // Set up game update callback
    gameTracker.setOnGameUpdate((trackedGame) => {
        // Update the sidebar view when games change
        provider.refresh();
        trackedGamesProvider.refresh();
        // Show notification for score changes
        const game = trackedGame.game;
        vscode.window.showInformationMessage(`Score Update: ${game.away.name} ${game.away.score} - ${game.home.score} ${game.home.name}`);
    });
    context.subscriptions.push(openPanelCommand, refreshCommand, tailGameCommand, stopTrackingCommand, openTrackedGamesPanelCommand);
}
exports.activate = activate;
function deactivate() {
    console.log('Sideline extension is now deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map