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
    CPF: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
    CEP: new FormControl('', [Validators.required, Validators.minLength(8), Validators.minLength(8)]),
    rua: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    complemento: new FormControl('', [Validators.required])
  });;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
