import { Router, Request, Response } from "express";
import { ProductsController } from "../controllers/products.controller";

const productsRouter = Router();

const productsController = new ProductsController();

// all products + add product
productsRouter.route("/")
    .get((req: Request, res: Response) => {
        const mapProducts = productsController.getProducts();
        const productsJson = Object.fromEntries(mapProducts);
        return res.json(productsJson);
    })
    .post((req: Request, res: Response) => {
        const product = req.body;
        productsController.addProduct(product);
        return res.json({ success: "Produto cadastrado com sucesso" });
    })


// query by stock > 0
productsRouter.route("/available")
    .get((req: Request, res: Response) => {
        const mapProducts = productsController.getAvailableProducts();
        const productsJson = Object.fromEntries(mapProducts);
        return res.json(productsJson);
    })

// specific product
productsRouter.route("/code/:code")
    .get((req: Request, res: Response) => {
        const code = req.params.code;
        const product = productsController.getProduct(code);
        if (!product) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json(product);
    })
    .put((req: Request, res: Response) => {
        const code = req.params.code;
        const product = req.body;
        const update = productsController.updateProduct(code, product);
        if (!update) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ success: "Produto atualizado com sucesso" });
    })
    .delete((req: Request, res: Response) => {
        const code = req.params.code;
        const del = productsController.deleteProduct(code);
        if (!del) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ success: "Produto removido com sucesso" });
    })

productsRouter.route("/code/:code/stock")
    .get((req: Request, res: Response) => {
        const code = req.params.code;
        const stock = productsController.getStock(code);
        if (!stock) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ stock });
    })
    .put((req: Request, res: Response) => {
        const code = req.params.code;
        const stock = req.body.stock;
        const update = productsController.updateStock(code, stock);
        if (!update) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ success: "Produto atualizado com sucesso" });
    })

export default productsRouter;