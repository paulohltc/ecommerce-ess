import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-purchase',
  templateUrl: './cliente-purchase.component.html',
  styleUrls: ['./cliente-purchase.component.css']
})
export class ClientePurchaseComponent implements OnInit {

  public enderecoForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    CPF: new FormControl('', [Validators.required, Validators.minLength(11)]),
    CEP: new FormControl('', [Validators.required, Validators.minLength(8)]),
    Endereco: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    complemento: new FormControl('', [Validators.required])
  });;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
