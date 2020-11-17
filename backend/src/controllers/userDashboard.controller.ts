import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { BoughtProduct } from '../models/boughtProduct.model';
import { verifyToken } from '../middlewares/checkAuth';

const dashboardController: Router = express.Router();
const { Op } = require('sequelize');


// returns the products or services of a user which are for sell
dashboardController.get('/getDashboard/forSell/:logedUserId/:toLend', verifyToken,
    (req: Request, res: Response) => {
        Product.findAll({
            where: {
                [Op.and]: [{ userId: req.params.logedUserId }, { productToLend: req.params.toLend }, { productAvailable: true}]
            }
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });


// returns products and services of a user which are sold
dashboardController.get('/getDashboard/sold/:logedUserId', verifyToken,
    (req: Request, res: Response) => {
        Product.findAll({
            where: {
                [Op.and]: [{ userId: req.params.logedUserId }, { productAvailable: false }]
            }
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });


// returns products and services which a user has bought
dashboardController.get('/getDashboard/bought/:logedUserId', verifyToken,
    (req: Request, res: Response) => {
        BoughtProduct.findAll({
            where: {
                [Op.and]: [{ userId: req.params.logedUserId }, { productAvailable: false }]
            }
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });



// add a product
dashboardController.post('/post/:userId', verifyToken, (req: Request, res: Response) => {
    Product.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});


// deletes a given post of a user
dashboardController.delete('/delete/:logedUserId/:productId', verifyToken, (req: Request, res: Response) => {
    const id: number = +req.params.logedUserId;
    Product.findByPk(req.params.productId)
        .then(found => {
            if (found != null) {
                if (found.userId === id) {
                    found.destroy().then(() => res.status(200).send());
                }
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});


// updates a given post of a user
dashboardController.put('/update/:logedUserId/:productId', verifyToken, (req: Request, res: Response) => {
    const id: number = +req.params.logedUserId;
    Product.findByPk(req.params.productId)
        .then(found => {
            if (found != null) {
                if (found.userId === id) {
                    found.update(req.body).then(updated => {
                        res.status(200).send(updated);
                    });
                }
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});


export const DashboardController: Router = dashboardController;
