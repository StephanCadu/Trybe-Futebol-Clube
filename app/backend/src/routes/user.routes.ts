import * as express from 'express';
import UserController from '../controllers/UserController';
import validateUser from '../middlewares/validateUser';
import Token from '../utils/TokenHandler';

const tokenHandler = new Token();

const userController = new UserController();

const userRouter = express.Router();

userRouter.post('/', validateUser, userController.login);

userRouter.get('/validate', tokenHandler.validateJWT, userController.getRole);

export default userRouter;
