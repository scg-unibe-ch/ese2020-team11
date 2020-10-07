import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { Sequelize} from 'sequelize';

export function registerVerification(loginRequestee: LoginRequest): Promise<LoginRequest>  {
    const { Op } = require('sequelize');

    if (User.findOne({
        where: {
            [Op.or]: [{ userName: loginRequestee.userName }, { userMail: loginRequestee.userName }]
        }
    })) {
        return Promise.resolve(loginRequestee);
    } else {
        return Promise.reject({ message: 'Must be registered before attempting to log in' });
    }
}
