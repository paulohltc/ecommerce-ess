export class Product {

    productCode: string;
    stock: number;
    name: string;
    category: string;
    price: number;
    description: string;
    // img : ??

    constructor(productCode: string, stock: number, name: string, category: string, price: number, description: string) {
        this.productCode = productCode;
        this.stock = stock;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }

}