import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { UserService } from '../services/user.service';
import { Sequelize } from 'sequelize';

export function checkRegistration(user: UserAttributes): Promise<UserAttributes> {

    if (user.userName == null || User.findOne({
        where: {
            userName: user.userName
        }
    })) {
        return Promise.reject({message: 'invalid user name'});
    } else if (user.userMail == null || User.findOne({
        where: {
            userMail: user.userMail
        }
    })) {
        return Promise.reject({ message: 'invalid user mail' });
    } else if (!this.UserService.passwordRequiermentCheck(user.password)) {
        return Promise.reject();
    } else if (user.userFirstName == null) {
        return Promise.reject({ message: 'invalid first name' });
    } else if (user.userLastName == null) {
        return Promise.reject({ message: 'invalid last name' });
    } else {
        return Promise.resolve(user);
    }
}


