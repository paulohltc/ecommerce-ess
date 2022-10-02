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

export default shopsRouter;