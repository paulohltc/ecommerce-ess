import { Item } from "./item";

export interface Shop {
    code: string;
    CPF: string;
    item: Item;
    CEP: string;
    rua: string;
    numero: string;
    complemento: string;

}