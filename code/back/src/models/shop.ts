import { Item } from "./item";

export interface Shop {
    code: string;
    CPFuser: string;
    item: Item;
    totalPrice: number;
    //address ...
    // date ..
}