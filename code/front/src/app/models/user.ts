export class User {

    name: string;
    cpf: string;
    email: string;
    password: string;
    offers: boolean;
    auth: string;

    constructor(name: string, cpf: string, email: string, password: string, offers: boolean, auth: string) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.offers = offers;
        this.auth = auth;
    }
}