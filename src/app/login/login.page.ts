import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NavController, MenuController, ToastController, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg = "";
  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private menuCtrl:MenuController,
    private toastController: ToastController, private loadingController:LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {
    
    this.menuCtrl.enable(false);

    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async cadastrar() {
    const alert = await this.alertController.create({
      header: 'Cadastrar-se',
      inputs: [
        {name: "login", type:"email", placeholder:"Digite email"},
        {name: "senha", type: "password", placeholder: "Senha"}
      ],
      buttons: [
        { text: 'Cancelar' }, 
        { text: 'Cadastrar', handler: (data) => { 
            console.log('Campo login: ' + data.login);
            console.log('Campo senha: ' + data.senha);
            
            this.toastController.create({
              message: "Criado com sucesso", 
              duration: 2000
            }).then(toast => toast.present());
          }
        }
      ]
    });
    alert.present();
  }

  async logar() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      showBackdrop: false
    });
    loading.present();
    let usuario = this.formulario.value;
    if (this.formulario.valid && usuario.email == "teste@teste.com" && usuario.senha == "123456") {
      AutenticacaoGuard.podeAcessar = true;      
      this.router.navigateByUrl('/home');
    } else
      this.toastController.create({
        message: 'Login ou senha inválida',
        duration: 2000 
      }).then(toast => toast.present());
    loading.dismiss();
  }
}
