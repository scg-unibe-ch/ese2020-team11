"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsController = void 0;
const express_1 = __importDefault(require("express"));
const listings_model_1 = require("../models/listings.model");
const listingsController = express_1.default.Router();
listingsController.post('/', (req, res) => {
    listings_model_1.Listings.create(req.body).then(created => {
        res.status(201).send(created);
    })
        .catch(err => res.status(500).send(err));
});
listingsController.put('/:id', (req, res) => {
    listings_model_1.Listings.findByPk(req.params.id)
        .then(found => {
        if (found != null) {
            found.update(req.body).then(updated => {
                res.status(200).send(updated);
            });
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(err => res.status(500).send(err));
});
listingsController.delete('/:id', (req, res) => {
    listings_model_1.Listings.findByPk(req.params.id)
        .then(found => {
        if (found != null) {
            found.destroy()
                .then(item => res.status(200).send({ deleted: item }))
                .catch(err => res.status(500).send(err));
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(err => res.status(500).send(err));
});
listingsController.get('/', (req, res) => {
    listings_model_1.Listings.findAll({ include: [listings_model_1.Listings.associations.publication] })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});
exports.ListingsController = listingsController;
//# sourceMappingURL=listings.controller.js.map