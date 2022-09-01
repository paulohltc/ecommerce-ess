import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {


  CPF: string = '';
  auth: string = '';

  constructor() { }

  logCPF(CPF: string, auth: string): void {
    this.CPF = CPF;
    this.auth = auth;
  }

  getCPF(): string {
    return this.CPF;
  }

  getAuth(): string {
    return this.auth;
  }

  logOut(): void {
    this.CPF = '';
  }
}
