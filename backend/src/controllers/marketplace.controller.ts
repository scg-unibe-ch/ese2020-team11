import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { ProductService } from '../services/product.service';

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
                        [Op.lte]: req.params.productMinPriceRequested,
                        [Op.gte]: req.params.productMaxPriceRequested
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


// buy a product
productController.get('/buy/:productId/:buyerId', (req: Request, res: Response) => {

    //if the buyer has enough bool coins, the transaction will occur
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



export const ProductController: Router = productController;
