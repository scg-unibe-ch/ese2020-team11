import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
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
    isApproved: boolean;
}

export interface UserCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, UserCreationAttributes> implements ProductAttributes {
    productId!: number;
    userId!: number;
    productType!: string;
    productTitle!: string;
    productPrice!: number;
    productDescription!: string;
    productLocation!: string;
    productToLend!: boolean;
    productAvailable!: boolean;
    deliveryPossible!: boolean;
    isApproved: boolean;


    public static initialize(sequelize: Sequelize) {
    Product.init(
        {
            productId:
            {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
            },

             userId: {
                 type: DataTypes.INTEGER,
                 allowNull: false,
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
               defaultValue: 0
                    },

            productAvailable:
            {
               type: DataTypes.BOOLEAN,
               defaultValue: 0
                    },

            deliveryPossible:
            {
               type: DataTypes.BOOLEAN,
               defaultValue: 0
                 },
            isApproved:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
        },
        {
            sequelize,
            tableName: 'products'
        });
    }

}
