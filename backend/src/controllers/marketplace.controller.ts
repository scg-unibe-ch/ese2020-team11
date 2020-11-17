import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { BoughtProduct } from '../models/boughtProduct.model';
import { User } from '../models/user.model';
import { ProductService } from '../services/product.service';
import { verifyToken } from '../middlewares/checkAuth';

const productController: Router = express.Router();
const productService = new ProductService();
const { Op } = require('sequelize');


// returns all approved products/services
productController.get('/:productTypeRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productType: req.params.productTypeRequested }, { isApproved: 1 }, {productAvailable: true}]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



// returns all products/services from the wanted location
productController.get('/wantedLocation/:productLocationRequested/:productType', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productLocation: req.params.productLocationRequested }, { productType: req.params.productType }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



// returns all products/services within the range of min and max given prices
productController.get('/wantedPriceRange/:productMinPriceRequested/:productMaxPriceRequested/:productType',
    (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]:
                [{
                    productPrice:
                    {
                        [Op.gte]: req.params.productMinPriceRequested,
                        [Op.lte]: req.params.productMaxPriceRequested
                    }
                },
                    { productType: req.params.productType }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



// returns all products/services with the wanted delivery option
productController.get('/wantedDelivery/:productDelivery/:productType', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ deliveryPossible: req.params.productDelivery }, { productType: req.params.productType }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



// Buy methods

// returns the wanted product
productController.get('/buy/product/:productId', (req: Request, res: Response) => {
    Product.findByPk(req.params.productId)
        .then(found => {
            if (found != null) {
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        });
});


// returns the user
productController.get('/buy/user/:userId', (req: Request, res: Response) => {
    User.findByPk(req.params.userId)
        .then(found => {
            if (found != null) {
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        });
});


// update the product status
productController.put('/buy/productStatusUpdate/:productId', (req: Request, res: Response) => {
    Product.findByPk(req.params.productId)
        .then(found => {
            if (found != null) {
                found.update({ productAvailable: false }).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        }).catch(err => res.status(500).send(err));
});


// not working yet
// copies the db products entries into boughtProducts
productController.post('/buy/saveProduct/:buyerId/:productId', (req: Request, res: Response) => {
    const idNum: number = +req.params.buyerId;
    Product.findByPk(req.params.productId)
        .then(found => {
            if (found != null) {
                BoughtProduct.create({
                    userId: idNum,
                    productType: found.productType,
                    productTitle: found.productTitle,
                    productPrice: found.productPrice,
                    productDescription: found.productDescription,
                    productLocation: found.productLocation,
                    productToLend: found.productToLend,
                    deliveryPossible: found.deliveryPossible
                });
                res.status(200).send(found);
            } else {
                res.sendStatus(404);
            }
        }).catch(err => res.status(500).send(err));
});


// updates the boolcoins of a user
productController.put('/buy/boolcoinUpdate/:userId/:newBoolcoinAmout', (req: Request, res: Response) => {
    User.findByPk(req.params.userId)
        .then(found => {
            if (found != null) {
                found.update({ userBoolcoins: req.params.newBoolcoinAmout }).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        }).catch(err => res.status(500).send(err));
});







// not working yet
// buy a product
/*
productController.get('/buy/:productId/:buyerId', verifyToken, (req: Request, res: Response) => {

    // if the buyer has enough bool coins, the transaction will occur
    if (productService.hasBuyerEnoughBoolcoins(req.params.buyerId, req.params.productId)) {

        // update status of the product
        productService.updateAvailability(req.params.productId);

        // Copies the data of the product into boughtProduct
        productService.copyData(req.params.productId, req.params.buyerId);

        // does the payement
        productService.productPayement(req.params.buyerId, req.params.productId);

        // notify seller


        // request shipping address

    }

});
*/


export const ProductController: Router = productController;
