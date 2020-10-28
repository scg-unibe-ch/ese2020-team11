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

export const ProductController: Router = productController;
