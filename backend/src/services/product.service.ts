import { UserAttributes, User } from '../models/user.model';
import { Product } from '../models/product.model';
import { verifyToken } from '../middlewares/checkAuth';
import { Op } from 'sequelize';


export class ProductService {

    // update status to not available (sold/lend)
    public updateAvailability(productId: string) {
        // var id: number = +productId;

        Product.findByPk(productId)

            .then(found => {
                if (found != null) {
                    found.productAvailable = false;
                }
            });
    }


    // does the payement
    public productPayement(buyerId: string, productId: string) {
        this.substractMoneyFromBuyer(buyerId, this.costOfProduct(productId));
        this.addMoneyToSeller(this.getSeller(productId), this.costOfProduct(productId));
    }


    // returns the amount of boolcoins of a product
    public costOfProduct(productId: string) {
        let amount: number;
        Product.findByPk(productId)
            .then(found => {
                if (found != null) {
                    amount = found.productPrice;
                }
            });
        return amount;
    }


    // returns the seller of a product
    public getSeller(productId: string) {
        let seller: number;
        Product.findByPk(productId)
            .then(found => {
                if (found != null) {
                    seller = found.userId;
                }
            });
        return seller;
    }


    // takes away boolcoins from buyer
    public substractMoneyFromBuyer(buyerId: string, moneyAmount: number) {

        User.findByPk(buyerId)
            .then(found => {
                if (found != null) {
                    found.userBoolcoins -= moneyAmount;
                }
            });
    }


    // gives boolcoins to seller
    public addMoneyToSeller(sellerId: number, moneyAmount: number) {
        User.findByPk(sellerId)
            .then(found => {
                if (found != null) {
                    found.userBoolcoins += moneyAmount;
                }
            });
    }
}
