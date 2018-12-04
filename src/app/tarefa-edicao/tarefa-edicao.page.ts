import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-tarefa-edicao',
  templateUrl: './tarefa-edicao.page.html',
  styleUrls: ['./tarefa-edicao.page.scss'],
})
export class TarefaEdicaoPage implements OnInit {

  tarefa: Tarefa = new Tarefa();


  constructor(private activitedRouted:ActivatedRoute, private router: Router, private toastController:ToastController, private camera:Camera, private alertController:AlertController, private tarefaService:TarefasService) {   
  }

  ngOnInit() {
    console.log(this.activitedRouted.url);
    if (this.activitedRouted.snapshot.params['id'])
      this.tarefaService.buscar(this.activitedRouted.snapshot.params['id']).then(tarefa => this.tarefa = tarefa);
    else 
      this.tarefa = new Tarefa();
  }

  selecionarImagem() {
    this.alertController.create({
      message: "Selecione um modo de recuperar foto",
      inputs: [
        {label: "Camera", value: "1", type:"radio"},
        {label: "Galeria", value: "2", type:"radio"},
      ], 
      backdropDismiss: false,
      buttons: [
        {text: "Cancelar"},
        {text: "Confirmar", handler: (dado) => {
          if (dado == 1) this.tirarFoto(this.camera.PictureSourceType.CAMERA);
          else this.tirarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
        }}
      ]
    }).then(alert => alert.present());

  
  }

  tirarFoto(sourceType) {

    this.camera.getPicture({
      quality: 100, //Qualidade da foto
      allowEdit: true, //(opcional)se permite editar após tirar foto
      cameraDirection: this.camera.Direction.BACK, //(opcional) FRONTAL (FRONT) ou Traseira (BACK),
      mediaType: this.camera.MediaType.PICTURE, //PICTURE OU VIDEO
      saveToPhotoAlbum: false, //(opcional) Se deseja salvar no album
      sourceType: sourceType, //CAMERA, PHOTOLIBRARY (Galeria), SAVEDPHOTOALBUM (Apenas foto tirada no aplicativo)
      encodingType: this.camera.EncodingType.JPEG, //JPEG OU PNG
      destinationType: this.camera.DestinationType.DATA_URL //DATA_URL traz a foto como string na base64, FILE_URI traz o caminho da foto salva no celular
    }).then(foto => {
      //Se tiver na base64
      this.tarefa.imagem = 'data:image/jpeg;base64,' + foto;
    });
  }

  salvar() {
    if (this.tarefa.id == null)
      this.tarefaService.cadastrar(this.tarefa);
    else
      this.tarefaService.editar(this.tarefa);

    this.toastController.create({
      message: 'Salvo com sucesso',
      duration: 2000
    }).then(toast => toast.present());

    this.router.navigateByUrl("/home");
  }

}
