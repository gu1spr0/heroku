import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { DepartamentoDto } from '../models/departamento.dto';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  public url: string;
  constructor(private http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getDepartamentoTodos(): Observable<any> {
    return this.http.get<DepartamentoDto[]>(this.url + 'departamento');
  }
  getDepartamentoId(id: number): Observable<any> {
    return this.http.get(this.url + 'departamento/' + id);
  }
  agregarDepartamento(departamento: DepartamentoDto): Observable<any> {
    return this.http.post(this.url + 'departamento', JSON.stringify(departamento));
  }
}
