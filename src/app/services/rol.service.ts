import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { RolDto } from '../models/rol.dto';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  public url: string;
  constructor(private http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getRolesTodos(): Observable<any> {
    return this.http.get<RolDto[]>(this.url + 'rol');
  }
}
