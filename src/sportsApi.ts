import * as https from 'https';
import { LogoService } from './logoService';
import { TeamColorService, TeamColors } from './teamColors';

export interface Game {
    home: {
        name: string;
        score: number;
        logo?: string;
        abbreviation?: string;
        colors?: TeamColors;
    };
    away: {
        name: string;
        score: number;
        logo?: string;
        abbreviation?: string;
        colors?: TeamColors;
    };
    status: string;
    quarter?: string;
    minute?: string;
    date?: string;
    time?: string;
    gameId?: string;
}

export interface SportsData {
    nfl: {
        games: Game[];
    };
    nba: {
        games: Game[];
    };
    premierLeague: {
        games: Game[];
    };
    nhl: {
        games: Game[];
    };
    mlb: {
        games: Game[];
    };
}

export class SportsApiService {
    private readonly ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports';

    async fetchSportsData(): Promise<SportsData> {
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
        } catch (error) {
            console.error('Error fetching sports data:', error);
            return this.getMockData();
        }
    }

    private getMockData(): SportsData {
        return {
            nfl: {
                games: [
                    {
                        home: { 
                            name: 'Chiefs', 
                            score: 24, 
                            abbreviation: 'KC',
                            logo: LogoService.getLogo('KC', 'nfl'),
                            colors: TeamColorService.getTeamColors('KC', 'nfl')
                        },
                        away: { 
                            name: 'Bills', 
                            score: 20, 
                            abbreviation: 'BUF',
                            logo: LogoService.getLogo('BUF', 'nfl'),
                            colors: TeamColorService.getTeamColors('BUF', 'nfl')
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
                            logo: LogoService.getLogo('DAL', 'nfl'),
                            colors: TeamColorService.getTeamColors('DAL', 'nfl')
                        },
                        away: { 
                            name: 'Eagles', 
                            score: 28, 
                            abbreviation: 'PHI',
                            logo: LogoService.getLogo('PHI', 'nfl'),
                            colors: TeamColorService.getTeamColors('PHI', 'nfl')
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
                            logo: LogoService.getLogo('BAL', 'nfl'),
                            colors: TeamColorService.getTeamColors('BAL', 'nfl')
                        },
                        away: { 
                            name: 'Steelers', 
                            score: 14, 
                            abbreviation: 'PIT',
                            logo: LogoService.getLogo('PIT', 'nfl'),
                            colors: TeamColorService.getTeamColors('PIT', 'nfl')
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
                            logo: LogoService.getLogo('LAL', 'nba'),
                            colors: TeamColorService.getTeamColors('LAL', 'nba')
                        },
                        away: { 
                            name: 'Warriors', 
                            score: 108, 
                            abbreviation: 'GS',
                            logo: LogoService.getLogo('GS', 'nba'),
                            colors: TeamColorService.getTeamColors('GS', 'nba')
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
                            logo: LogoService.getLogo('BOS', 'nba'),
                            colors: TeamColorService.getTeamColors('BOS', 'nba')
                        },
                        away: { 
                            name: 'Heat', 
                            score: 95, 
                            abbreviation: 'MIA',
                            logo: LogoService.getLogo('MIA', 'nba'),
                            colors: TeamColorService.getTeamColors('MIA', 'nba')
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
                            logo: LogoService.getLogo('DEN', 'nba'),
                            colors: TeamColorService.getTeamColors('DEN', 'nba')
                        },
                        away: { 
                            name: 'Suns', 
                            score: 42, 
                            abbreviation: 'PHX',
                            logo: LogoService.getLogo('PHX', 'nba'),
                            colors: TeamColorService.getTeamColors('PHX', 'nba')
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
                            logo: LogoService.getLogo('ARS', 'premierLeague'),
                            colors: TeamColorService.getTeamColors('ARS', 'premierLeague')
                        },
                        away: { 
                            name: 'Chelsea', 
                            score: 1, 
                            abbreviation: 'CHE',
                            logo: LogoService.getLogo('CHE', 'premierLeague'),
                            colors: TeamColorService.getTeamColors('CHE', 'premierLeague')
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
                            logo: LogoService.getLogo('LIV', 'premierLeague'),
                            colors: TeamColorService.getTeamColors('LIV', 'premierLeague')
                        },
                        away: { 
                            name: 'Manchester City', 
                            score: 1, 
                            abbreviation: 'MCI',
                            logo: LogoService.getLogo('MCI', 'premierLeague'),
                            colors: TeamColorService.getTeamColors('MCI', 'premierLeague')
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
                            logo: LogoService.getLogo('TOT', 'premierLeague'),
                            colors: TeamColorService.getTeamColors('TOT', 'premierLeague')
                        },
                        away: { 
                            name: 'Manchester United', 
                            score: 1, 
                            abbreviation: 'MUN',
                            logo: LogoService.getLogo('MUN', 'premierLeague'),
                            colors: TeamColorService.getTeamColors('MUN', 'premierLeague')
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
                            logo: LogoService.getLogo('TOR', 'nhl'),
                            colors: TeamColorService.getTeamColors('TOR', 'nhl')
                        },
                        away: { 
                            name: 'Bruins', 
                            score: 2, 
                            abbreviation: 'BOS',
                            logo: LogoService.getLogo('BOS', 'nhl'),
                            colors: TeamColorService.getTeamColors('BOS', 'nhl')
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
                            logo: LogoService.getLogo('NYR', 'nhl'),
                            colors: TeamColorService.getTeamColors('NYR', 'nhl')
                        },
                        away: { 
                            name: 'Islanders', 
                            score: 1, 
                            abbreviation: 'NYI',
                            logo: LogoService.getLogo('NYI', 'nhl'),
                            colors: TeamColorService.getTeamColors('NYI', 'nhl')
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
                            logo: LogoService.getLogo('NYY', 'mlb'),
                            colors: TeamColorService.getTeamColors('NYY', 'mlb')
                        },
                        away: { 
                            name: 'Red Sox', 
                            score: 3, 
                            abbreviation: 'BOS',
                            logo: LogoService.getLogo('BOS', 'mlb'),
                            colors: TeamColorService.getTeamColors('BOS', 'mlb')
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
                            logo: LogoService.getLogo('LAD', 'mlb'),
                            colors: TeamColorService.getTeamColors('LAD', 'mlb')
                        },
                        away: { 
                            name: 'Giants', 
                            score: 1, 
                            abbreviation: 'SF',
                            logo: LogoService.getLogo('SF', 'mlb'),
                            colors: TeamColorService.getTeamColors('SF', 'mlb')
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
    private async makeHttpRequest(url: string): Promise<any> {
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
                    } catch (error) {
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
    private getTeamLogo(team: any): string | undefined {
        if (team.team?.logos && team.team.logos.length > 0) {
            return team.team.logos[0].href;
        }
        return undefined;
    }

    // Helper method to enhance team data with logos and colors
    private enhanceTeamData(team: any, sport: 'nfl' | 'nba' | 'mlb' | 'nhl' | 'premierLeague'): any {
        const abbreviation = team.team?.abbreviation || team.name;
        const logo = this.getTeamLogo(team) || LogoService.getLogo(abbreviation, sport);
        const colors = TeamColorService.getTeamColors(abbreviation, sport) || TeamColorService.getDefaultColors();
        
        return {
            name: team.team?.displayName || team.team?.name || team.name,
            score: parseInt(team.score) || 0,
            abbreviation: abbreviation,
            logo: logo,
            colors: colors
        };
    }

    // Real API methods using ESPN API
    async fetchNFLGames(): Promise<{ games: Game[] }> {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/football/nfl/scoreboard`);
            const games: Game[] = data.events?.map((event: any) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');
                
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
        } catch (error) {
            console.error('Error fetching NFL games:', error);
            return { games: [] };
        }
    }

    async fetchNBAGames(): Promise<{ games: Game[] }> {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/basketball/nba/scoreboard`);
            const games: Game[] = data.events?.map((event: any) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');
                
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
        } catch (error) {
            console.error('Error fetching NBA games:', error);
            return { games: [] };
        }
    }

    async fetchSoccerGames(): Promise<{ games: Game[] }> {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/soccer/eng.1/scoreboard`);
            const games: Game[] = data.events?.map((event: any) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');
                
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
        } catch (error) {
            console.error('Error fetching soccer games:', error);
            return { games: [] };
        }
    }

    async fetchNHLGames(): Promise<{ games: Game[] }> {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/hockey/nhl/scoreboard`);
            const games: Game[] = data.events?.map((event: any) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');
                
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
        } catch (error) {
            console.error('Error fetching NHL games:', error);
            return { games: [] };
        }
    }

    async fetchMLBGames(): Promise<{ games: Game[] }> {
        try {
            const data = await this.makeHttpRequest(`${this.ESPN_API_BASE}/baseball/mlb/scoreboard`);
            const games: Game[] = data.events?.map((event: any) => {
                const competition = event.competitions[0];
                const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
                const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');
                
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
        } catch (error) {
            console.error('Error fetching MLB games:', error);
            return { games: [] };
        }
    }

    // Helper methods for status formatting
    private getGameStatus(statusType: any): string {
        if (statusType.id === 1) return 'Scheduled';
        if (statusType.id === 2) return 'Live';
        if (statusType.id === 3) return 'Final';
        if (statusType.id === 4) return 'Postponed';
        return statusType.name || 'Unknown';
    }

    private getSoccerStatus(statusType: any): string {
        if (statusType.id === 1) return 'Scheduled';
        if (statusType.id === 2) return 'Live';
        if (statusType.id === 3) return 'Full Time';
        if (statusType.id === 4) return 'Postponed';
        return statusType.name || 'Unknown';
    }

    private getOrdinal(num: number): string {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return 'st';
        if (j === 2 && k !== 12) return 'nd';
        if (j === 3 && k !== 13) return 'rd';
        return 'th';
    }
}