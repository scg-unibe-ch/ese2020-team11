"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationController = void 0;
const express_1 = __importDefault(require("express"));
const publication_model_1 = require("../models/publication.model");
const publicationController = express_1.default.Router();
publicationController.post('/', (req, res) => {
    publication_model_1.Publication.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});
publicationController.put('/:id', (req, res) => {
    publication_model_1.Publication.findByPk(req.params.id)
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
publicationController.delete('/:id', (req, res) => {
    publication_model_1.Publication.findByPk(req.params.id)
        .then(found => {
        if (found != null) {
            found.destroy().then(() => res.status(200).send());
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(err => res.status(500).send(err));
});
exports.PublicationController = publicationController;
//# sourceMappingURL=publication.controller.js.map