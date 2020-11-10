export interface ProductModel{
    productId: number;
    userId: number;
    productType: string;
    productTitle: string;
    productPrice: number;
    productDescription: string;
    productLocation: string;
    productToLend: boolean;
    productAvailable: boolean;
    deliveryPossible: boolean;
    isApproved: boolean;
}