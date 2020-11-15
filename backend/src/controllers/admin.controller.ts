import express, { Router, Request, Response } from 'express';
import { adminLogin } from '../services/admin.service';
import { verifyToken } from '../middlewares/checkAuth';
import { Product } from '../models/product.model';
import { Op } from 'sequelize';

const adminController: Router = express.Router();


adminController.post('/login',
    (req: Request, res: Response) => {
        adminLogin(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

// gets all yet not approved or disapproved products
adminController.get('/:productTypeRequested', (req: Request, res: Response) => {
    Product.findAll({
        where: {
            [Op.and]: [{ productType: req.params.productTypeRequested }, { isApproved: 0 }]
        }
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

// updates an approved product
adminController.put('/:itemId', async (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
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

// deletes a disapproved product
adminController.delete('/:itemId', (req: Request, res: Response) => {

    Product.findByPk(req.params.itemId)
        .then(found => {
            if (found != null) {
                found.destroy()
                    .then(item => res.status(200).send({ deleted: item }))
                    .catch(err => res.status(500).send(err));
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});


export const AdminController: Router = adminController;
