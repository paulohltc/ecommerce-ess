import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NomesService } from 'src/app/services/nomes.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;
  editProfileDisplay = true;
  myShopsDisplay = false;
  
  public userEditForm: FormGroup = this.formBuilder.group({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private nomesService: NomesService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  listarNomes(): string[] {
    return this.nomesService.getNomes();
  }

  adicionarNome(): void {
    this.nomesService.adicionarNome(this.nome);
    this.nome = "";

  }

  editProfile() {
    this.editProfileDisplay = true;
    this.myShopsDisplay = false;
  }

  myShops(){
    this.editProfileDisplay = false;
    this.myShopsDisplay = true;
  }

  removerNome(index: number): void {
    this.nomesService.removerNome(index);

  }

}
