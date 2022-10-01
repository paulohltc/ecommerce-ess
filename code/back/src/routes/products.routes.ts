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

// editing product data
productsRouter.route("/editing")
    .get((req: Request, res: Response) => {
        const editingProductCode = productsController.getEditingProduct();
        if (!editingProductCode) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json(editingProductCode);
    })
    .post((req: Request, res: Response) => {
        const codeJson = req.body;
        const valid = productsController.setEditingProductCode(codeJson.code);
        if (!valid) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ success: "Dados do produto enviados com sucesso" });
    })
    .put((req: Request, res: Response) => {
        const product = req.body;
        const update = productsController.updateProduct(product);
        if (!update) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ success: "Produto atualizado com sucesso" });
    })

// specific product
productsRouter.route("/:code")
    .get((req: Request, res: Response) => {
        const code = req.params.code;
        const product = productsController.getProduct(code);
        if (!product) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json(product);
    })
    .delete((req: Request, res: Response) => {
        const code = req.params.code;
        const del = productsController.deleteProduct(code);
        if (!del) {
            return res.status(404).json({ err: "Produto não encontrado" });
        }
        return res.json({ success: "Produto removido com sucesso" });
    })

productsRouter.route("/:code/stock")
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