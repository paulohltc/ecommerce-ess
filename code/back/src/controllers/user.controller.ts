import { User } from "../models/user";
import { Edit } from "../models/edit";

export class UserController {
    users: Map<string, User>;

    private admin: User = { name: 'admin', CPF: '00000000000', email: 'admin@admin.com', password: '123', auth: 'Admin', offers: false };
    private client: User = { name: 'client-test', CPF: '00000000001', email: 'client@test.com', password: '123', auth: 'Cliente', offers: false };
    private employee: User = { name: 'employee-test', CPF: '00000000002', email: 'employee@test.com', password: '123', auth: 'Funcionário', offers: false };

    constructor() {
        this.users = new Map([
            [this.admin.CPF, this.admin],
            [this.client.CPF, this.client],
            [this.employee.CPF, this.employee],
        ]);
    }

    getUsers(): Map<string, User> {
        return this.users;
    }

    userExists(CPF: string): boolean {
        return this.users.has(CPF);
    }

    createUser(user: User): boolean {
        var notExist = !this.userExists(user.CPF);
        if (notExist) {
            this.users.set(user.CPF, user);
        }
        return notExist;
    }

    removeUser(CPF: string): boolean {
        var exists = this.userExists(CPF);
        if (exists && CPF != this.admin.CPF)
            this.users.delete(CPF);
        return exists;
    }

    updateUser(CPF: string, edit: Edit): boolean {
        var exists = this.userExists(CPF);
        if (exists) {
            let prevUser: User = this.users.get(CPF)!;
            let newUser: User = { CPF: CPF, ...edit, auth: prevUser.auth, offers: prevUser.offers };
            this.users.set(CPF, newUser);
        }
        return exists;
    }

}