import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg = "";
  usuario: {email?:string, senha?:string} = { };

  constructor() { }

  ngOnInit() {
  }

  logar() {
    console.log(this.usuario);
    if (this.usuario.email == "teste@teste.com" && this.usuario.senha == "123456")
      this.msg = "SUCESSO";
    else
      this.msg = "EMAIL OU SENHA ERRADA"
  }
}
