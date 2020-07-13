import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { DispositivoDto } from '../models/dispositivo.dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  public url: string;
  constructor(public http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getDispositivosTodos(): Observable<any> {
    return this.http.get(this.url + 'dispositivo/valid');
  }
  getDispositivoNombre(nombre: string): Observable<any> {
    return this.http.get(this.url + 'dispositivo/iden/' + nombre);
  }
  guardarDispositivo(dispositivo: DispositivoDto): Observable<any> {
    console.log(dispositivo);
    return this.http.post(this.url + 'dispositivo/', dispositivo);
  }
  modificarDispositivo(id, dispositivo: DispositivoDto): Observable<any> {
    return this.http.put(this.url + 'dispositivo/' + id, dispositivo);
  }
  eliminarDispositivo(id): Observable<any> {
    return this.http.delete(this.url + 'dispositivo/' + id);
  }
  leerFichero(): Observable<any> {
    return this.http.get('assets/js/data.txt', { responseType: 'text' });
  }
}
