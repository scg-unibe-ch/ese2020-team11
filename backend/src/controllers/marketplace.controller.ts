import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';

const productController: Router = express.Router();
const { Op } = require('sequelize');


// returns all approved products/services
productController.get('/:productTypeRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productType: req.params.productTypeRequested }, { isApproved: 1 }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


// returns all products from the wanted location
productController.get('/:productLocationRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productLocation: req.params.productLocationRequested }, { productType: 'product' }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


// returns all services from the wanted location
productController.get('/:serviceLocationRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productLocation: req.params.serviceLocationRequested }, { productType: 'service' }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


// returns all products with the wanted price
productController.get('/:productPriceRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productPrice: req.params.productPriceRequested }, { productType: 'products' }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


// returns all services with the wanted price
productController.get('/:servicePriceRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productPrice: req.params.servicePriceRequested }, { productType: 'products' }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


// returns all products with the wanted delivery option
productController.get('/:productDelivery', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ deliveryPossible: req.params.productDelivery }, { productType: 'products' }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});


// returns all services with the wanted delivery option
productController.get('/:serviceDelivery', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ deliveryPossible: req.params.serviceDelivery }, { productType: 'service' }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});



export const ProductController: Router = productController;
