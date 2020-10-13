import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
    userId: number;
    userMail: string;
    userName: string;
    password: string;
    userFirstName: string;
    userLastName: string;
    userGender: string;
    userTelephone: string;
    userStreet: string;
    userStreetNumber: string;
    userPinCode: number;
    userCity: string;
    userCountry: string;
    isAdmin: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userMail!: string;
    userName!: string;
    password!: string;
    userFirstName!: string;
    userLastName!: string;
    userGender: string;
    userTelephone: string;
    userStreet: string;
    userStreetNumber: string;
    userPinCode: number;
    userCity: string;
    userCountry: string;
    isAdmin!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userMail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userFirstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userLastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userGender: {
                type: DataTypes.STRING
            },
            userTelephone: {
                type: DataTypes.STRING
            },
            userStreet: {
                type: DataTypes.STRING
            },
            userStreetNumber: {
                type: DataTypes.STRING
            },
            userPinCode: {
                type: DataTypes.INTEGER
            },
            userCity: {
                type: DataTypes.STRING
            },
            userCountry: {
                type: DataTypes.STRING
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }

}
