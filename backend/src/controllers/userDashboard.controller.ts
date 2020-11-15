import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { verifyToken } from '../middlewares/checkAuth';

const dashboardController: Router = express.Router();


// returns the dashboard of a given user
dashboardController.get('/getDashboard/:logedUserId', verifyToken,
    (req: Request, res: Response) => {
        Product.findAll({
            where: {
                userId: req.params.logedUserId,
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
dashboardController.delete('/delete/:itemId', verifyToken, (req: Request, res: Response) => {
    Product.findByPk(req.params.itemId)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});


// updates a given post of a user
dashboardController.put('/update/:itemId', verifyToken, (req: Request, res: Response) => {
    Product.findByPk(req.params.itemId)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});


export const DashboardController: Router = dashboardController;
