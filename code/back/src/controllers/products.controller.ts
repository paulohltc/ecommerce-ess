import { Product } from "../../../models/product";

export class ProductsController {

    private geladeira: Product = { code: '0', stock: 10, name: 'Geladeira', price: 1550, description: '400W muito boa' };
    private microondas: Product = { code: '1', stock: 50, name: 'Microondas', price: 435, description: '400W muito boa' };
    private fogao: Product = { code: '2', stock: 15, name: 'Fogão quatro bocas', price: 900, description: '400W muito boa' };
    private tv: Product = { code: '3', stock: 4, name: 'Televisão 75"', price: 6300, description: '400W muito boa' };
    private liqui: Product = { code: '4', stock: 85, name: 'Liquidificador 500W', price: 245, description: '400W muito boa' };
    private teclado: Product = { code: '5', stock: 100, name: 'Teclado gamer', price: 545, description: 'Gamer' };
    private codeNum: number = 6;

    private shoppingCart: Map<string, Product>; // codes
    private products: Map<string, Product>;

    constructor() {
        this.products = new Map([
            [this.geladeira.code, this.geladeira],
            [this.microondas.code, this.microondas],
            [this.fogao.code, this.fogao],
            [this.tv.code, this.tv],
            [this.liqui.code, this.liqui]
        ]);
        this.shoppingCart = new Map([]);
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
    getShoppingCart(): Map<string, Product> {
        return this.shoppingCart;
    }

    addProductToCart(code: string): boolean {
        var existsProduct = this.productExists(code);
        if (existsProduct) {
            this.shoppingCart.set(code, this.products.get(code)!);
        }
        return existsProduct;
    }

    deleteProductFromCart(code: string): boolean {
        var productInCart = this.isProductInCart(code);
        if (productInCart) {
            this.shoppingCart.delete(code);
        }
        return productInCart;
    }

    clearCart() {
        this.shoppingCart = new Map([]);
    }

    getProduct(code: string): Product | undefined {
        return this.products.get(code);
    }

    getProducts(): Map<string, Product> {
        return this.products;
    }

    getAvailableProducts(): Map<string, Product> {
        var available = new Map(this.products);
        available.forEach((value: Product, key: string) => {
            if (value.stock <= 0) {
                available.delete(key);
            }
        })
        return available;
    }

    isProductInCart(code: string): boolean {
        return this.shoppingCart.has(code);
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

    updateProduct(code: string, product: Product): boolean {
        var exists = this.productExists(code);
        if (exists) {
            product.code = code;
            this.products.set(code, product);
        }
        return exists;
    }


}