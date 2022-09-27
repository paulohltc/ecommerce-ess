import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";


const userRouter = Router();

const userControler = new UserController();

userRouter.route("/")
    .get((req: Request, res: Response) => {
        var users = userControler.getUsers();
        return res.json({ users })

    })


export default userRouter;