import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkRegistration } from '../middlewares/checkRegistration';
import { registerVerification } from '../middlewares/checkLogin';
import { verifyToken } from '../middlewares/checkAuth';
import { Op } from 'sequelize';



export function login(loginRequestee: LoginRequest): Promise < User | LoginResponse > {
    const secret = process.env.JWT_SECRET;
    registerVerification(loginRequestee);
        return User.findOne({
            where: {
                [Op.and]: [{ userName: loginRequestee.userName }, { isAdmin: 1 }]
        }
    })
        .then(user => {
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {
                // compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
}
