import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public getHomeLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const leaderboard = await LeaderboardService.getLeaderboard(true);
    res.status(200).json(leaderboard);
  };

  public getAwayLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const leaderboard = await LeaderboardService.getLeaderboard(false);
    res.status(200).json(leaderboard);
  };

  public getLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const leaderboard = await LeaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  };
}
