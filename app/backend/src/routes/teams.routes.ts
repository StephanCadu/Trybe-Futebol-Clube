import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = express.Router();

const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getTeams);

teamsRouter.get('/:id', teamsController.getTeamById);

export default teamsRouter;
