import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { BrokerService } from '../../../services/broker.service';
import { DispositivoService } from '../../../services/dispositivo.service';
import { DispositivoDto } from '../../../models/dispositivo.dto';
import { SelectItem } from 'primeng/api';
import { MapaService } from '../../../services/mapa.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {
  // private map;
  ventanaLocalizacion = true;
  // latitud = -16.6478;
  // longitud = -68.2922;
  private subscription: Subscription;
  public message: any;
  public messages: any[] = [];
  public dispositivo: DispositivoDto;
  public dispositivos: DispositivoDto[];
  public estadosDispositivos: SelectItem[] = [];
  public coordinates: any[] = [];
  // constructor(public wsService: WebsocketService, private mqttService: MqttService) { }
  constructor(private mqttService: MqttService,
    private brockerService: BrokerService,
    private dispositivoService: DispositivoService,
    private mapaService: MapaService) { }
  ngOnInit() {
    this.obtenerDispositivos();
  }
  ngAfterContentInit(): void {
    this.mapaService.initMap();

  }

  // private initMap(): void {
  //   L.Icon.Default.mergeOptions({
  //     iconUrl: require('leaflet/dist/images/marker-icon.png'),
  //     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  //   });
  //   const options = {
  //     bingMapsKey: 'AnSERau4L-wtJSyhhTX8E7WmVMOft_yhaeAvftc9Vjo-ijbhH59sJmDeHa_aMS8v',
  //     imagerySet: 'Aerial',
  //     maxZoom: 18,
  //   };
  //   const bing = new bingTileLayer(options);

  //   const grafical = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //   });

  //   const carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
  //     subdomains: 'abcd',
  //     maxZoom: 18,
  //   });

  //   this.map = L.map('mapa', {
  //     center: [this.latitud, this.longitud],
  //     zoom: 18,
  //     layers: [bing, grafical],
  //   });

  //   const baseMaps = {
  //     Planos: grafical,
  //     Satelite: bing,
  //   };

  //   const overlayMaps = {
  //     Calles: carto,
  //   };
  //   L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  // }

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
    this.subscription = this.brockerService.topic(dispositivo)
      .subscribe(
        (data: IMqttMessage) => {
          this.message = JSON.parse(data.payload.toString());
          this.coordinates.push([parseFloat(this.message.longitud), parseFloat(this.message.latitud)]);
          this.mapaService.setMarker(this.message.latitud, this.message.longitud);
          if (this.coordinates.length >= 2) {
            this.mapaService.dibujarRuta(this.coordinates);
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

}
