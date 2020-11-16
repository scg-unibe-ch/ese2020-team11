import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface BoughtProductAttributes {
    productId: number;
    userId: number;
    productType: string;
    productTitle: string;
    productPrice: number;
    productDescription: string;
    productLocation: string;
    productToLend: boolean;
    productAvailable: boolean;
    deliveryPossible: boolean;
}

export interface UserCreationAttributes extends Optional<BoughtProductAttributes, 'productId'> { }

export class BoughtProduct extends Model<BoughtProductAttributes, UserCreationAttributes> implements BoughtProductAttributes {
    productId!: number;
    userId!: number;
    productType!: string;
    productTitle!: string;
    productPrice!: number;
    productDescription!: string;
    productLocation!: string;
    productToLend!: boolean;
    deliveryPossible!: boolean;
    productAvailable: boolean;


    public static initialize(sequelize: Sequelize) {
        BoughtProduct.init(
            {
                productId:
                {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },

                userId: {
                    type: DataTypes.INTEGER,
                },

                productType: {
                    type: DataTypes.STRING,
                },

                productTitle:
                {
                    type: DataTypes.STRING,
                },

                productPrice:
                {
                    type: DataTypes.DOUBLE,
                },

                productDescription:
                {
                    type: DataTypes.STRING,
                },

                productLocation:
                {
                    type: DataTypes.STRING,
                },

                productToLend:
                {
                    type: DataTypes.BOOLEAN,
                },

                deliveryPossible:
                {
                    type: DataTypes.BOOLEAN,
                },

                productAvailable:
                {
                    type: DataTypes.BOOLEAN,
                    defaultValue: 0
                },
            },
            {
                sequelize,
                tableName: 'boughtProducts'
            });
    }

}
