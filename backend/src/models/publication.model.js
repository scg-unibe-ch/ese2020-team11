"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publication = void 0;
const sequelize_1 = require("sequelize");
const listings_model_1 = require("./listings.model");
class Publication extends sequelize_1.Model {
    static initialize(sequelize) {
        Publication.init({
            publicationId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            done: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            listingsId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, { sequelize, tableName: 'publication' });
    }
    static createAssociations() {
        Publication.belongsTo(listings_model_1.Listings, {
            targetKey: 'listingsId',
            as: 'listings',
            onDelete: 'cascade',
            foreignKey: 'listingsId'
        });
    }
}
exports.Publication = Publication;
//# sourceMappingURL=publication.model.js.map