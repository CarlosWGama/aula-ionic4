import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  public static podeAcessar = true;

  constructor(private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      AutenticacaoGuard.podeAcessar = (firebase.auth().currentUser != null);
      console.log(AutenticacaoGuard.podeAcessar);
      if (!AutenticacaoGuard.podeAcessar)
        this.router.navigateByUrl('login');

        return AutenticacaoGuard.podeAcessar;
  }
}
