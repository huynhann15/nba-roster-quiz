const NBA_API_BASE = 'https://stats.nba.com/stats';

const headers = {
  'User-Agent': 'Mozilla/5.0',
  'Referer': 'https://stats.nba.com/',
  'Origin': 'https://stats.nba.com',
  'Accept': 'application/json'
};

export const NBA_TEAMS = [
  { teamId: 1610612737, abbreviation: 'ATL', teamName: 'Atlanta Hawks' },
  { teamId: 1610612738, abbreviation: 'BOS', teamName: 'Boston Celtics' },
  { teamId: 1610612751, abbreviation: 'BKN', teamName: 'Brooklyn Nets' },
  { teamId: 1610612766, abbreviation: 'CHA', teamName: 'Charlotte Hornets' },
  { teamId: 1610612741, abbreviation: 'CHI', teamName: 'Chicago Bulls' },
  { teamId: 1610612739, abbreviation: 'CLE', teamName: 'Cleveland Cavaliers' },
  { teamId: 1610612742, abbreviation: 'DAL', teamName: 'Dallas Mavericks' },
  { teamId: 1610612743, abbreviation: 'DEN', teamName: 'Denver Nuggets' },
  { teamId: 1610612765, abbreviation: 'DET', teamName: 'Detroit Pistons' },
  { teamId: 1610612744, abbreviation: 'GSW', teamName: 'Golden State Warriors' },
  { teamId: 1610612745, abbreviation: 'HOU', teamName: 'Houston Rockets' },
  { teamId: 1610612754, abbreviation: 'IND', teamName: 'Indiana Pacers' },
  { teamId: 1610612746, abbreviation: 'LAC', teamName: 'LA Clippers' },
  { teamId: 1610612747, abbreviation: 'LAL', teamName: 'Los Angeles Lakers' },
  { teamId: 1610612763, abbreviation: 'MEM', teamName: 'Memphis Grizzlies' },
  { teamId: 1610612748, abbreviation: 'MIA', teamName: 'Miami Heat' },
  { teamId: 1610612749, abbreviation: 'MIL', teamName: 'Milwaukee Bucks' },
  { teamId: 1610612750, abbreviation: 'MIN', teamName: 'Minnesota Timberwolves' },
  { teamId: 1610612740, abbreviation: 'NOP', teamName: 'New Orleans Pelicans' },
  { teamId: 1610612752, abbreviation: 'NYK', teamName: 'New York Knicks' },
  { teamId: 1610612760, abbreviation: 'OKC', teamName: 'Oklahoma City Thunder' },
  { teamId: 1610612753, abbreviation: 'ORL', teamName: 'Orlando Magic' },
  { teamId: 1610612755, abbreviation: 'PHI', teamName: 'Philadelphia 76ers' },
  { teamId: 1610612756, abbreviation: 'PHX', teamName: 'Phoenix Suns' },
  { teamId: 1610612757, abbreviation: 'POR', teamName: 'Portland Trail Blazers' },
  { teamId: 1610612758, abbreviation: 'SAC', teamName: 'Sacramento Kings' },
  { teamId: 1610612759, abbreviation: 'SAS', teamName: 'San Antonio Spurs' },
  { teamId: 1610612761, abbreviation: 'TOR', teamName: 'Toronto Raptors' },
  { teamId: 1610612762, abbreviation: 'UTA', teamName: 'Utah Jazz' },
  { teamId: 1610612764, abbreviation: 'WAS', teamName: 'Washington Wizards' }
];

export const fetchTeamRoster = async (teamId) => {
  try {
    const response = await fetch(
      `${NBA_API_BASE}/commonteamroster?Season=2024-25&TeamID=${teamId}`,
      { headers }
    );
    const data = await response.json();
    
    // Transform API response to match your data structure
    const players = data.resultSets[0].rowSet.map(player => ({
      playerName: player[3], 
      playerId: player[14] 
    }));
    
    return players;
  } catch (error) {
    console.error('Error fetching roster:', error);
    return [];
  }
};