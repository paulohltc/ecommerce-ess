import { off } from "process";

export class User {

    name: string;
    CPF: string;
    email: string;
    password: string;
    offers: boolean;
    auth: string;

    constructor(name: string, CPF: string, email: string, password: string, offers: boolean, auth: string) {
        this.name = name;
        this.CPF = CPF;
        this.email = email;
        this.password = password;
        this.offers = offers;
        this.auth = auth;
    }

}