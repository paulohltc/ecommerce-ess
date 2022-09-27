import { Shop } from "./shop";

export interface Sale {
    code: string;
    CPFuser: string;
    shop: Shop;
    totalPrice: number;
    //address ...
    // date ..
}