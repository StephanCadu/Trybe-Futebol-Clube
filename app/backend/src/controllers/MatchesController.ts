import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public getMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;

    const matches = await MatchesService.getMatches();

    const filteredMatches = matches
      .filter((match) => inProgress === undefined || match.inProgress.toString() === inProgress);

    res.status(200).json(filteredMatches);
  };

  public saveMatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user, ...matchInfo } = req.body;
      const newMatch = await MatchesService.saveMatch(matchInfo);
      res.status(201).json(newMatch);
    } catch (e) {
      next(e);
    }
  };

  public finishMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;

    await MatchesService.finishMatch(+id);

    return res.status(200).json({ message: 'Finished' });
  };

  public editMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;
    const matchInfo = req.body;

    await MatchesService.editMatch(+id, matchInfo);

    return res.status(200).json({ message: 'Edited' });
  };
}
