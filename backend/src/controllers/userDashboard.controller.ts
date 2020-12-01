import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { BoughtProduct } from '../models/boughtProduct.model';
import { verifyToken } from '../middlewares/checkAuth';
import { UserFavorites } from '../models/userFavorites.model';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize/types';
// import { Model } from 'sequelize-typescript';

const dashboardController: Router = express.Router();
const { Op } = require('sequelize');
// const rawQuery = require('sequelize-raw-query');


// returns the user given its id
dashboardController.get('/getDashboard/getUser/:logedUserId', verifyToken,
    (req: Request, res: Response) => {
        User.findByPk(req.params.logedUserId)
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });



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



// returns the id of products and services which a user has saved as favorite
dashboardController.get('/getDashboard/favorites/:logedUserId', verifyToken,
    (req: Request, res: Response) => {
        UserFavorites.findAll({
            where: { userId: req.params.logedUserId }
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });

// returns a product/service by its id
dashboardController.get('/getDashboard/favoriteProduct/:productId', verifyToken,
    (req: Request, res: Response) => {
        Product.findByPk(req.params.productId)
            .then(prod => res.status(200).send(prod))
            .catch(err => res.status(500).send(err));
    });





// returns products and services which a user has saved as favorite
/*
dashboardController.get('/getDashboard/favorites/:logedUserId', verifyToken,
    (req: Request, res: Response) => {
        /*
        const sql =
            'SELECT * FROM Product, userFavorites WHERE userFavorites.userId = : id AND Product.productId = userFavorites.productId';
        const replacement = {id: req.params.logedUserId };

        return rawQuery.exec(sql, { replacement });
        */
        // sequelize.query
        // ("SELECT * FROM Product, userFavorites WHERE userFavorites.userId = :id AND Product.productId = userFavorites.productId", {)
        /*
        Product.findAll({
            include: [{
                model: UserFavorites,
                /*
                through: {
                    where: { userId: req.params.logedUserId }
                }
                *//*
                where: { userId: req.params.logedUserId },
                required: true,

            }]
        })
            .then(list => res.status(200).send(list))
            .catch(err => res.status(500).send(err));
    });*/



// remove a product/service as a favorite
dashboardController.delete('/removeFavorite/:productId/:userId', verifyToken, (req: Request, res: Response) => {
    UserFavorites.findOne({
        where: { [Op.and]: [{ userId: req.params.userId }, { productId: req.params.productId }] }
    })
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
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
