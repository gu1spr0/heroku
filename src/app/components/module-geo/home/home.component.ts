import { DispositivoDto } from './../../../models/dispositivo.dto';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { BrokerService } from '../../../services/broker.service';
import { DispositivoService } from '../../../services/dispositivo.service';
import { SelectItem } from 'primeng/api';
import { MapaService } from '../../../services/mapa.service';
import { MessageService } from 'primeng-lts/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {
  ventanaLocalizacion = true;
  private subscription: Subscription;
  public message: any;
  public messages: any[] = [];
  public actual: DispositivoDto = new DispositivoDto();
  public dispositivo: DispositivoDto;
  public dispositivos: DispositivoDto[];
  public estadosDispositivos: SelectItem[] = [];
  public coordinates: any[] = [];
  // constructor(public wsService: WebsocketService, private mqttService: MqttService) { }
  constructor(
    private mqttService: MqttService,
    private brockerService: BrokerService,
    private dispositivoService: DispositivoService,
    private mapaService: MapaService,
    private messageService: MessageService) { }
  ngOnInit() {
    this.obtenerDispositivos();
  }
  ngAfterContentInit(): void {
    this.mapaService.initMap();

  }
  iniciar() {
    this.ventanaLocalizacion = false;
    if (this.estadosDispositivos.length > 0) {
      this.subscribeToTopic(this.dispositivo);
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private subscribeToTopic(dispositivo: DispositivoDto) {
    this.obtenerDispositivoActual(dispositivo.nombre);
    this.subscription = this.brockerService.topic(dispositivo)
      .subscribe(
        (data: IMqttMessage) => {
          this.message = JSON.parse(data.payload.toString());
          this.coordinates.push([parseFloat(this.message.longitud), parseFloat(this.message.latitud)]);
          if (this.coordinates.length >= 2) {
            this.mapaService.dibujarRuta(this.coordinates);
          } else {
            this.mapaService.setMarker(this.message.latitud, this.message.longitud, this.actual);
          }
          if (this.coordinates.length % 10 === 0) {
            this.mapaService.setMarker(this.message.latitud, this.message.longitud, this.actual);
          }
        });
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

  public obtenerDispositivoActual(iden) {
    this.dispositivoService.getDispositivoNombre(iden).subscribe(
      res => {
        this.actual = res;
      },
      error => {
        const errorMessage = error;
      }
    );
  }
}
