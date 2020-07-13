import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioDto } from '../models/usuario.dto';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string;

  constructor(public http: HttpClient, private configuracion: ConfiguracionService, private router: Router) {
    this.url = configuracion.ServerWithApiUrl;


  }
  login(usuario: UsuarioDto): Observable<any> {
    return this.http.post(this.url + 'auth/signin/', usuario).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        }
        return response;
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const helper = new JwtHelperService();
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    if (isExpired) {
      this.logout();
    }
    return !isExpired;
  }
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }
}
