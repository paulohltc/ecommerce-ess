export class User {

    name: string;
    cpf: string;
    email: string;
    password: string;
    offers: boolean;


    constructor(name: string, cpf: string, email: string, password: string, offers: boolean) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.offers = offers;
    }
}