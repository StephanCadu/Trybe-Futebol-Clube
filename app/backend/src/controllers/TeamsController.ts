import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  public getTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = await TeamsService.getTeams();
    res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const team = await TeamsService.getTeamById(+id);

      res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  };
}
