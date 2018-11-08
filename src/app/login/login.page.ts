import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg = "";
  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private menuCtrl:MenuController) { }

  ngOnInit() {
    
    this.menuCtrl.enable(false);

    this.formulario = this.formBuilder.group({
      email: ['valor padrão inicial', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {

    let usuario = this.formulario.value;
    if (this.formulario.valid && usuario.email == "teste@teste.com" && usuario.senha == "123456") {
      AutenticacaoGuard.podeAcessar = true;      
      this.router.navigateByUrl('/home');
    } else
      this.msg = "EMAIL OU SENHA ERRADA"
  }
}
