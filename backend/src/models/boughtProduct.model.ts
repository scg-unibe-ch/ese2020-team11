import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface BoughtProductAttributes {
    boughtProductId: number;
    productId: number;
    userId: number;
    productType: string;
    productTitle: string;
    productPrice: number;
    productDescription: string;
    productLocation: string;
    productToLend: boolean;
    deliveryPossible: boolean;
}

export interface UserCreationAttributes extends Optional<BoughtProductAttributes, 'productId'> { }

export class BoughtProduct extends Model<BoughtProductAttributes, UserCreationAttributes> implements BoughtProductAttributes {
    boughtProductId: number;
    productId!: number;
    userId!: number;
    productType!: string;
    productTitle!: string;
    productPrice!: number;
    productDescription!: string;
    productLocation!: string;
    productToLend!: boolean;
    deliveryPossible!: boolean;


    public static initialize(sequelize: Sequelize) {
        BoughtProduct.init(
            {
                boughtProductId:
                {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },

                productId:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                productType: {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                productTitle:
                {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                productPrice:
                {
                    type: DataTypes.DOUBLE,
                    allowNull: false
                },

                productDescription:
                {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                productLocation:
                {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                productToLend:
                {
                    type: DataTypes.BOOLEAN,
                },

                deliveryPossible:
                {
                    type: DataTypes.BOOLEAN,
                },
            },
            {
                sequelize,
                tableName: 'boughtProducts'
            });
    }

}
