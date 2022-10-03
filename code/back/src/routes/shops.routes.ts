import { Router, Request, Response } from "express";
import { ShopsController } from "../controllers/shops.controller";


const shopsRouter = Router();
const shopsController = new ShopsController();

shopsRouter.route("/")
    .get((req: Request, res: Response) => {
        const mapShops = shopsController.getShops();
        const shopsJson = Object.fromEntries(mapShops);
        return res.json(shopsJson);
    })
    .post((req: Request, res: Response) => {
        const shop = req.body
        shopsController.addShop(shop);
        return res.json({ success: "Compra cadastrado com sucesso" });
    })
shopsRouter.route("/:email")
    .get((req: Request, res: Response) => {
        const email = req.params.email;
        const shops = shopsController.getShopsFromEmail(email);
        const shopsJson = Object.fromEntries(shops);
        return res.json(shopsJson);
    })
shopsRouter.route("/items/:code")
    .get((req: Request, res: Response) => {
        const code = req.params.code;
        const items = shopsController.getItems(code);
        return res.json(items);
    })

export default shopsRouter;