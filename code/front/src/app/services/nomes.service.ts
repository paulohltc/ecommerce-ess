import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NomesService {

  nomes: string[];



  constructor() {
    this.nomes = [];
  }

  getNomes(): string[] {
    return this.nomes;
  }

  adicionarNome(nome: string): void {
    this.nomes.push(nome);
  }

  removerNome(index: number): void {
    this.nomes.splice(index, 1);
  }
}
