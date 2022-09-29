import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";


const userRouter = Router();

const userController = new UserController();

userRouter.route("/")
    .get((req: Request, res: Response) => {
        const users = userController.getUsers();
        return res.json({ users });

    })
    .post((req: Request, res: Response) => {
        const user = req.body;
        const successAdd = userController.addUser(user);

        if (successAdd) {
            return res.json({ success: "Usuário cadastrado com sucesso" });
        }
        return res.status(409).json({ err: "Já existe usuário com este email" });
    })

userRouter.route("/loginError")
    .get((req: Request, res: Response) => {
        const errorMsg = userController.getLoginError();
        return res.json({ errorMsg });
    })
    .post((req: Request, res: Response) => {
        console.log('oi')
        const errorMsg = req.body;
        console.log(errorMsg);
        userController.setLoginError(errorMsg);
        return res.json({ success: "Erro armazenado com sucesso" });

    })

userRouter.route("/:email")
    .get((req: Request, res: Response) => {
        const email = req.params.email;
        const user = userController.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ err: "Usuário não encontrado " });
        }
        return res.json({ user });
    })
    // .put((req: Request, res: Response) => {
    //     const email = req.params.email;
    //     const edit = req.body;
    //     const successEdit = userController.updateUser(email, edit);
    //     if (!successEdit) {
    //         return res.status(404).json({ err: "Usuário não encontrado " });
    //     }
    //     return res.json({ success: "Usuário atualizado com sucesso" });
    // })
    .delete((req: Request, res: Response) => {
        var email = req.params.email;
        var successDelete = userController.deleteUser(email);
        if (successDelete) {
            return res.json({ success: "Usuário removido com sucesso" });
        }
        return res.status(404).json({ err: "Usuário não encontrado " });
    })

export default userRouter;