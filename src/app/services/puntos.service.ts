import { PuntosDto } from './../models/puntos.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  public url: string;
  constructor(
    public http: HttpClient,
    public configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  guardarPunto(punto: PuntosDto): Observable<any> {
    return this.http.post(this.url + 'puntos/', punto);
  }
  getPuntos(): Observable<any> {
    return this.http.get(this.url + 'puntos/valid');
  }
}
