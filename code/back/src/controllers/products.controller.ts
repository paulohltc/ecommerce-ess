import { Product } from "../models/product";

export class ProductsController {

    private products: Map<string, Product>;
    private geladeira: Product = { code: '0', stock: 10, name: 'Geladeira', price: 1550, description: '400W muito boa' };
    private microondas: Product = { code: '1', stock: 50, name: 'Microondas', price: 435, description: '400W muito boa' };
    private fogao: Product = { code: '2', stock: 15, name: 'Fogão quatro bocas', price: 900, description: '400W muito boa' };
    private tv: Product = { code: '3', stock: 4, name: 'Televisão 75"', price: 6300, description: '400W muito boa' };
    private liqui: Product = { code: '4', stock: 85, name: 'Liquidificador 500W', price: 245, description: '400W muito boa' };
    private codeNum: number = 5;

    private shoppingCart: string[] = []; // codes

    private editingProductCode: string | undefined;

    constructor() {
        this.products = new Map([
            [this.geladeira.code, this.geladeira],
            [this.microondas.code, this.microondas],
            [this.fogao.code, this.fogao],
            [this.tv.code, this.tv],
            [this.liqui.code, this.liqui]
        ]);
    }

    getStock(code: string): number | undefined {
        return this.products.get(code)?.stock;
    }
    updateStock(code: string, stock: number): boolean {
        if (!this.productExists(code)) {
            return false;
        }
        var prod: Product = this.getProduct(code)!;
        prod.stock = stock;
        this.products.set(code, prod);
        return true;
    }

    getEditingProduct(): Product | undefined {
        if (!this.editingProductCode) return undefined;
        return this.getProduct(this.editingProductCode!);
    }

    setEditingProductCode(code: string): boolean {
        var exists = this.productExists(code);
        if (exists) {
            this.editingProductCode = code;
        }
        return exists;
    }

    // getShoppingCart(): Product[] {
    //     return this.shoppingCart;
    // }

    addProductToCart(code: string): boolean {
        var existsProduct = this.productExists(code);
        var index = this.shoppingCart.indexOf(code);
        var notExistsShoppingCart = index <= -1;
        if (notExistsShoppingCart) {
            this.shoppingCart.push(code);
        }
        return notExistsShoppingCart && existsProduct;
    }

    deleteProductFromCart(code: string): boolean {
        var exists = false;
        var index = this.shoppingCart.indexOf(code);
        if (index > -1) {
            exists = true;
            this.shoppingCart.splice(index, 1);
        }
        return exists;
    }


    getProduct(code: string): Product | undefined {
        return this.products.get(code);
    }

    getProducts(): Map<string, Product> {
        return this.products;
    }

    getAvailableProducts(): Map<string, Product> {
        var available = this.products;
        available.forEach((value: Product, key: string) => {
            if (value.stock <= 0) {
                available.delete(key);
            }
        })
        return available;
    }

    productExists(code: string): boolean {
        return this.products.has(code);
    }

    addProduct(product: Product) {
        product.code = this.codeNum.toString();
        this.products.set(product.code, product);
        this.codeNum++;
    }

    deleteProduct(code: string): boolean {
        var exists = this.productExists(code);
        if (exists) {
            this.products.delete(code);
        }
        return exists;
    }

    updateProduct(product: Product): boolean {
        var exists = this.productExists(this.editingProductCode!);
        if (exists) {
            product.code = this.editingProductCode!;
            this.products.set(this.editingProductCode!, product);
        }
        return exists;
    }


}