import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import Token from '../utils/TokenHandler';
import UserModel from '../database/models/UserModel';
import ErrorHandler from '../utils/ErrorHandler';

const tokenHandler = new Token();

export default class UserService {
  private static validateUser = async (user: IUser): Promise<void> => {
    const userFound = await UserModel.findOne({ where: { email: user.email } });

    if (!userFound) throw new ErrorHandler('Incorrect email or password', 401);

    const rightPass = bcrypt.compareSync(user.password, userFound.password);

    if (!rightPass) throw new ErrorHandler('Incorrect email or password', 401);
  };

  public static async login(user: IUser): Promise<string> {
    await this.validateUser(user);

    const userFound = await UserModel.findOne({ where: { email: user.email } });

    return tokenHandler.createToken(userFound as IUser);
  }
}
