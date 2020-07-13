import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { ConductorDto } from '../models/conductor.dto';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  public url: string;
  constructor(public http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getConductores(): Observable<any> {
    return this.http.get(this.url + 'conductor/valid');
  }
  guardarConductor(conductor: ConductorDto): Observable<any> {
    return this.http.post(this.url + 'conductor/', conductor);
  }
}
