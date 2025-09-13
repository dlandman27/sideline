// Rendering functions for components
function renderData(data) {
    const content = document.getElementById('content');
    const debugDiv = document.getElementById('debug');
    const debugContent = document.getElementById('debug-content');
    
    // Show debug info
    debugDiv.style.display = 'block';
    debugContent.innerHTML = JSON.stringify(data, null, 2);
    
    if (!data) {
        content.innerHTML = '<div class="loading">No data available</div>';
        return;
    }
    
    let html = '';
    
    // NFL Games
    if (data.nfl && data.nfl.games && data.nfl.games.length > 0) {
        html += renderSportSection('nfl', 'NFL', '🏈', 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png', data.nfl.games);
    }
    
    // NBA Games
    if (data.nba && data.nba.games && data.nba.games.length > 0) {
        html += renderSportSection('nba', 'NBA', '🏀', 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png', data.nba.games);
    }
    
    // Premier League Games
    if (data.premierLeague && data.premierLeague.games && data.premierLeague.games.length > 0) {
        html += renderSportSection('premierLeague', 'Premier League', '⚽', 'https://a.espncdn.com/i/teamlogos/leagues/500/eng.1.png', data.premierLeague.games);
    }
    
    // NHL Games
    if (data.nhl && data.nhl.games && data.nhl.games.length > 0) {
        html += renderSportSection('nhl', 'NHL', '🏒', 'https://a.espncdn.com/i/teamlogos/leagues/500/nhl.png', data.nhl.games);
    }
    
    // MLB Games
    if (data.mlb && data.mlb.games && data.mlb.games.length > 0) {
        html += renderSportSection('mlb', 'MLB', '⚾', 'https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png', data.mlb.games);
    }
    
    if (html === '') {
        html = '<div class="no-games">No games scheduled for today</div>';
    }
    
    content.innerHTML = html;
}

function renderSportSection(sportKey, sportName, sportEmoji, leagueLogo, games) {
    const gamesHtml = games.map(game => renderGame(game, sportKey)).join('');
    
    return `
        <div class="sport-section">
            <div class="sport-header">
                <img src="${leagueLogo}" alt="${sportName}" class="league-logo" onerror="this.style.display='none'">
                ${sportEmoji} ${sportName}
            </div>
            ${gamesHtml}
        </div>
    `;
}

function renderGame(game, sport) {
    const gameUrl = generateGameUrl(game.home.name, game.away.name, sport);
    const gameData = { ...game, sport: sport };
    const isLive = game.status === 'Live';
    const isFinal = game.status === 'Final' || game.status === 'Full Time';
    
    const gameClass = isLive ? 'live' : isFinal ? 'final' : '';
    const liveIndicator = isLive ? '<span class="live-indicator">Live</span>' : '';
    const quarter = game.quarter ? ` - ${game.quarter}` : game.minute ? ` - ${game.minute}` : '';
    
    const awayLogo = game.away.logo ? `<img src="${game.away.logo}" alt="${game.away.name}" class="team-logo" onerror="this.style.display='none'">` : '';
    const homeLogo = game.home.logo ? `<img src="${game.home.logo}" alt="${game.home.name}" class="team-logo" onerror="this.style.display='none'">` : '';
    
    return `
        <div class="game ${gameClass}" onclick="openGame('${gameUrl}')">
            <div class="teams">
                <div class="team">
                    ${awayLogo}
                    <div class="team-name">${game.away.name}</div>
                    <div class="score">${game.away.score}</div>
                </div>
                <div class="vs">@</div>
                <div class="team">
                    ${homeLogo}
                    <div class="team-name">${game.home.name}</div>
                    <div class="score">${game.home.score}</div>
                </div>
            </div>
            <div class="status">
                ${liveIndicator}
                ${game.status}
                ${quarter}
                <button class="tail-btn" onclick="event.stopPropagation(); tailGame(${JSON.stringify(gameData).replace(/"/g, '&quot;')})">Tail</button>
            </div>
        </div>
    `;
}
