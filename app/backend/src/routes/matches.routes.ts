import * as express from 'express';
import MatchesController from '../controllers/MatchesController';
import Token from '../utils/TokenHandler';

const matchesRouter = express.Router();

const matchesController = new MatchesController();
const tokenHandler = new Token();

matchesRouter.get('/', matchesController.getMatches);

matchesRouter.post('/', tokenHandler.validateJWT, matchesController.saveMatch);

matchesRouter.patch('/:id/finish', matchesController.finishMatch);

matchesRouter.patch('/:id', matchesController.editMatch);

export default matchesRouter;
