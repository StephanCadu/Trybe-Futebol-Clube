import ITeam from '../interfaces/ITeam';
import TeamsModel from '../database/models/TeamsModel';
import ErrorHandler from '../utils/ErrorHandler';

export default class TeamsService {
  public static async getTeams(): Promise<ITeam[]> {
    const teams = await TeamsModel.findAll();
    return teams;
  }

  public static async getTeamById(id: number): Promise<ITeam> {
    const team = await TeamsModel.findByPk(id);

    if (!team) throw new ErrorHandler('Team not found', 404);

    return team;
  }
}
