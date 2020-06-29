import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../models/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string;
  constructor(public http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getUsuariosTodos(): Observable<any> {
    return this.http.get(this.url + 'usuario/valid');
  }
  guardarUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.post(this.url + 'usuario/', usuario);
  }
  modificarUsuario(id, usuario: UsuarioDto): Observable<any> {
    return this.http.put(this.url + 'usuario/' + id, usuario);
  }
  eliminarUsuario(id): Observable<any> {
    return this.http.delete(this.url + 'usuario/' + id);
  }
}
