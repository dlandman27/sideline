"use strict";
// Team colors service
// Maps team abbreviations to primary and secondary colors
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamColorService = void 0;
class TeamColorService {
    static getTeamColors(teamAbbreviation, sport) {
        const abbreviation = teamAbbreviation.toUpperCase();
        switch (sport) {
            case 'nfl':
                return this.NFL_COLORS[abbreviation];
            case 'nba':
                return this.NBA_COLORS[abbreviation];
            case 'mlb':
                return this.MLB_COLORS[abbreviation];
            case 'nhl':
                return this.NHL_COLORS[abbreviation];
            case 'premierLeague':
                return this.PREMIER_LEAGUE_COLORS[abbreviation];
            default:
                return undefined;
        }
    }
    static getDefaultColors() {
        return {
            primary: '#666666',
            secondary: '#CCCCCC',
            text: '#FFFFFF'
        };
    }
}
exports.TeamColorService = TeamColorService;
// NFL Team Colors
TeamColorService.NFL_COLORS = {
    'ARI': { primary: '#97233F', secondary: '#000000', text: '#FFFFFF' },
    'ATL': { primary: '#A71930', secondary: '#000000', text: '#FFFFFF' },
    'BAL': { primary: '#241773', secondary: '#000000', text: '#FFFFFF' },
    'BUF': { primary: '#00338D', secondary: '#C60C30', text: '#FFFFFF' },
    'CAR': { primary: '#0085CA', secondary: '#000000', text: '#FFFFFF' },
    'CHI': { primary: '#0B162A', secondary: '#C83803', text: '#FFFFFF' },
    'CIN': { primary: '#FB4F14', secondary: '#000000', text: '#FFFFFF' },
    'CLE': { primary: '#311D00', secondary: '#FF3C00', text: '#FFFFFF' },
    'DAL': { primary: '#003594', secondary: '#041E42', text: '#FFFFFF' },
    'DEN': { primary: '#FB4F14', secondary: '#002244', text: '#FFFFFF' },
    'DET': { primary: '#0076B6', secondary: '#B0B7BC', text: '#FFFFFF' },
    'GB': { primary: '#203731', secondary: '#FFB612', text: '#FFFFFF' },
    'HOU': { primary: '#03202F', secondary: '#A71930', text: '#FFFFFF' },
    'IND': { primary: '#002C5F', secondary: '#A2AAAD', text: '#FFFFFF' },
    'JAX': { primary: '#006778', secondary: '#9F792C', text: '#FFFFFF' },
    'KC': { primary: '#E31837', secondary: '#FFB81C', text: '#FFFFFF' },
    'LV': { primary: '#000000', secondary: '#A5ACAF', text: '#FFFFFF' },
    'LAC': { primary: '#0080C6', secondary: '#FFC20E', text: '#FFFFFF' },
    'LAR': { primary: '#003594', secondary: '#FFA300', text: '#FFFFFF' },
    'MIA': { primary: '#008E97', secondary: '#FC4C02', text: '#FFFFFF' },
    'MIN': { primary: '#4F2683', secondary: '#FFC62F', text: '#FFFFFF' },
    'NE': { primary: '#002244', secondary: '#C60C30', text: '#FFFFFF' },
    'NO': { primary: '#D3BC8D', secondary: '#000000', text: '#000000' },
    'NYG': { primary: '#0B2265', secondary: '#A71930', text: '#FFFFFF' },
    'NYJ': { primary: '#125740', secondary: '#000000', text: '#FFFFFF' },
    'PHI': { primary: '#004C54', secondary: '#A5ACAF', text: '#FFFFFF' },
    'PIT': { primary: '#FFB612', secondary: '#000000', text: '#000000' },
    'SF': { primary: '#AA0000', secondary: '#B3995D', text: '#FFFFFF' },
    'SEA': { primary: '#002244', secondary: '#69BE28', text: '#FFFFFF' },
    'TB': { primary: '#D50A0A', secondary: '#FF7900', text: '#FFFFFF' },
    'TEN': { primary: '#0C2340', secondary: '#4B92DB', text: '#FFFFFF' },
    'WAS': { primary: '#5A1414', secondary: '#FFB612', text: '#FFFFFF' }
};
// NBA Team Colors
TeamColorService.NBA_COLORS = {
    'ATL': { primary: '#E03A3E', secondary: '#C1D32F', text: '#FFFFFF' },
    'BOS': { primary: '#007A33', secondary: '#BA9653', text: '#FFFFFF' },
    'BKN': { primary: '#000000', secondary: '#FFFFFF', text: '#FFFFFF' },
    'CHA': { primary: '#1D1160', secondary: '#00788C', text: '#FFFFFF' },
    'CHI': { primary: '#CE1141', secondary: '#000000', text: '#FFFFFF' },
    'CLE': { primary: '#860038', secondary: '#FDBB30', text: '#FFFFFF' },
    'DAL': { primary: '#00538C', secondary: '#002B5E', text: '#FFFFFF' },
    'DEN': { primary: '#0E2240', secondary: '#FEC524', text: '#FFFFFF' },
    'DET': { primary: '#C8102E', secondary: '#1D42BA', text: '#FFFFFF' },
    'GS': { primary: '#1D428A', secondary: '#FFC72C', text: '#FFFFFF' },
    'HOU': { primary: '#CE1141', secondary: '#000000', text: '#FFFFFF' },
    'IND': { primary: '#002D62', secondary: '#FDBB30', text: '#FFFFFF' },
    'LAC': { primary: '#C8102E', secondary: '#1D428A', text: '#FFFFFF' },
    'LAL': { primary: '#552583', secondary: '#FDB927', text: '#FFFFFF' },
    'MEM': { primary: '#5D76A9', secondary: '#12173F', text: '#FFFFFF' },
    'MIA': { primary: '#98002E', secondary: '#F9A01B', text: '#FFFFFF' },
    'MIL': { primary: '#00471B', secondary: '#EEE1C6', text: '#FFFFFF' },
    'MIN': { primary: '#0C2340', secondary: '#236192', text: '#FFFFFF' },
    'NO': { primary: '#0C2340', secondary: '#C8102E', text: '#FFFFFF' },
    'NY': { primary: '#006BB6', secondary: '#F58426', text: '#FFFFFF' },
    'OKC': { primary: '#007AC1', secondary: '#EF3B24', text: '#FFFFFF' },
    'ORL': { primary: '#0077C0', secondary: '#C4CED4', text: '#FFFFFF' },
    'PHI': { primary: '#006BB6', secondary: '#ED174C', text: '#FFFFFF' },
    'PHX': { primary: '#1D1160', secondary: '#E56020', text: '#FFFFFF' },
    'POR': { primary: '#E03A3E', secondary: '#000000', text: '#FFFFFF' },
    'SAC': { primary: '#5A2D81', secondary: '#63727A', text: '#FFFFFF' },
    'SA': { primary: '#C4CED4', secondary: '#000000', text: '#000000' },
    'TOR': { primary: '#CE1141', secondary: '#000000', text: '#FFFFFF' },
    'UTAH': { primary: '#002B5C', secondary: '#F9A01B', text: '#FFFFFF' },
    'WAS': { primary: '#002B5C', secondary: '#E31837', text: '#FFFFFF' }
};
// MLB Team Colors
TeamColorService.MLB_COLORS = {
    'ARI': { primary: '#A71930', secondary: '#E3D4AD', text: '#FFFFFF' },
    'ATL': { primary: '#CE1141', secondary: '#13274F', text: '#FFFFFF' },
    'BAL': { primary: '#DF4601', secondary: '#000000', text: '#FFFFFF' },
    'BOS': { primary: '#BD3039', secondary: '#0C2340', text: '#FFFFFF' },
    'CHC': { primary: '#0E3386', secondary: '#CC3433', text: '#FFFFFF' },
    'CWS': { primary: '#27251F', secondary: '#C4CED4', text: '#FFFFFF' },
    'CIN': { primary: '#C6011F', secondary: '#000000', text: '#FFFFFF' },
    'CLE': { primary: '#E31937', secondary: '#0C2340', text: '#FFFFFF' },
    'COL': { primary: '#33006F', secondary: '#C4CED4', text: '#FFFFFF' },
    'DET': { primary: '#0C2340', secondary: '#FA4616', text: '#FFFFFF' },
    'HOU': { primary: '#EB6E1F', secondary: '#002D62', text: '#FFFFFF' },
    'KC': { primary: '#BD9B60', secondary: '#004687', text: '#FFFFFF' },
    'LAA': { primary: '#BA0021', secondary: '#003263', text: '#FFFFFF' },
    'LAD': { primary: '#005A9C', secondary: '#EF3E42', text: '#FFFFFF' },
    'MIA': { primary: '#00A3E0', secondary: '#EF3340', text: '#FFFFFF' },
    'MIL': { primary: '#FFC52F', secondary: '#12284B', text: '#000000' },
    'MIN': { primary: '#002B5C', secondary: '#D31145', text: '#FFFFFF' },
    'NYM': { primary: '#002D72', secondary: '#FF5910', text: '#FFFFFF' },
    'NYY': { primary: '#132448', secondary: '#C4CED4', text: '#FFFFFF' },
    'OAK': { primary: '#003831', secondary: '#EFB21E', text: '#FFFFFF' },
    'PHI': { primary: '#E81828', secondary: '#002D72', text: '#FFFFFF' },
    'PIT': { primary: '#FDB827', secondary: '#000000', text: '#000000' },
    'SD': { primary: '#2F241D', secondary: '#FFC425', text: '#FFFFFF' },
    'SF': { primary: '#FD5A1E', secondary: '#27251F', text: '#FFFFFF' },
    'SEA': { primary: '#0C2C56', secondary: '#005C5C', text: '#FFFFFF' },
    'STL': { primary: '#C41E3A', secondary: '#0C2340', text: '#FFFFFF' },
    'TB': { primary: '#092C5C', secondary: '#8FBCE6', text: '#FFFFFF' },
    'TEX': { primary: '#003278', secondary: '#C0111F', text: '#FFFFFF' },
    'TOR': { primary: '#134A8E', secondary: '#1D2D5C', text: '#FFFFFF' },
    'WAS': { primary: '#AB0003', secondary: '#14225A', text: '#FFFFFF' }
};
// NHL Team Colors
TeamColorService.NHL_COLORS = {
    'ANA': { primary: '#F47A20', secondary: '#B9975B', text: '#FFFFFF' },
    'ARI': { primary: '#8C2633', secondary: '#E2D6B5', text: '#FFFFFF' },
    'BOS': { primary: '#FFB81C', secondary: '#000000', text: '#000000' },
    'BUF': { primary: '#002654', secondary: '#FCB514', text: '#FFFFFF' },
    'CGY': { primary: '#C8102E', secondary: '#F1BE48', text: '#FFFFFF' },
    'CAR': { primary: '#CC0000', secondary: '#000000', text: '#FFFFFF' },
    'CHI': { primary: '#CF0A2C', secondary: '#000000', text: '#FFFFFF' },
    'COL': { primary: '#6F263D', secondary: '#236192', text: '#FFFFFF' },
    'CBJ': { primary: '#002654', secondary: '#CE1126', text: '#FFFFFF' },
    'DAL': { primary: '#006847', secondary: '#111111', text: '#FFFFFF' },
    'DET': { primary: '#CE1126', secondary: '#FFFFFF', text: '#FFFFFF' },
    'EDM': { primary: '#041E42', secondary: '#FF4C00', text: '#FFFFFF' },
    'FLA': { primary: '#C8102E', secondary: '#041E42', text: '#FFFFFF' },
    'LA': { primary: '#111111', secondary: '#A2AAAD', text: '#FFFFFF' },
    'MIN': { primary: '#154734', secondary: '#DDCBA4', text: '#FFFFFF' },
    'MTL': { primary: '#AF1E2D', secondary: '#192168', text: '#FFFFFF' },
    'NSH': { primary: '#FFB81C', secondary: '#041E42', text: '#000000' },
    'NJ': { primary: '#CE1126', secondary: '#000000', text: '#FFFFFF' },
    'NYI': { primary: '#00539B', secondary: '#F47D30', text: '#FFFFFF' },
    'NYR': { primary: '#0038A8', secondary: '#CE1126', text: '#FFFFFF' },
    'OTT': { primary: '#C52032', secondary: '#000000', text: '#FFFFFF' },
    'PHI': { primary: '#F74902', secondary: '#000000', text: '#FFFFFF' },
    'PIT': { primary: '#000000', secondary: '#CFC493', text: '#FFFFFF' },
    'SJ': { primary: '#006D75', secondary: '#000000', text: '#FFFFFF' },
    'SEA': { primary: '#001628', secondary: '#99D9EA', text: '#FFFFFF' },
    'STL': { primary: '#002F87', secondary: '#FCB514', text: '#FFFFFF' },
    'TB': { primary: '#002868', secondary: '#FFFFFF', text: '#FFFFFF' },
    'TOR': { primary: '#003E7E', secondary: '#FFFFFF', text: '#FFFFFF' },
    'VAN': { primary: '#001F5B', secondary: '#00843D', text: '#FFFFFF' },
    'VGK': { primary: '#B4975A', secondary: '#333F42', text: '#FFFFFF' },
    'WAS': { primary: '#C8102E', secondary: '#041E42', text: '#FFFFFF' },
    'WPG': { primary: '#041E42', secondary: '#004C97', text: '#FFFFFF' }
};
// Premier League Team Colors
TeamColorService.PREMIER_LEAGUE_COLORS = {
    'ARS': { primary: '#EF0107', secondary: '#023474', text: '#FFFFFF' },
    'AVL': { primary: '#95BFE5', secondary: '#670E36', text: '#000000' },
    'BOU': { primary: '#DA020E', secondary: '#000000', text: '#FFFFFF' },
    'BRE': { primary: '#D20000', secondary: '#FFFFFF', text: '#FFFFFF' },
    'BHA': { primary: '#0057B8', secondary: '#FFFFFF', text: '#FFFFFF' },
    'BUR': { primary: '#6C1D45', secondary: '#99D6EA', text: '#FFFFFF' },
    'CHE': { primary: '#034694', secondary: '#FFFFFF', text: '#FFFFFF' },
    'CRY': { primary: '#1B458F', secondary: '#C4122E', text: '#FFFFFF' },
    'EVE': { primary: '#003399', secondary: '#FFFFFF', text: '#FFFFFF' },
    'FUL': { primary: '#000000', secondary: '#FFFFFF', text: '#FFFFFF' },
    'LEI': { primary: '#003090', secondary: '#FDBE11', text: '#FFFFFF' },
    'LIV': { primary: '#C8102E', secondary: '#FFFFFF', text: '#FFFFFF' },
    'MAN': { primary: '#DA020E', secondary: '#FBE122', text: '#FFFFFF' },
    'MCI': { primary: '#6CABDD', secondary: '#FFFFFF', text: '#000000' },
    'MNC': { primary: '#6CABDD', secondary: '#FFFFFF', text: '#000000' },
    'MUN': { primary: '#DA020E', secondary: '#FBE122', text: '#FFFFFF' },
    'NEW': { primary: '#241F20', secondary: '#FFFFFF', text: '#FFFFFF' },
    'NFO': { primary: '#DD0000', secondary: '#FFFFFF', text: '#FFFFFF' },
    'SHU': { primary: '#EE2737', secondary: '#FFFFFF', text: '#FFFFFF' },
    'TOT': { primary: '#132257', secondary: '#FFFFFF', text: '#FFFFFF' },
    'WHU': { primary: '#7A263A', secondary: '#1BB1E7', text: '#FFFFFF' },
    'WOL': { primary: '#FDB913', secondary: '#231F20', text: '#000000' } // Wolves
};
//# sourceMappingURL=teamColors.js.map