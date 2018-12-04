import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

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

            firebase.auth().createUserWithEmailAndPassword(data.login, data.senha).then(usuarioLogado => {
              //Logado
              this.toastController.create({
                message: "Criado com sucesso", 
                duration: 2000
              }).then(toast => toast.present());

              this.router.navigateByUrl('/home');

            }).catch(erro => {
              this.mensagemErro(erro.code);
              console.log(erro);
            })
            
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Possíveis mensagens de erro do Firebase
   * @param erroCode 
   * 
   */
  private mensagemErro(erroCode) {
    let msg = '';
    //Seleeciona o tipo de erro
    switch(erroCode) {
      case "auth/user-not-found": msg = "Usuário não cadastrado"; break;
      case "auth/wrong-password": msg = "Senha incorreta"; break;
      case "auth/email-already-in-use": msg = "Email já cadastrado"; break;
      case "auth/invalid-email": msg = "Campo e-mail não é válido"; break;
      case "auth/weak-password": msg = "O campo senha precisa ter pelo menos 6 caracteres"; break;
      default: msg = "Não foi possível completar a ação"; break;
    }

    this.toastController.create({
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());


  }

  async logar() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      showBackdrop: false
    });

    if (this.formulario.valid) {
      loading.present();
      let usuario = this.formulario.value;
    
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha).then(usuarioLogado => {
        //logado
        this.router.navigateByUrl('/home');
        loading.dismiss();
      }).catch(erro => {  
        //Erro
        this.mensagemErro(erro.code);
        loading.dismiss();
      });
    }
  }
}
