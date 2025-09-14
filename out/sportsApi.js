"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportsApiService = void 0;
const https = require("https");
const logoService_1 = require("./logoService");
const teamColors_1 = require("./teamColors");
class SportsApiService {
    constructor() {
        this.ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports';
    }
    async fetchSportsData() {
        try {
            // Fetch data from multiple sports in parallel
            const [nflData, nbaData, soccerData, nhlData, mlbData] = await Promise.allSettled([
                this.fetchNFLGames(),
                this.fetchNBAGames(),
                this.fetchSoccerGames(),
                this.fetchNHLGames(),
                this.fetchMLBGames()
            ]);
            return {
                nfl: nflData.status === 'fulfilled' ? nflData.value : { games: [] },
                nba: nbaData.status === 'fulfilled' ? nbaData.value : { games: [] },
                premierLeague: soccerData.status === 'fulfilled' ? soccerData.value : { games: [] },
                nhl: nhlData.status === 'fulfilled' ? nhlData.value : { games: [] },
                mlb: mlbData.status === 'fulfilled' ? mlbData.value : { games: [] }
            };
        }
        catch (error) {
            console.error('Error fetching sports data:', error);
            return this.getMockData();
        }
    }
    getMockData() {
        return {
            nfl: {
                games: [
                    {
                        home: {
                            name: 'Chiefs',
                            score: 24,
                            abbreviation: 'KC',
                            logo: logoService_1.LogoService.getLogo('KC', 'nfl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('KC', 'nfl')
                        },
                        away: {
                            name: 'Bills',
                            score: 20,
                            abbreviation: 'BUF',
                            logo: logoService_1.LogoService.getLogo('BUF', 'nfl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('BUF', 'nfl')
                        },
                        status: 'Final',
                        quarter: '4th',
                        date: '2024-01-15',
                        time: '8:00 PM'
                    },
                    {
                        home: {
                            name: 'Cowboys',
                            score: 31,
                            abbreviation: 'DAL',
                            logo: logoService_1.LogoService.getLogo('DAL', 'nfl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('DAL', 'nfl')
                        },
                        away: {
                            name: 'Eagles',
                            score: 28,
                            abbreviation: 'PHI',
                            logo: logoService_1.LogoService.getLogo('PHI', 'nfl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('PHI', 'nfl')
                        },
                        status: 'Final',
                        quarter: '4th',
                        date: '2024-01-15',
                        time: '4:30 PM'
                    },
                    {
                        home: {
                            name: 'Ravens',
                            score: 17,
                            abbreviation: 'BAL',
                            logo: logoService_1.LogoService.getLogo('BAL', 'nfl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('BAL', 'nfl')
                        },
                        away: {
                            name: 'Steelers',
                            score: 14,
                            abbreviation: 'PIT',
                            logo: logoService_1.LogoService.getLogo('PIT', 'nfl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('PIT', 'nfl')
                        },
                        status: 'Live',
                        quarter: '3rd',
                        date: '2024-01-15',
                        time: '1:00 PM'
                    }
                ]
            },
            nba: {
                games: [
                    {
                        home: {
                            name: 'Lakers',
                            score: 112,
                            abbreviation: 'LAL',
                            logo: logoService_1.LogoService.getLogo('LAL', 'nba'),
                            colors: teamColors_1.TeamColorService.getTeamColors('LAL', 'nba')
                        },
                        away: {
                            name: 'Warriors',
                            score: 108,
                            abbreviation: 'GS',
                            logo: logoService_1.LogoService.getLogo('GS', 'nba'),
                            colors: teamColors_1.TeamColorService.getTeamColors('GS', 'nba')
                        },
                        status: 'Final',
                        quarter: '4th',
                        date: '2024-01-15',
                        time: '10:30 PM'
                    },
                    {
                        home: {
                            name: 'Celtics',
                            score: 98,
                            abbreviation: 'BOS',
                            logo: logoService_1.LogoService.getLogo('BOS', 'nba'),
                            colors: teamColors_1.TeamColorService.getTeamColors('BOS', 'nba')
                        },
                        away: {
                            name: 'Heat',
                            score: 95,
                            abbreviation: 'MIA',
                            logo: logoService_1.LogoService.getLogo('MIA', 'nba'),
                            colors: teamColors_1.TeamColorService.getTeamColors('MIA', 'nba')
                        },
                        status: 'Final',
                        quarter: '4th',
                        date: '2024-01-15',
                        time: '8:00 PM'
                    },
                    {
                        home: {
                            name: 'Nuggets',
                            score: 45,
                            abbreviation: 'DEN',
                            logo: logoService_1.LogoService.getLogo('DEN', 'nba'),
                            colors: teamColors_1.TeamColorService.getTeamColors('DEN', 'nba')
                        },
                        away: {
                            name: 'Suns',
                            score: 42,
                            abbreviation: 'PHX',
                            logo: logoService_1.LogoService.getLogo('PHX', 'nba'),
                            colors: teamColors_1.TeamColorService.getTeamColors('PHX', 'nba')
                        },
                        status: 'Live',
                        quarter: '2nd',
                        date: '2024-01-15',
                        time: '9:00 PM'
                    }
                ]
            },
            premierLeague: {
                games: [
                    {
                        home: {
                            name: 'Arsenal',
                            score: 2,
                            abbreviation: 'ARS',
                            logo: logoService_1.LogoService.getLogo('ARS', 'premierLeague'),
                            colors: teamColors_1.TeamColorService.getTeamColors('ARS', 'premierLeague')
                        },
                        away: {
                            name: 'Chelsea',
                            score: 1,
                            abbreviation: 'CHE',
                            logo: logoService_1.LogoService.getLogo('CHE', 'premierLeague'),
                            colors: teamColors_1.TeamColorService.getTeamColors('CHE', 'premierLeague')
                        },
                        status: 'Full Time',
                        minute: '90+3',
                        date: '2024-01-15',
                        time: '3:00 PM'
                    },
                    {
                        home: {
                            name: 'Liverpool',
                            score: 3,
                            abbreviation: 'LIV',
                            logo: logoService_1.LogoService.getLogo('LIV', 'premierLeague'),
                            colors: teamColors_1.TeamColorService.getTeamColors('LIV', 'premierLeague')
                        },
                        away: {
                            name: 'Manchester City',
                            score: 1,
                            abbreviation: 'MCI',
                            logo: logoService_1.LogoService.getLogo('MCI', 'premierLeague'),
                            colors: teamColors_1.TeamColorService.getTeamColors('MCI', 'premierLeague')
                        },
                        status: 'Full Time',
                        minute: '90+5',
                        date: '2024-01-15',
                        time: '5:30 PM'
                    },
                    {
                        home: {
                            name: 'Tottenham',
                            score: 1,
                            abbreviation: 'TOT',
                            logo: logoService_1.LogoService.getLogo('TOT', 'premierLeague'),
                            colors: teamColors_1.TeamColorService.getTeamColors('TOT', 'premierLeague')
                        },
                        away: {
                            name: 'Manchester United',
                            score: 1,
                            abbreviation: 'MUN',
                            logo: logoService_1.LogoService.getLogo('MUN', 'premierLeague'),
                            colors: teamColors_1.TeamColorService.getTeamColors('MUN', 'premierLeague')
                        },
                        status: 'Live',
                        minute: '67',
                        date: '2024-01-15',
                        time: '2:00 PM'
                    }
                ]
            },
            nhl: {
                games: [
                    {
                        home: {
                            name: 'Maple Leafs',
                            score: 4,
                            abbreviation: 'TOR',
                            logo: logoService_1.LogoService.getLogo('TOR', 'nhl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('TOR', 'nhl')
                        },
                        away: {
                            name: 'Bruins',
                            score: 2,
                            abbreviation: 'BOS',
                            logo: logoService_1.LogoService.getLogo('BOS', 'nhl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('BOS', 'nhl')
                        },
                        status: 'Final',
                        quarter: '3rd',
                        date: '2024-01-15',
                        time: '7:00 PM'
                    },
                    {
                        home: {
                            name: 'Rangers',
                            score: 3,
                            abbreviation: 'NYR',
                            logo: logoService_1.LogoService.getLogo('NYR', 'nhl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('NYR', 'nhl')
                        },
                        away: {
                            name: 'Islanders',
                            score: 1,
                            abbreviation: 'NYI',
                            logo: logoService_1.LogoService.getLogo('NYI', 'nhl'),
                            colors: teamColors_1.TeamColorService.getTeamColors('NYI', 'nhl')
                        },
                        status: 'Final',
                        quarter: '3rd',
                        date: '2024-01-15',
                        time: '7:30 PM'
                    }
                ]
            },
            mlb: {
                games: [
                    {
                        home: {
                            name: 'Yankees',
                            score: 5,
                            abbreviation: 'NYY',
                            logo: logoService_1.LogoService.getLogo('NYY', 'mlb'),
                            colors: teamColors_1.TeamColorService.getTeamColors('NYY', 'mlb')
                        },
                        away: {
                            name: 'Red Sox',
                            score: 3,
                            abbreviation: 'BOS',
                            logo: logoService_1.LogoService.getLogo('BOS', 'mlb'),
                            colors: teamColors_1.TeamColorService.getTeamColors('BOS', 'mlb')
                        },
                        status: 'Final',
                        quarter: '9th',
                        date: '2024-01-15',
                        time: '7:05 PM'
                    },
                    {
                        home: {
                            name: 'Dodgers',
                            score: 2,
                            abbreviation: 'LAD',
                            logo: logoService_1.LogoService.getLogo('LAD', 'mlb'),
                            colors: teamColors_1.TeamColorService.getTeamColors('LAD', 'mlb')
                        },
                        away: {
                            name: 'Giants',
                            score: 1,
                            abbreviation: 'SF',
                            logo: logoService_1.LogoService.getLogo('SF', 'mlb'),
                            colors: teamColors_1.TeamColorService.getTeamColors('SF', 'mlb')
                        },
                        status: 'Final',
                        quarter: '9th',
                        date: '2024-01-15',
                        time: '10:10 PM'
                    }
                ]
            }
        };
    }
    // Helper method to make HTTP requests
    async makeHttpRequest(url) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const options = {
                hostname: urlObj.hostname,
                path: urlObj.pathname + urlObj.search,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Sideline-VSCode-Extension/1.0'
                }
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
            req.end();
        });
    }
    // Helper method to extract team logo from ESPN API response
    getTeamLogo(team) {
        if (team.team?.logos && team.team.logos.length > 0) {
            return team.team.logos[0].href;
        }
        return undefined;
    }
    // Helper method to enhance team data with logos and colors
    enhanceTeamData(team, sport) {
        const abbreviation = team.team?.abbreviation || team.name;
        // Debug logging for Premier League
        if (sport === 'premierLeague') {
            console.log(`SportsApi: Enhancing team data for ${team.team?.displayName || team.team?.name || team.name}`);
            console.log(`SportsApi: Team abbreviation: ${abbreviation}`);
            console.log(`SportsApi: Team object:`, team);
        }
        // Prioritize LogoService over ESPN API logos for better reliability
        const logo = logoService_1.LogoService.getLogo(abbreviation, sport) || this.getTeamLogo(team);
        const colors = teamColors_1.TeamColorService.getTeamColors(abbreviation, sport) || teamColors_1.TeamColorService.getDefaultColors();
        return {
            name: team.team?.displayName || team.team?.name || team.name,
            score: parseInt(team.score) || 0,
            abbreviation: abbreviation,
            logo: logo,
            colors: colors
        };
    }
    // Real API methods using ESPN API
    async fetchNFLGames() {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/football/nfl/scoreboard`);
            const games = data.events?.map((event) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');
                return {
                    home: this.enhanceTeamData(homeTeam, 'nfl'),
                    away: this.enhanceTeamData(awayTeam, 'nfl'),
                    status: this.getGameStatus(competition.status.type),
                    quarter: (competition.status.period && !isNaN(competition.status.period) && competition.status.period > 0) ? `${competition.status.period}${this.getOrdinal(competition.status.period)}` : undefined,
                    date: event.date,
                    time: new Date(event.date).toLocaleTimeString(),
                    gameId: event.id
                };
            }) || [];
            return { games };
        }
        catch (error) {
            console.error('Error fetching NFL games:', error);
            return { games: [] };
        }
    }
    async fetchNBAGames() {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/basketball/nba/scoreboard`);
            const games = data.events?.map((event) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');
                return {
                    home: this.enhanceTeamData(homeTeam, 'nba'),
                    away: this.enhanceTeamData(awayTeam, 'nba'),
                    status: this.getGameStatus(competition.status.type),
                    quarter: (competition.status.period && !isNaN(competition.status.period) && competition.status.period > 0) ? `${competition.status.period}${this.getOrdinal(competition.status.period)}` : undefined,
                    date: event.date,
                    time: new Date(event.date).toLocaleTimeString(),
                    gameId: event.id
                };
            }) || [];
            return { games };
        }
        catch (error) {
            console.error('Error fetching NBA games:', error);
            return { games: [] };
        }
    }
    async fetchSoccerGames() {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/soccer/eng.1/scoreboard`);
            const games = data.events?.map((event) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');
                return {
                    home: this.enhanceTeamData(homeTeam, 'premierLeague'),
                    away: this.enhanceTeamData(awayTeam, 'premierLeague'),
                    status: this.getSoccerStatus(competition.status.type),
                    minute: competition.status.displayClock,
                    date: event.date,
                    time: new Date(event.date).toLocaleTimeString(),
                    gameId: event.id
                };
            }) || [];
            return { games };
        }
        catch (error) {
            console.error('Error fetching soccer games:', error);
            return { games: [] };
        }
    }
    async fetchNHLGames() {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/hockey/nhl/scoreboard`);
            const games = data.events?.map((event) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');
                const gameDate = event.date ? new Date(event.date) : null;
                const isValidDate = gameDate && !isNaN(gameDate.getTime());
                return {
                    home: this.enhanceTeamData(homeTeam, 'nhl'),
                    away: this.enhanceTeamData(awayTeam, 'nhl'),
                    status: this.getGameStatus(competition.status.type),
                    quarter: (competition.status.period && !isNaN(competition.status.period) && competition.status.period > 0) ? `${competition.status.period}${this.getOrdinal(competition.status.period)}` : undefined,
                    date: event.date,
                    time: isValidDate ? gameDate.toLocaleTimeString() : undefined,
                    gameId: event.id
                };
            }) || [];
            return { games };
        }
        catch (error) {
            console.error('Error fetching NHL games:', error);
            return { games: [] };
        }
    }
    async fetchMLBGames() {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/baseball/mlb/scoreboard`);
            const games = data.events?.map((event) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');
                // For baseball, check multiple possible fields for inning information
                let inningInfo = undefined;
                let inningDisplay = undefined;
                // Check if there's a period field (inning number)
                if (competition.status.period && !isNaN(competition.status.period) && competition.status.period > 0) {
                    inningInfo = competition.status.period;
                }
                // Check if there's displayClock (might contain inning info)
                if (competition.status.displayClock) {
                    inningDisplay = competition.status.displayClock;
                }
                // Check if there's a type description that might contain inning info
                if (competition.status.type && competition.status.type.description) {
                    const desc = competition.status.type.description.toLowerCase();
                    if (desc.includes('inning') || desc.includes('top') || desc.includes('bottom')) {
                        inningDisplay = competition.status.type.description;
                    }
                }
                return {
                    home: this.enhanceTeamData(homeTeam, 'mlb'),
                    away: this.enhanceTeamData(awayTeam, 'mlb'),
                    status: this.getGameStatus(competition.status.type),
                    quarter: inningInfo ? `${inningInfo}${this.getOrdinal(inningInfo)}` : undefined,
                    minute: inningDisplay || undefined,
                    date: event.date,
                    time: new Date(event.date).toLocaleTimeString(),
                    gameId: event.id
                };
            }) || [];
            return { games };
        }
        catch (error) {
            console.error('Error fetching MLB games:', error);
            return { games: [] };
        }
    }
    // Helper methods for status formatting
    getGameStatus(statusType) {
        if (statusType.id === 1)
            return 'Scheduled';
        if (statusType.id === 2)
            return 'Live';
        if (statusType.id === 3)
            return 'Final';
        if (statusType.id === 4)
            return 'Postponed';
        return statusType.name || 'Unknown';
    }
    getSoccerStatus(statusType) {
        if (statusType.id === 1)
            return 'Scheduled';
        if (statusType.id === 2)
            return 'Live';
        if (statusType.id === 3)
            return 'Full Time';
        if (statusType.id === 4)
            return 'Postponed';
        return statusType.name || 'Unknown';
    }
    getOrdinal(num) {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11)
            return 'st';
        if (j === 2 && k !== 12)
            return 'nd';
        if (j === 3 && k !== 13)
            return 'rd';
        return 'th';
    }
}
exports.SportsApiService = SportsApiService;
//# sourceMappingURL=sportsApi.js.map