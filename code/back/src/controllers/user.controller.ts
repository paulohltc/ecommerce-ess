import { User } from "../models/user";
import { Edit } from "../models/edit";

export class UserController {
    users: Map<string, User>;

    private admin: User = { name: 'admin', CPF: '00000000001', email: 'admin@admin.com', auth: 'Admin', offers: false };
    private client: User = { name: 'client-test', CPF: '00000000002', email: 'client@client.com', auth: 'Cliente', offers: false };

    private loginError: object = { errorMsg: '' };

    constructor() {
        this.users = new Map([
            [this.admin.email, this.admin],
            [this.client.email, this.client]
        ]);
    }


    getLoginError(): object {
        return this.loginError;
    }

    setLoginError(error: object) {
        this.loginError = error;
    }

    getUsers(): User[] {
        return Array.from(this.users.values());
    }

    getUserByEmail(email: string): User | undefined {
        return this.users.get(email);
    }

    userExists(email: string): boolean {
        return this.users.has(email);
    }

    addUser(userParam: User): boolean {
        const map = new Map(Object.entries(userParam));
        var user = map.get('user')!;
        delete user.password;
        var notExist = !this.userExists(user.email);
        if (notExist) {
            this.users.set(user.email, user);
        }
        return notExist;
    }

    deleteUser(email: string): boolean {
        var exists = this.userExists(email);
        if (exists && email != this.admin.email)
            this.users.delete(email);
        return exists;
    }

    updateUser(email: string, edit: Edit): boolean {
        var exists = this.userExists(email);
        if (exists) {
            let prevUser: User = this.users.get(email)!;
            let newUser: User = { email: email, ...edit, CPF: prevUser.CPF, auth: prevUser.auth, offers: prevUser.offers };
            this.users.set(email, newUser);
        }
        return exists;
    }

}