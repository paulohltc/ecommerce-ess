import { Item } from "../../../models/item";
import { Shop } from "../../../models/shop";

export class ShopsController {
    private shops: Map<string, Shop>;
    private keyboard: Shop = { code: '0', email: 'phltc@cin.ufpe.br', name: 'Paulo Correia', CPF: '06105312345', CEP: '51020600', rua: 'Rua Poeta Clecio Rodrigo', numero: '38', complemento: 'Apt 1401 Bloco B', items: [{ product: { code: '5', name: 'Teclado gamer', price: 545, stock: 0, description: 'Gamer' }, qty: 3 }, { product: { code: '0', stock: 0, name: 'Geladeira', price: 1550, description: '400W muito boa' }, qty: 1 }], total: 3185 };
    private codeNum: number = 1;

    constructor() {
        this.shops = new Map([
            [this.keyboard.code, this.keyboard]
        ]);
    }

    getShops(): Map<string, Shop> {
        return this.shops;
    }

    getShopsFromEmail(email: string): Map<string, Shop> {
        var emailShops = this.shops;
        emailShops.forEach((value: Shop, key: string) => {
            if (value.email != email) {
                emailShops.delete(key);
            }
        })
        return emailShops;
    }

    getItems(code: string): Item[] {
        var items: Item[] = [];
        if (this.shopExists(code)) {
            items = this.shops.get(code)!.items;
        }
        return items;
    }

    shopExists(code: string): boolean {
        return this.shops.has(code);
    }

    addShop(shop: Shop) {
        shop.code = this.codeNum.toString();
        for (let i = 0; i < shop.items.length; i++) {
            shop.items[i].product.stock = 0;
        }
        this.shops.set(shop.code, shop);
        this.codeNum++;
    }

    deleteProduct(code: string): boolean {
        var exists = this.shopExists(code);
        if (exists) {
            this.shops.delete(code);
        }
        return exists;
    }

}