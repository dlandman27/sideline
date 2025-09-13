# Sideline - VS Code Sports Extension

🏈 Keep track of your favorite sports teams without leaving VS Code!

Sideline is a VS Code extension that displays live sports scores and stats directly in your editor. Never miss a game update while you're coding!

## Features

- **Live Sports Scores**: Get real-time scores for NFL, NBA, Premier League, NHL, and MLB
- **Beautiful UI**: Clean, VS Code-themed interface that matches your editor
- **Live Game Indicators**: Pulsing "LIVE" badges for games in progress
- **Multiple Sports**: Support for major sports leagues
- **Auto-refresh**: Keep your scores up to date with the refresh button
- **Sidebar Integration**: Access Sideline from the VS Code sidebar

## How to Use

1. **Install the Extension**: 
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Sideline"
   - Click Install

2. **Open Sideline**:
   - Click the Sideline icon in the Activity Bar (soccer ball icon)
   - Or use the Command Palette (Ctrl+Shift+P) and search for "Open Sideline"

3. **View Sports Scores**:
   - The extension will display current games across all supported sports
   - Live games are highlighted with a red border and pulsing "LIVE" indicator
   - Final games are shown with reduced opacity

4. **Refresh Data**:
   - Click the "🔄 Refresh" button to get the latest scores
   - Data updates automatically when you open the panel

## Supported Sports

- 🏈 **NFL** - National Football League
- 🏀 **NBA** - National Basketball Association  
- ⚽ **Premier League** - English Premier League
- 🏒 **NHL** - National Hockey League
- ⚾ **MLB** - Major League Baseball

## Development

### Prerequisites

- Node.js (v16 or higher)
- VS Code
- TypeScript

### Building the Extension

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npm run compile
   ```

4. Press F5 in VS Code to run the extension in a new Extension Development Host window

### Project Structure

```
sideline/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── sidelineProvider.ts   # Webview provider and UI logic
│   └── sportsApi.ts          # Sports data API service
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## API Integration

Currently, the extension uses mock data for demonstration. To integrate with real sports APIs:

1. Get an API key from a sports data provider (e.g., SportsData.io, ESPN API)
2. Update the `API_KEY` in `src/sportsApi.ts`
3. Uncomment the real API methods in the `SportsApiService` class
4. Update the `fetchSportsData()` method to call real APIs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Future Features

- [ ] Team favorites and notifications
- [ ] Standings and league tables
- [ ] Player stats and news
- [ ] Customizable refresh intervals
- [ ] More sports leagues
- [ ] Dark/light theme support
- [ ] Sound notifications for score updates

---

**Happy coding and may your teams always win! 🏆**

