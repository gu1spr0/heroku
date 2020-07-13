import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { VehiculoDto } from '../models/vehiculo.dto';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  public url: string;
  constructor(public http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getVehiculos(): Observable<any> {
    return this.http.get(this.url + 'vehiculo/valid');
  }
  guardarVehiculos(vehiculo: VehiculoDto): Observable<any> {
    return this.http.post(this.url + 'vehiculo/', vehiculo);
  }
}
