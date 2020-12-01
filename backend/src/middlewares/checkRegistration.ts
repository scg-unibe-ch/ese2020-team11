import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { UserService } from '../services/user.service';
import { Sequelize } from 'sequelize';


export function checkRegistration(username: string) {
        User.findOne({
            where: {
                userName: username
            }
        }).then(found => {
            if (found != null) {
                return true;
            } else {
                return false;
            }
    });
}
    /* userExists = false;

    User.findOne({
        where: { userName: user.userName }
    }).then(userExists = true);

    if (userExists) {
        return Promise.reject();
    } else {
        return Promise.resolve(user);
    }
*/


/*    {
        ;
    } else {
        return Promise.resolve(user);
    }*/


