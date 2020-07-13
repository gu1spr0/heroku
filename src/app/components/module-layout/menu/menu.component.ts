import { DispositivoDto } from './../../../models/dispositivo.dto';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { HelperService } from '../../../services/helper.service';
import { DispositivoService } from '../../../services/dispositivo.service';
import { SelectItem } from 'primeng-lts/api';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public rol = 'OTHER';
  public message: string;
  public actual;
  public dispositivos: DispositivoDto[];
  public dispositivo: DispositivoDto;
  public estadosDispositivos: SelectItem[] = [];
  constructor(
    public authService: AuthService,
    private helper: HelperService,
    public dispositivoService: DispositivoService) { }

  ngOnInit() {
    this.helper.rolObs.subscribe(msg => this.rol = msg);
    this.actual = this.authService.getCurrentUser();
    if (this.actual) {
      this.rol = this.actual.rol;
    }
    this.obtenerDispositivos();
  }

  obtenerDispositivos() {
    this.dispositivoService.getDispositivosTodos().subscribe(
      res => {
        this.dispositivos = res;
        this.dispositivos.forEach((element, index) => {
          if (index === 0) {
            this.dispositivo = element;
          }
          this.estadosDispositivos.push({ label: element.nombre, value: element.dispositivoId });

        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }
}
