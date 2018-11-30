import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.page.html',
  styleUrls: ['./empty.page.scss'],
})
export class EmptyPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
      //redireciona 
      firebase.auth().onAuthStateChanged(usuario => {
        console.log("Logado: " + (usuario != null));
        if (usuario != null)
          this.router.navigateByUrl('/home');
        else
          this.router.navigateByUrl('/login');
      })
  }

}
