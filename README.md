# Sideline - VS Code Sports Extension

<div align="center">
  <img src="src/SIDELINE.png" alt="Sideline Logo" width="800" height="400">
</div>

<div align="center">
  <h1>🏈 The Ultimate Sports Companion for Developers 🏈</h1>
  <p><strong>Never miss a game while you code. Never miss a deadline while you watch.</strong></p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/VS%20Code-Extension-blue?style=for-the-badge&logo=visual-studio-code" alt="VS Code Extension">
  <img src="https://img.shields.io/badge/Sports-Live%20Scores-green?style=for-the-badge&logo=sports" alt="Live Sports">
  <img src="https://img.shields.io/badge/Real%20Time-Notifications-orange?style=for-the-badge&logo=bell" alt="Real Time">
</div>

---

## 🎯 What is Sideline?

Sideline transforms VS Code into your personal sports command center. Whether you're debugging code or debugging your fantasy team, Sideline keeps you connected to the games that matter most.

**The Problem:** You're in the zone coding, but you don't want to miss that crucial touchdown, buzzer-beater, or game-winning goal.

**The Solution:** Sideline brings live sports directly into your development environment with real-time updates, smart notifications, and a beautiful interface that feels native to VS Code.

---

## ✨ Features That Will Blow Your Mind

### 🎮 **Live Game Tracking**
- **Tail any game** with a single click
- **Real-time score updates** delivered to your editor
- **Smart notifications** only when scores change
- **Persistent tracking** across VS Code sessions

### 🔍 **Intelligent Discovery**
- **Smart filtering** by Live, Completed, Upcoming, or Tailed games
- **Lightning-fast search** by team names or abbreviations
- **Collapsible sport sections** for organized browsing
- **Game count indicators** for each sport

### 🎨 **Beautiful, Native UI**
- **VS Code-themed interface** that feels like home
- **Team colors and logos** for instant recognition
- **Smooth animations** and transitions
- **Responsive design** that works in any panel size

### 📱 **Multiple Views**
- **Main Discovery Panel** - Browse all games and discover new ones
- **Sidebar Widgets** - Quick access to your tailed games
- **Dual-location support** - Available in main sidebar and explorer sections

### ⚡ **Performance & Reliability**
- **Configurable refresh intervals** (10-300 seconds)
- **Auto-refresh** with smart update detection
- **Error handling** and graceful fallbacks
- **Lightweight** - won't slow down your coding

---

## 🏆 Supported Sports Leagues

<div align="center">

| Sport | League | Status | Coverage |
|-------|--------|--------|----------|
| 🏈 **NFL** | National Football League | ✅ Live | Full season |
| 🏀 **NBA** | National Basketball Association | ✅ Live | Full season |
| ⚽ **Premier League** | English Premier League | ✅ Live | Full season |
| 🏒 **NHL** | National Hockey League | ✅ Live | Full season |
| ⚾ **MLB** | Major League Baseball | ✅ Live | Full season |

</div>

---

## 🚀 Quick Start Guide

### 1. **Install Sideline**
```bash
# Via VS Code Extensions
Ctrl+Shift+X → Search "Sideline" → Install

# Or install from VSIX
code --install-extension sideline-0.0.1.vsix
```

### 2. **Open Your Sports Dashboard**
- Click the **soccer ball icon** in the Activity Bar
- Or use **Command Palette** (`Ctrl+Shift+P`) → "View Games"

### 3. **Start Tailing Games**
1. **Browse** all current games across all sports
2. **Search** for your favorite teams
3. **Click "Tail Game"** on games you want to follow
4. **Get notified** when scores change
5. **View your games** in the sidebar widgets

### 4. **Customize Your Experience**
- **Configure refresh intervals** in VS Code settings
- **Filter games** by status (Live, Completed, Upcoming, Tailed)
- **Collapse sport sections** to focus on what matters
- **Search teams** by name or abbreviation

---

## 🎮 How It Works

### **Discovery Flow**
```
Open Sideline → Browse Games → Search/Filter → Tail Games → Get Notifications
```

### **Tracking Flow**
```
Tail Game → Appears in Sidebar → Auto-refresh → Score Change → Notification
```

### **Smart Features**
- **Duplicate detection** - Can't tail the same game twice
- **State persistence** - Tailed games survive VS Code restarts
- **Smart updates** - Only refreshes when data actually changes
- **Error recovery** - Gracefully handles API failures

---

## ⚙️ Configuration

### **Refresh Intervals**
```json
{
  "sideline.refreshInterval": 30  // 10-300 seconds
}
```

### **Available Settings**
- **Refresh Interval**: How often to check for updates
- **Auto-refresh**: Enable/disable automatic updates
- **Notifications**: Control score change notifications

---

## 🛠️ Development

### **Prerequisites**
- **Node.js** v16+
- **VS Code** latest version
- **TypeScript** knowledge (optional)

### **Build from Source**
```bash
# Clone the repository
git clone https://github.com/yourusername/sideline.git
cd sideline

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in development mode
F5 in VS Code
```

### **Project Architecture**
```
sideline/
├── 🎯 src/
│   ├── extension.ts              # Main entry point
│   ├── sidelineProvider.ts       # Main webview provider
│   ├── trackedGamesProvider.ts   # Sidebar widget provider
│   ├── liveGameTracker.ts        # Game tracking & notifications
│   ├── sportsApi.ts              # ESPN API integration
│   ├── webview.html              # Main UI (1177 lines of awesome!)
│   └── teamColors.ts             # Team branding data
├── 📦 package.json               # Extension manifest
├── ⚙️ tsconfig.json             # TypeScript config
└── 📖 README.md                 # This masterpiece
```

### **API Integration**
- **ESPN Public APIs** - No keys required
- **Real-time data** - Live scores and game status
- **Multiple endpoints** - One for each sport
- **Error handling** - Graceful fallbacks

---

## 🎯 Use Cases

### **For Developers**
- **Stay connected** to games while coding
- **Quick score checks** without leaving your editor
- **Fantasy sports** management during work hours
- **Team notifications** for important games

### **For Sports Fans**
- **Multi-sport tracking** in one place
- **Real-time updates** without browser switching
- **Clean interface** focused on what matters
- **Persistent tracking** across sessions

### **For Teams**
- **Game day monitoring** during development
- **Score tracking** for team events
- **Sports-themed** development environment
- **Fun productivity** tool

---

## 🔮 Roadmap

### **Version 1.1** (Coming Soon)
- [ ] **Team Favorites** - Save your favorite teams
- [ ] **Custom Notifications** - Sound alerts for score changes
- [ ] **Game Predictions** - Odds and predictions
- [ ] **Player Stats** - Individual player performance

### **Version 1.2** (Future)
- [ ] **Standings Tables** - League standings and rankings
- [ ] **More Sports** - NCAA, MLS, and international leagues
- [ ] **Custom Themes** - Dark/light mode customization
- [ ] **Export Data** - Export game data and stats

### **Version 2.0** (Dream Features)
- [ ] **Fantasy Integration** - Connect with fantasy platforms
- [ ] **Social Features** - Share games with team members
- [ ] **Advanced Analytics** - Game predictions and trends
- [ ] **Mobile Companion** - Sync with mobile app

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### **Ways to Contribute**
- 🐛 **Report bugs** - Help us squash those pesky issues
- 💡 **Suggest features** - Tell us what you want to see
- 🔧 **Submit PRs** - Code contributions are always welcome
- 📖 **Improve docs** - Help others understand the project
- ⭐ **Star the repo** - Show your support

### **Development Setup**
```bash
# Fork and clone
git clone https://github.com/yourusername/sideline.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm run compile
F5 in VS Code

# Submit PR
git push origin feature/amazing-feature
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **ESPN** for providing the sports data APIs
- **VS Code team** for the amazing extension platform
- **Open source community** for inspiration and tools
- **Sports fans everywhere** for the motivation to build this

---

<div align="center">
  <h2>🏆 Ready to Never Miss a Game Again? 🏆</h2>
  <p><strong>Install Sideline today and transform your VS Code into the ultimate sports command center!</strong></p>
  
  <img src="https://img.shields.io/badge/Download-Now-brightgreen?style=for-the-badge&logo=download" alt="Download Now">
  
  <br><br>
  
  <p><em>Happy coding and may your teams always win! 🚀</em></p>
</div>
