import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedCPFService {

  CPF: string = '';
  constructor() { }

  logCPF(CPF: string) {
    this.CPF = CPF;
  }

  getCPF(): string {
    return this.CPF;
  }

  logOut() {
    this.CPF = '';
  }
}
