import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkRegistration } from '../middlewares/checkRegistration';
import { registerVerification } from '../middlewares/checkLogin';
import { verifyToken } from '../middlewares/checkAuth';
import {Op} from 'sequelize';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        checkRegistration(user);
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        registerVerification(loginRequestee);
        return User.findOne({
            where: {
                userName: loginRequestee.userName
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

    public getAll(): Promise<User[]> {
        return User.findAll();
    }


    public passwordRequiermentCheck(password: string): boolean {
        if (password.length < 7) {
            alert('Password shorter than 7 characters');
            return false;
        } else if (isNaN(+password)) {
            alert('Only numbers in password, please use letters and special characters as well');
            return false;
        } else if (!this.hasNumber(password)) {
            alert('No number in password');
            return false;
        } else if (!this.hasSpecialChar(password)) {
            alert('No special characters in password');
            return false;
        } else if (password === password.toLowerCase()) {
            alert('Only small letters in password');
            return false;
        } else if (password === password.toUpperCase()) {
            alert('Only capital letters in password');
            return false;
        } else {
            return true;
        }

    }

    // check if the string contains a number
    private hasNumber(myString: string) {
        return /\d/.test(myString);
    }

    // checks if the string as a special char
    private hasSpecialChar(myString: string) {
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (format.test(myString)) {
            return true;
        } else {
            return false;
        }
    }
}


export function buy() {
    if (verifyToken) {

    } else {
        return Promise.reject({ message: 'must be loged in to buy goods' });
    }
}

export function sell() {
    if (verifyToken) {

    } else {
        return Promise.reject({ message: 'must be loged in to sell goods' });
    }
}
