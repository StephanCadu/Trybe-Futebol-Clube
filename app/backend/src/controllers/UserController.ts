import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body;
      const token = await UserService.login(user);
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };

  public getRole = (req: Request, res: Response): void => {
    const { user: { dataValues: { role } } } = req.body;
    res.status(200).json({ role });
  };
}
