// Team logo mapping service
// Maps team abbreviations to ESPN logo URLs

export class LogoService {
    private static readonly LOGO_BASE_URL = 'https://a.espncdn.com/i/teamlogos';
    
    // NFL Team Logos
    private static readonly NFL_LOGOS: { [key: string]: string } = {
        'ARI': `${this.LOGO_BASE_URL}/nfl/500/ari.png`,
        'ATL': `${this.LOGO_BASE_URL}/nfl/500/atl.png`,
        'BAL': `${this.LOGO_BASE_URL}/nfl/500/bal.png`,
        'BUF': `${this.LOGO_BASE_URL}/nfl/500/buf.png`,
        'CAR': `${this.LOGO_BASE_URL}/nfl/500/car.png`,
        'CHI': `${this.LOGO_BASE_URL}/nfl/500/chi.png`,
        'CIN': `${this.LOGO_BASE_URL}/nfl/500/cin.png`,
        'CLE': `${this.LOGO_BASE_URL}/nfl/500/cle.png`,
        'DAL': `${this.LOGO_BASE_URL}/nfl/500/dal.png`,
        'DEN': `${this.LOGO_BASE_URL}/nfl/500/den.png`,
        'DET': `${this.LOGO_BASE_URL}/nfl/500/det.png`,
        'GB': `${this.LOGO_BASE_URL}/nfl/500/gb.png`,
        'HOU': `${this.LOGO_BASE_URL}/nfl/500/hou.png`,
        'IND': `${this.LOGO_BASE_URL}/nfl/500/ind.png`,
        'JAX': `${this.LOGO_BASE_URL}/nfl/500/jax.png`,
        'KC': `${this.LOGO_BASE_URL}/nfl/500/kc.png`,
        'LV': `${this.LOGO_BASE_URL}/nfl/500/lv.png`,
        'LAC': `${this.LOGO_BASE_URL}/nfl/500/lac.png`,
        'LAR': `${this.LOGO_BASE_URL}/nfl/500/lar.png`,
        'MIA': `${this.LOGO_BASE_URL}/nfl/500/mia.png`,
        'MIN': `${this.LOGO_BASE_URL}/nfl/500/min.png`,
        'NE': `${this.LOGO_BASE_URL}/nfl/500/ne.png`,
        'NO': `${this.LOGO_BASE_URL}/nfl/500/no.png`,
        'NYG': `${this.LOGO_BASE_URL}/nfl/500/nyg.png`,
        'NYJ': `${this.LOGO_BASE_URL}/nfl/500/nyj.png`,
        'PHI': `${this.LOGO_BASE_URL}/nfl/500/phi.png`,
        'PIT': `${this.LOGO_BASE_URL}/nfl/500/pit.png`,
        'SF': `${this.LOGO_BASE_URL}/nfl/500/sf.png`,
        'SEA': `${this.LOGO_BASE_URL}/nfl/500/sea.png`,
        'TB': `${this.LOGO_BASE_URL}/nfl/500/tb.png`,
        'TEN': `${this.LOGO_BASE_URL}/nfl/500/ten.png`,
        'WAS': `${this.LOGO_BASE_URL}/nfl/500/wsh.png`
    };

    // NBA Team Logos
    private static readonly NBA_LOGOS: { [key: string]: string } = {
        'ATL': `${this.LOGO_BASE_URL}/nba/500/atl.png`,
        'BOS': `${this.LOGO_BASE_URL}/nba/500/bos.png`,
        'BKN': `${this.LOGO_BASE_URL}/nba/500/bkn.png`,
        'CHA': `${this.LOGO_BASE_URL}/nba/500/cha.png`,
        'CHI': `${this.LOGO_BASE_URL}/nba/500/chi.png`,
        'CLE': `${this.LOGO_BASE_URL}/nba/500/cle.png`,
        'DAL': `${this.LOGO_BASE_URL}/nba/500/dal.png`,
        'DEN': `${this.LOGO_BASE_URL}/nba/500/den.png`,
        'DET': `${this.LOGO_BASE_URL}/nba/500/det.png`,
        'GS': `${this.LOGO_BASE_URL}/nba/500/gs.png`,
        'HOU': `${this.LOGO_BASE_URL}/nba/500/hou.png`,
        'IND': `${this.LOGO_BASE_URL}/nba/500/ind.png`,
        'LAC': `${this.LOGO_BASE_URL}/nba/500/lac.png`,
        'LAL': `${this.LOGO_BASE_URL}/nba/500/lal.png`,
        'MEM': `${this.LOGO_BASE_URL}/nba/500/mem.png`,
        'MIA': `${this.LOGO_BASE_URL}/nba/500/mia.png`,
        'MIL': `${this.LOGO_BASE_URL}/nba/500/mil.png`,
        'MIN': `${this.LOGO_BASE_URL}/nba/500/min.png`,
        'NO': `${this.LOGO_BASE_URL}/nba/500/no.png`,
        'NY': `${this.LOGO_BASE_URL}/nba/500/ny.png`,
        'OKC': `${this.LOGO_BASE_URL}/nba/500/okc.png`,
        'ORL': `${this.LOGO_BASE_URL}/nba/500/orl.png`,
        'PHI': `${this.LOGO_BASE_URL}/nba/500/phi.png`,
        'PHX': `${this.LOGO_BASE_URL}/nba/500/phx.png`,
        'POR': `${this.LOGO_BASE_URL}/nba/500/por.png`,
        'SAC': `${this.LOGO_BASE_URL}/nba/500/sac.png`,
        'SA': `${this.LOGO_BASE_URL}/nba/500/sa.png`,
        'TOR': `${this.LOGO_BASE_URL}/nba/500/tor.png`,
        'UTAH': `${this.LOGO_BASE_URL}/nba/500/utah.png`,
        'WAS': `${this.LOGO_BASE_URL}/nba/500/wsh.png`
    };

    // MLB Team Logos
    private static readonly MLB_LOGOS: { [key: string]: string } = {
        'ARI': `${this.LOGO_BASE_URL}/mlb/500/ari.png`,
        'ATL': `${this.LOGO_BASE_URL}/mlb/500/atl.png`,
        'BAL': `${this.LOGO_BASE_URL}/mlb/500/bal.png`,
        'BOS': `${this.LOGO_BASE_URL}/mlb/500/bos.png`,
        'CHC': `${this.LOGO_BASE_URL}/mlb/500/chc.png`,
        'CWS': `${this.LOGO_BASE_URL}/mlb/500/cws.png`,
        'CIN': `${this.LOGO_BASE_URL}/mlb/500/cin.png`,
        'CLE': `${this.LOGO_BASE_URL}/mlb/500/cle.png`,
        'COL': `${this.LOGO_BASE_URL}/mlb/500/col.png`,
        'DET': `${this.LOGO_BASE_URL}/mlb/500/det.png`,
        'HOU': `${this.LOGO_BASE_URL}/mlb/500/hou.png`,
        'KC': `${this.LOGO_BASE_URL}/mlb/500/kc.png`,
        'LAA': `${this.LOGO_BASE_URL}/mlb/500/laa.png`,
        'LAD': `${this.LOGO_BASE_URL}/mlb/500/lad.png`,
        'MIA': `${this.LOGO_BASE_URL}/mlb/500/mia.png`,
        'MIL': `${this.LOGO_BASE_URL}/mlb/500/mil.png`,
        'MIN': `${this.LOGO_BASE_URL}/mlb/500/min.png`,
        'NYM': `${this.LOGO_BASE_URL}/mlb/500/nym.png`,
        'NYY': `${this.LOGO_BASE_URL}/mlb/500/nyy.png`,
        'OAK': `${this.LOGO_BASE_URL}/mlb/500/oak.png`,
        'PHI': `${this.LOGO_BASE_URL}/mlb/500/phi.png`,
        'PIT': `${this.LOGO_BASE_URL}/mlb/500/pit.png`,
        'SD': `${this.LOGO_BASE_URL}/mlb/500/sd.png`,
        'SF': `${this.LOGO_BASE_URL}/mlb/500/sf.png`,
        'SEA': `${this.LOGO_BASE_URL}/mlb/500/sea.png`,
        'STL': `${this.LOGO_BASE_URL}/mlb/500/stl.png`,
        'TB': `${this.LOGO_BASE_URL}/mlb/500/tb.png`,
        'TEX': `${this.LOGO_BASE_URL}/mlb/500/tex.png`,
        'TOR': `${this.LOGO_BASE_URL}/mlb/500/tor.png`,
        'WAS': `${this.LOGO_BASE_URL}/mlb/500/wsh.png`
    };

    // NHL Team Logos
    private static readonly NHL_LOGOS: { [key: string]: string } = {
        'ANA': `${this.LOGO_BASE_URL}/nhl/500/ana.png`,
        'ARI': `${this.LOGO_BASE_URL}/nhl/500/ari.png`,
        'BOS': `${this.LOGO_BASE_URL}/nhl/500/bos.png`,
        'BUF': `${this.LOGO_BASE_URL}/nhl/500/buf.png`,
        'CGY': `${this.LOGO_BASE_URL}/nhl/500/cgy.png`,
        'CAR': `${this.LOGO_BASE_URL}/nhl/500/car.png`,
        'CHI': `${this.LOGO_BASE_URL}/nhl/500/chi.png`,
        'COL': `${this.LOGO_BASE_URL}/nhl/500/col.png`,
        'CBJ': `${this.LOGO_BASE_URL}/nhl/500/cbj.png`,
        'DAL': `${this.LOGO_BASE_URL}/nhl/500/dal.png`,
        'DET': `${this.LOGO_BASE_URL}/nhl/500/det.png`,
        'EDM': `${this.LOGO_BASE_URL}/nhl/500/edm.png`,
        'FLA': `${this.LOGO_BASE_URL}/nhl/500/fla.png`,
        'LA': `${this.LOGO_BASE_URL}/nhl/500/la.png`,
        'MIN': `${this.LOGO_BASE_URL}/nhl/500/min.png`,
        'MTL': `${this.LOGO_BASE_URL}/nhl/500/mtl.png`,
        'NSH': `${this.LOGO_BASE_URL}/nhl/500/nsh.png`,
        'NJ': `${this.LOGO_BASE_URL}/nhl/500/nj.png`,
        'NYI': `${this.LOGO_BASE_URL}/nhl/500/nyi.png`,
        'NYR': `${this.LOGO_BASE_URL}/nhl/500/nyr.png`,
        'OTT': `${this.LOGO_BASE_URL}/nhl/500/ott.png`,
        'PHI': `${this.LOGO_BASE_URL}/nhl/500/phi.png`,
        'PIT': `${this.LOGO_BASE_URL}/nhl/500/pit.png`,
        'SJ': `${this.LOGO_BASE_URL}/nhl/500/sj.png`,
        'SEA': `${this.LOGO_BASE_URL}/nhl/500/sea.png`,
        'STL': `${this.LOGO_BASE_URL}/nhl/500/stl.png`,
        'TB': `${this.LOGO_BASE_URL}/nhl/500/tb.png`,
        'TOR': `${this.LOGO_BASE_URL}/nhl/500/tor.png`,
        'VAN': `${this.LOGO_BASE_URL}/nhl/500/van.png`,
        'VGK': `${this.LOGO_BASE_URL}/nhl/500/vgk.png`,
        'WAS': `${this.LOGO_BASE_URL}/nhl/500/wsh.png`,
        'WPG': `${this.LOGO_BASE_URL}/nhl/500/wpg.png`
    };

    // Premier League Team Logos
    private static readonly PREMIER_LEAGUE_LOGOS: { [key: string]: string } = {
        'ARS': `${this.LOGO_BASE_URL}/soccer/500/359.png`, // Arsenal
        'AVL': `${this.LOGO_BASE_URL}/soccer/500/362.png`, // Aston Villa
        'BOU': `${this.LOGO_BASE_URL}/soccer/500/349.png`, // Bournemouth
        'BRE': `${this.LOGO_BASE_URL}/soccer/500/361.png`, // Brentford
        'BHA': `${this.LOGO_BASE_URL}/soccer/500/331.png`, // Brighton
        'BUR': `${this.LOGO_BASE_URL}/soccer/500/379.png`, // Burnley
        'CHE': `${this.LOGO_BASE_URL}/soccer/500/363.png`, // Chelsea
        'CRY': `${this.LOGO_BASE_URL}/soccer/500/354.png`, // Crystal Palace
        'EVE': `${this.LOGO_BASE_URL}/soccer/500/368.png`, // Everton
        'FUL': `${this.LOGO_BASE_URL}/soccer/500/370.png`, // Fulham
        'LEI': `${this.LOGO_BASE_URL}/soccer/500/375.png`, // Leicester
        'LIV': `${this.LOGO_BASE_URL}/soccer/500/364.png`, // Liverpool
        'MAN': `${this.LOGO_BASE_URL}/soccer/500/360.png`, // Manchester United (ESPN API uses MAN)
        'MCI': `${this.LOGO_BASE_URL}/soccer/500/382.png`, // Manchester City (legacy)
        'MNC': `${this.LOGO_BASE_URL}/soccer/500/382.png`, // Manchester City (ESPN API uses MNC)
        'MUN': `${this.LOGO_BASE_URL}/soccer/500/360.png`, // Manchester United (legacy)
        'NEW': `${this.LOGO_BASE_URL}/soccer/500/361.png`, // Newcastle
        'NFO': `${this.LOGO_BASE_URL}/soccer/500/351.png`, // Nottingham Forest
        'SHU': `${this.LOGO_BASE_URL}/soccer/500/376.png`, // Sheffield United
        'TOT': `${this.LOGO_BASE_URL}/soccer/500/367.png`, // Tottenham
        'WHU': `${this.LOGO_BASE_URL}/soccer/500/379.png`, // West Ham
        'WOL': `${this.LOGO_BASE_URL}/soccer/500/380.png`  // Wolves
    };

    static getLogo(teamAbbreviation: string, sport: 'nfl' | 'nba' | 'mlb' | 'nhl' | 'premierLeague'): string | undefined {
        const abbreviation = teamAbbreviation.toUpperCase();
        
        // Debug logging for Premier League
        if (sport === 'premierLeague') {
            console.log(`LogoService: Looking for ${abbreviation} in Premier League logos`);
            const logo = this.PREMIER_LEAGUE_LOGOS[abbreviation];
            console.log(`LogoService: Found logo for ${abbreviation}: ${logo || 'NOT FOUND'}`);
            return logo;
        }
        
        switch (sport) {
            case 'nfl':
                return this.NFL_LOGOS[abbreviation];
            case 'nba':
                return this.NBA_LOGOS[abbreviation];
            case 'mlb':
                return this.MLB_LOGOS[abbreviation];
            case 'nhl':
                return this.NHL_LOGOS[abbreviation];
            default:
                return undefined;
        }
    }

    static addLogoToTeam(team: any, sport: 'nfl' | 'nba' | 'mlb' | 'nhl' | 'premierLeague'): any {
        const logo = this.getLogo(team.abbreviation || team.name, sport);
        return {
            ...team,
            logo: logo
        };
    }
}
