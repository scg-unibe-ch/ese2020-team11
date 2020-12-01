import { User } from './user.model';
import { Product } from './product.model';
import {
    Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin,
    HasManyHasAssociationMixin, Association, Sequelize, DataTypes
} from 'sequelize';


export interface UserFavoritesAttributes {
    userId: number;
    productId: number;
}

// export interface UserFavoritesCreationAttributes extends Optional<'userId', 'productId'> { }

export class UserFavorites extends Model<UserFavoritesAttributes> { // , UserFavoritesCreationAttributes> implements UserFavorites {
// export class UserFavorites extends Model<UserFavorites> implements UserFavorites {
    userId!: number;
    productId!: number;


    public static initialize(sequelize: Sequelize) {
        UserFavorites.init({
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            productId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
        },
            {
                sequelize,
                tableName: 'userFavorites'
            }
        );
    }

    public static createAssociations() {
        UserFavorites.belongsTo(Product, {
            foreignKey: 'productId'
        });
        UserFavorites.belongsTo(User, {
            foreignKey: 'userId'
        });
    }

    /*
    public static createAssociations() {
        UserFavorites.belongsTo(Product, {
            targetKey: 'productId',
            as: 'userFavorites',
            onDelete: 'cascade',
            foreignKey: 'productId'
        });

        UserFavorites.belongsTo(User, {
            targetKey: 'userId',
            as: 'userFavorites',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
    */
}
