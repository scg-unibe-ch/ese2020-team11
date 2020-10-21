import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
	productId: number;
	productType: string;
	productTitle: string;
	productPrice: number;
	productDescription: string;
	productLocation: string;
	productToLend: boolean;
	productAvailable: boolean;
	deliveryPossible: boolean;

}

export interface UserCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, UserCreationAttributes> implements ProductAttributes {
	productId!: number;
	productType!: string;
	productTitle!: string;
	productPrice!: number;
	productDescription!: string;
	productLocation!: string;
	productToLend!: boolean;
	productAvailable!: boolean;
	deliveryPossible!: boolean;


    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productTitle: {
                type: DataTypes.STRING,
                allowNull: false
            },
           productPrice: {
                type: DataTypes.INTEGER
            },
           productDescription: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productLocation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productToLend: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
            productAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
            deliveryPossible: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }

}
