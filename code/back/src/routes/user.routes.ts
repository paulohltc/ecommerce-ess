import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";


const userRouter = Router();

const userController = new UserController();

userRouter.route("/")
    .get((req: Request, res: Response) => {
        var users = userController.getUsers();
        return res.json({ users })

    })
    .post((req: Request, res: Response) => {
        var user = req.body;
        const successAdd = userController.addUser(user);

        if (successAdd) {
            return res.json({ success: "Usuário cadastrado com sucesso" })
        }
        return res.status(409).json({ err: "Já existe usuário com este CPF" })
    })

userRouter.route("/:CPF")
    .get((req: Request, res: Response) => {
        var CPF = req.params.CPF;
        var user = userController.getUserByCPF(CPF);
        if (!user) {
            return res.status(404).json({ err: "Usuário não encontrado " });
        }
        return res.json({ user })
    })
    .put((req: Request, res: Response) => {
        var CPF = req.params.CPF;
        var edit = req.body;
        var successEdit = userController.updateUser(CPF, edit);
        if (!successEdit) {
            return res.status(404).json({ err: "Usuário não encontrado " });
        }
        return res.json({ success: "Usuário atualizado com sucesso" })
    })
    .delete((req: Request, res: Response) => {
        var CPF = req.params.CPF;
        var successDelete = userController.deleteUser(CPF);
        if (successDelete) {
            return res.json({ success: "Usuário removido com sucesso" });
        }
        return res.status(404).json({ err: "Usuário não encontrado " });
    })

export default userRouter;