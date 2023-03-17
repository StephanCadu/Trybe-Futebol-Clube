import IScore from '../interfaces/IScore';
import TeamsService from './TeamsService';
import MatchesService from './MatchesService';
import IMatch from '../interfaces/IMatch';

type teamResults = { wins: number, loses: number, draws: number };

export default class LeaderboardService {
  private static getTeamMatches = (matches: IMatch[], teamId: number, isHome?: boolean)
  : IMatch[] => matches.filter(({ homeTeamId, awayTeamId }) => {
    if (isHome === undefined) return homeTeamId === teamId || awayTeamId === teamId;
    if (isHome) return homeTeamId === teamId;
    return awayTeamId === teamId;
  });

  private static getTeamGoals = (matches: IMatch[], teamId: number, favor: boolean)
  : number => matches.reduce((acc, { homeTeamId, homeTeamGoals, awayTeamGoals }) => {
    const isHomeMatch: boolean = favor ? homeTeamId === teamId : homeTeamId !== teamId;
    return isHomeMatch ? acc + homeTeamGoals : acc + awayTeamGoals;
  }, 0);

  private static getResults = (matches: IMatch[], teamId: number)
  : teamResults => matches.reduce((acc, cur) => {
    const isHomeMatch: boolean = cur.homeTeamId === teamId;
    const result = cur.homeTeamGoals - cur.awayTeamGoals;

    if (result === 0) acc.draws += 1;
    if ((result > 0 && isHomeMatch) || (result < 0 && !isHomeMatch)) acc.wins += 1;
    if ((result < 0 && isHomeMatch) || (result > 0 && !isHomeMatch)) acc.loses += 1;

    return acc;
  }, { wins: 0, loses: 0, draws: 0 });

  private static getTeamScore = (matches: IMatch[], teamId: number, isHome?: boolean)
  : Omit<IScore, 'name'> => {
    const teamMatches = this.getTeamMatches(matches, teamId, isHome);
    const results = this.getResults(teamMatches, teamId);
    const total = (results.wins * 3) + results.draws;
    const favor = this.getTeamGoals(teamMatches, teamId, true);
    const own = this.getTeamGoals(teamMatches, teamId, false);

    return {
      totalPoints: total,
      totalGames: teamMatches.length,
      totalVictories: results.wins,
      totalDraws: results.draws,
      totalLosses: results.loses,
      goalsFavor: favor,
      goalsOwn: own,
      goalsBalance: favor - own,
      efficiency: +((total / (teamMatches.length * 3)) * 100).toFixed(2),
    };
  };

  private static orderLeaderboard = (board: IScore[]): IScore[] => board
    .sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.totalVictories - a.totalVictories
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

  public static getLeaderboard = async (isHome?: boolean): Promise<IScore[]> => {
    const teams = await TeamsService.getTeams();
    const matches = (await MatchesService.getMatches()).filter(({ inProgress }) => !inProgress);

    const leaderboard = teams.map(({ teamName, id }) => ({
      name: teamName,
      ...this.getTeamScore(matches, id, isHome),
    }));

    return this.orderLeaderboard(leaderboard);
  };
}
