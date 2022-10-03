import { Item } from "./item";

export interface Shop {
    code: string;
    email: string;
    name: string;
    CPF: string;
    items: Item[];
    CEP: string;
    rua: string;
    numero: string;
    complemento: string;
    total: number;

}