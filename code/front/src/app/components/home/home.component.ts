import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NomesService } from 'src/app/services/nomes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;


  constructor(private nomesService: NomesService) { }

  ngOnInit(): void {
  }

  listarNomes(): string[] {
    return this.nomesService.getNomes();
  }

  adicionarNome(): void {
    this.nomesService.adicionarNome(this.nome);
    this.nome = "";

  }

  removerNome(index: number): void {
    this.nomesService.removerNome(index);

  }

}
