"use strict";
// Team logo mapping service
// Maps team abbreviations to ESPN logo URLs
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoService = void 0;
class LogoService {
    static getLogo(teamAbbreviation, sport) {
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
    static addLogoToTeam(team, sport) {
        const logo = this.getLogo(team.abbreviation || team.name, sport);
        return {
            ...team,
            logo: logo
        };
    }
}
exports.LogoService = LogoService;
_a = LogoService;
LogoService.LOGO_BASE_URL = 'https://a.espncdn.com/i/teamlogos';
// NFL Team Logos
LogoService.NFL_LOGOS = {
    'ARI': `${_a.LOGO_BASE_URL}/nfl/500/ari.png`,
    'ATL': `${_a.LOGO_BASE_URL}/nfl/500/atl.png`,
    'BAL': `${_a.LOGO_BASE_URL}/nfl/500/bal.png`,
    'BUF': `${_a.LOGO_BASE_URL}/nfl/500/buf.png`,
    'CAR': `${_a.LOGO_BASE_URL}/nfl/500/car.png`,
    'CHI': `${_a.LOGO_BASE_URL}/nfl/500/chi.png`,
    'CIN': `${_a.LOGO_BASE_URL}/nfl/500/cin.png`,
    'CLE': `${_a.LOGO_BASE_URL}/nfl/500/cle.png`,
    'DAL': `${_a.LOGO_BASE_URL}/nfl/500/dal.png`,
    'DEN': `${_a.LOGO_BASE_URL}/nfl/500/den.png`,
    'DET': `${_a.LOGO_BASE_URL}/nfl/500/det.png`,
    'GB': `${_a.LOGO_BASE_URL}/nfl/500/gb.png`,
    'HOU': `${_a.LOGO_BASE_URL}/nfl/500/hou.png`,
    'IND': `${_a.LOGO_BASE_URL}/nfl/500/ind.png`,
    'JAX': `${_a.LOGO_BASE_URL}/nfl/500/jax.png`,
    'KC': `${_a.LOGO_BASE_URL}/nfl/500/kc.png`,
    'LV': `${_a.LOGO_BASE_URL}/nfl/500/lv.png`,
    'LAC': `${_a.LOGO_BASE_URL}/nfl/500/lac.png`,
    'LAR': `${_a.LOGO_BASE_URL}/nfl/500/lar.png`,
    'MIA': `${_a.LOGO_BASE_URL}/nfl/500/mia.png`,
    'MIN': `${_a.LOGO_BASE_URL}/nfl/500/min.png`,
    'NE': `${_a.LOGO_BASE_URL}/nfl/500/ne.png`,
    'NO': `${_a.LOGO_BASE_URL}/nfl/500/no.png`,
    'NYG': `${_a.LOGO_BASE_URL}/nfl/500/nyg.png`,
    'NYJ': `${_a.LOGO_BASE_URL}/nfl/500/nyj.png`,
    'PHI': `${_a.LOGO_BASE_URL}/nfl/500/phi.png`,
    'PIT': `${_a.LOGO_BASE_URL}/nfl/500/pit.png`,
    'SF': `${_a.LOGO_BASE_URL}/nfl/500/sf.png`,
    'SEA': `${_a.LOGO_BASE_URL}/nfl/500/sea.png`,
    'TB': `${_a.LOGO_BASE_URL}/nfl/500/tb.png`,
    'TEN': `${_a.LOGO_BASE_URL}/nfl/500/ten.png`,
    'WAS': `${_a.LOGO_BASE_URL}/nfl/500/wsh.png`
};
// NBA Team Logos
LogoService.NBA_LOGOS = {
    'ATL': `${_a.LOGO_BASE_URL}/nba/500/atl.png`,
    'BOS': `${_a.LOGO_BASE_URL}/nba/500/bos.png`,
    'BKN': `${_a.LOGO_BASE_URL}/nba/500/bkn.png`,
    'CHA': `${_a.LOGO_BASE_URL}/nba/500/cha.png`,
    'CHI': `${_a.LOGO_BASE_URL}/nba/500/chi.png`,
    'CLE': `${_a.LOGO_BASE_URL}/nba/500/cle.png`,
    'DAL': `${_a.LOGO_BASE_URL}/nba/500/dal.png`,
    'DEN': `${_a.LOGO_BASE_URL}/nba/500/den.png`,
    'DET': `${_a.LOGO_BASE_URL}/nba/500/det.png`,
    'GS': `${_a.LOGO_BASE_URL}/nba/500/gs.png`,
    'HOU': `${_a.LOGO_BASE_URL}/nba/500/hou.png`,
    'IND': `${_a.LOGO_BASE_URL}/nba/500/ind.png`,
    'LAC': `${_a.LOGO_BASE_URL}/nba/500/lac.png`,
    'LAL': `${_a.LOGO_BASE_URL}/nba/500/lal.png`,
    'MEM': `${_a.LOGO_BASE_URL}/nba/500/mem.png`,
    'MIA': `${_a.LOGO_BASE_URL}/nba/500/mia.png`,
    'MIL': `${_a.LOGO_BASE_URL}/nba/500/mil.png`,
    'MIN': `${_a.LOGO_BASE_URL}/nba/500/min.png`,
    'NO': `${_a.LOGO_BASE_URL}/nba/500/no.png`,
    'NY': `${_a.LOGO_BASE_URL}/nba/500/ny.png`,
    'OKC': `${_a.LOGO_BASE_URL}/nba/500/okc.png`,
    'ORL': `${_a.LOGO_BASE_URL}/nba/500/orl.png`,
    'PHI': `${_a.LOGO_BASE_URL}/nba/500/phi.png`,
    'PHX': `${_a.LOGO_BASE_URL}/nba/500/phx.png`,
    'POR': `${_a.LOGO_BASE_URL}/nba/500/por.png`,
    'SAC': `${_a.LOGO_BASE_URL}/nba/500/sac.png`,
    'SA': `${_a.LOGO_BASE_URL}/nba/500/sa.png`,
    'TOR': `${_a.LOGO_BASE_URL}/nba/500/tor.png`,
    'UTAH': `${_a.LOGO_BASE_URL}/nba/500/utah.png`,
    'WAS': `${_a.LOGO_BASE_URL}/nba/500/wsh.png`
};
// MLB Team Logos
LogoService.MLB_LOGOS = {
    'ARI': `${_a.LOGO_BASE_URL}/mlb/500/ari.png`,
    'ATL': `${_a.LOGO_BASE_URL}/mlb/500/atl.png`,
    'BAL': `${_a.LOGO_BASE_URL}/mlb/500/bal.png`,
    'BOS': `${_a.LOGO_BASE_URL}/mlb/500/bos.png`,
    'CHC': `${_a.LOGO_BASE_URL}/mlb/500/chc.png`,
    'CWS': `${_a.LOGO_BASE_URL}/mlb/500/cws.png`,
    'CIN': `${_a.LOGO_BASE_URL}/mlb/500/cin.png`,
    'CLE': `${_a.LOGO_BASE_URL}/mlb/500/cle.png`,
    'COL': `${_a.LOGO_BASE_URL}/mlb/500/col.png`,
    'DET': `${_a.LOGO_BASE_URL}/mlb/500/det.png`,
    'HOU': `${_a.LOGO_BASE_URL}/mlb/500/hou.png`,
    'KC': `${_a.LOGO_BASE_URL}/mlb/500/kc.png`,
    'LAA': `${_a.LOGO_BASE_URL}/mlb/500/laa.png`,
    'LAD': `${_a.LOGO_BASE_URL}/mlb/500/lad.png`,
    'MIA': `${_a.LOGO_BASE_URL}/mlb/500/mia.png`,
    'MIL': `${_a.LOGO_BASE_URL}/mlb/500/mil.png`,
    'MIN': `${_a.LOGO_BASE_URL}/mlb/500/min.png`,
    'NYM': `${_a.LOGO_BASE_URL}/mlb/500/nym.png`,
    'NYY': `${_a.LOGO_BASE_URL}/mlb/500/nyy.png`,
    'OAK': `${_a.LOGO_BASE_URL}/mlb/500/oak.png`,
    'PHI': `${_a.LOGO_BASE_URL}/mlb/500/phi.png`,
    'PIT': `${_a.LOGO_BASE_URL}/mlb/500/pit.png`,
    'SD': `${_a.LOGO_BASE_URL}/mlb/500/sd.png`,
    'SF': `${_a.LOGO_BASE_URL}/mlb/500/sf.png`,
    'SEA': `${_a.LOGO_BASE_URL}/mlb/500/sea.png`,
    'STL': `${_a.LOGO_BASE_URL}/mlb/500/stl.png`,
    'TB': `${_a.LOGO_BASE_URL}/mlb/500/tb.png`,
    'TEX': `${_a.LOGO_BASE_URL}/mlb/500/tex.png`,
    'TOR': `${_a.LOGO_BASE_URL}/mlb/500/tor.png`,
    'WAS': `${_a.LOGO_BASE_URL}/mlb/500/wsh.png`
};
// NHL Team Logos
LogoService.NHL_LOGOS = {
    'ANA': `${_a.LOGO_BASE_URL}/nhl/500/ana.png`,
    'ARI': `${_a.LOGO_BASE_URL}/nhl/500/ari.png`,
    'BOS': `${_a.LOGO_BASE_URL}/nhl/500/bos.png`,
    'BUF': `${_a.LOGO_BASE_URL}/nhl/500/buf.png`,
    'CGY': `${_a.LOGO_BASE_URL}/nhl/500/cgy.png`,
    'CAR': `${_a.LOGO_BASE_URL}/nhl/500/car.png`,
    'CHI': `${_a.LOGO_BASE_URL}/nhl/500/chi.png`,
    'COL': `${_a.LOGO_BASE_URL}/nhl/500/col.png`,
    'CBJ': `${_a.LOGO_BASE_URL}/nhl/500/cbj.png`,
    'DAL': `${_a.LOGO_BASE_URL}/nhl/500/dal.png`,
    'DET': `${_a.LOGO_BASE_URL}/nhl/500/det.png`,
    'EDM': `${_a.LOGO_BASE_URL}/nhl/500/edm.png`,
    'FLA': `${_a.LOGO_BASE_URL}/nhl/500/fla.png`,
    'LA': `${_a.LOGO_BASE_URL}/nhl/500/la.png`,
    'MIN': `${_a.LOGO_BASE_URL}/nhl/500/min.png`,
    'MTL': `${_a.LOGO_BASE_URL}/nhl/500/mtl.png`,
    'NSH': `${_a.LOGO_BASE_URL}/nhl/500/nsh.png`,
    'NJ': `${_a.LOGO_BASE_URL}/nhl/500/nj.png`,
    'NYI': `${_a.LOGO_BASE_URL}/nhl/500/nyi.png`,
    'NYR': `${_a.LOGO_BASE_URL}/nhl/500/nyr.png`,
    'OTT': `${_a.LOGO_BASE_URL}/nhl/500/ott.png`,
    'PHI': `${_a.LOGO_BASE_URL}/nhl/500/phi.png`,
    'PIT': `${_a.LOGO_BASE_URL}/nhl/500/pit.png`,
    'SJ': `${_a.LOGO_BASE_URL}/nhl/500/sj.png`,
    'SEA': `${_a.LOGO_BASE_URL}/nhl/500/sea.png`,
    'STL': `${_a.LOGO_BASE_URL}/nhl/500/stl.png`,
    'TB': `${_a.LOGO_BASE_URL}/nhl/500/tb.png`,
    'TOR': `${_a.LOGO_BASE_URL}/nhl/500/tor.png`,
    'VAN': `${_a.LOGO_BASE_URL}/nhl/500/van.png`,
    'VGK': `${_a.LOGO_BASE_URL}/nhl/500/vgk.png`,
    'WAS': `${_a.LOGO_BASE_URL}/nhl/500/wsh.png`,
    'WPG': `${_a.LOGO_BASE_URL}/nhl/500/wpg.png`
};
// Premier League Team Logos
LogoService.PREMIER_LEAGUE_LOGOS = {
    'ARS': `${_a.LOGO_BASE_URL}/soccer/500/359.png`,
    'AVL': `${_a.LOGO_BASE_URL}/soccer/500/362.png`,
    'BOU': `${_a.LOGO_BASE_URL}/soccer/500/349.png`,
    'BRE': `${_a.LOGO_BASE_URL}/soccer/500/361.png`,
    'BHA': `${_a.LOGO_BASE_URL}/soccer/500/331.png`,
    'BUR': `${_a.LOGO_BASE_URL}/soccer/500/379.png`,
    'CHE': `${_a.LOGO_BASE_URL}/soccer/500/363.png`,
    'CRY': `${_a.LOGO_BASE_URL}/soccer/500/354.png`,
    'EVE': `${_a.LOGO_BASE_URL}/soccer/500/368.png`,
    'FUL': `${_a.LOGO_BASE_URL}/soccer/500/370.png`,
    'LEI': `${_a.LOGO_BASE_URL}/soccer/500/375.png`,
    'LIV': `${_a.LOGO_BASE_URL}/soccer/500/364.png`,
    'MAN': `${_a.LOGO_BASE_URL}/soccer/500/360.png`,
    'MCI': `${_a.LOGO_BASE_URL}/soccer/500/382.png`,
    'MNC': `${_a.LOGO_BASE_URL}/soccer/500/382.png`,
    'MUN': `${_a.LOGO_BASE_URL}/soccer/500/360.png`,
    'NEW': `${_a.LOGO_BASE_URL}/soccer/500/361.png`,
    'NFO': `${_a.LOGO_BASE_URL}/soccer/500/351.png`,
    'SHU': `${_a.LOGO_BASE_URL}/soccer/500/376.png`,
    'TOT': `${_a.LOGO_BASE_URL}/soccer/500/367.png`,
    'WHU': `${_a.LOGO_BASE_URL}/soccer/500/379.png`,
    'WOL': `${_a.LOGO_BASE_URL}/soccer/500/380.png` // Wolves
};
//# sourceMappingURL=logoService.js.map