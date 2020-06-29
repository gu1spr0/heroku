import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { Observable } from 'rxjs';
import { PersonaDto } from '../models/persona.dto';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  public url: string;
  constructor(public http: HttpClient, private configuracion: ConfiguracionService) {
    this.url = configuracion.ServerWithApiUrl;
  }
  getPersonasTodos(): Observable<any> {
    return this.http.get(this.url + 'persona/valid');
  }
  guardarPersona(persona: PersonaDto): Observable<any> {
    return this.http.post(this.url + 'persona/', persona);
  }
  modificarPersona(id, persona: PersonaDto): Observable<any> {
    return this.http.put(this.url + 'persona/' + id, persona);
  }
  eliminarPersona(id): Observable<any> {
    return this.http.delete(this.url + 'persona/' + id);
  }
}
