"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listings = void 0;
const sequelize_1 = require("sequelize");
const publication_model_1 = require("./publication.model");
class Listings extends sequelize_1.Model {
    static initialize(sequelize) {
        Listings.init({
            listingsId: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            }
        }, { tableName: 'listings', sequelize });
    }
    static createAssociations() {
        Listings.hasMany(publication_model_1.Publication, {
            as: 'publications',
            foreignKey: 'listingsId'
        });
    }
}
exports.Listings = Listings;
//# sourceMappingURL=listings.model.js.map