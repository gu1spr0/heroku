import { HelperService } from './../../../services/helper.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MapaService } from '../../../services/mapa.service';
import { AuthService } from '../../../services/auth.service';
import { PuntosService } from '../../../services/puntos.service';
import { PuntosDto } from 'src/app/models/puntos.dto';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-acopio',
  templateUrl: './acopio.component.html',
  styleUrls: ['./acopio.component.scss']
})
export class AcopioComponent implements OnInit, AfterContentInit {

  public rol = 'OTHER';
  public message: string;
  public actual;
  public punto: PuntosDto;
  constructor(
    private mapaService: MapaService,
    public authService: AuthService,
    private helper: HelperService,
    public puntosService: PuntosService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.helper.rolObs.subscribe(msg => this.rol = msg);
    this.actual = this.authService.getCurrentUser();
    if (this.actual) {
      this.rol = this.actual.rol;
    }
  }
  ngAfterContentInit(): void {
    this.mapaService.initMap();
    if (this.actual) {
      if (this.rol === 'ADMIN') {
        this.mapaService.controlesDibujo();
      }
    }
    this.mapaService.puntosTodos();
  }
}
