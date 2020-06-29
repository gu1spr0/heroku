import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private rol = new BehaviorSubject<string>('OTHER');
  public rolObs = this.rol.asObservable();
  constructor() { }

  public setRol(rol: string): void {
    this.rol.next(rol);
  }
}
