import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = express.Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.getHomeLeaderboard);

leaderboardRouter.get('/away', leaderboardController.getAwayLeaderboard);

leaderboardRouter.get('/', leaderboardController.getLeaderboard);

export default leaderboardRouter;
