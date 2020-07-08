import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import bingTileLayer from 'leaflet-bing-layer';
import { WebsocketService } from '../../../services/websocket.service';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { BrokerService } from '../../../services/broker.service';
import { DispositivoService } from '../../../services/dispositivo.service';
import { DispositivoDto } from '../../../models/dispositivo.dto';
import { SelectItem } from 'primeng/api';
import { geoJSON } from 'leaflet';
let geojson = require('geojson');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {
  private map;
  ventanaLocalizacion = true;
  latitud = -16.6478;
  longitud = -68.2922;
  private subscription: Subscription;
  public message: any;
  public messages: any[] = [];
  public dispositivo: DispositivoDto;
  public dispositivos: DispositivoDto[];
  public estadosDispositivos: SelectItem[] = [];
  public coordinates: any[] = [];
  public data = {
    'line': this.coordinates,
  };

  // constructor(public wsService: WebsocketService, private mqttService: MqttService) { }
  constructor(private mqttService: MqttService,
    private brockerService: BrokerService,
    private dispositivoService: DispositivoService) { }
  ngOnInit() {
    this.obtenerDispositivos();
  }
  ngAfterContentInit(): void {
    this.initMap();
  }

  private initMap(): void {
    L.Icon.Default.mergeOptions({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
    const options = {
      bingMapsKey: 'AnSERau4L-wtJSyhhTX8E7WmVMOft_yhaeAvftc9Vjo-ijbhH59sJmDeHa_aMS8v',
      imagerySet: 'Aerial',
      maxZoom: 20,
    };
    const bing = new bingTileLayer(options);

    const grafical = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
    });

    const carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    });

    this.map = L.map('mapa', {
      center: [this.latitud, this.longitud],
      zoom: 20,
      layers: [bing, grafical],
    });

    const baseMaps = {
      Planos: grafical,
      Satelite: bing,
    };

    const overlayMaps = {
      Calles: carto,
    };
    L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  }

  iniciar() {
    this.ventanaLocalizacion = false;
    this.subscribeToTopic(this.dispositivo);
    /*this.subscription = this.mqttService.observe('LatLon').subscribe((message: IMqttMessage) => {
      this.message = JSON.parse(message.payload.toString());
      this.map.panTo(new L.LatLng(this.message.latitud, this.message.longitud));
      // tslint:disable-next-line: max-line-length
      L.marker([this.message.latitud, this.message.longitud]).addTo(this.map).bindPopup(this.message.sensorID + '--' + this.message.velocidad).openPopup();
    });*/



  }

  setMarker(lat: any, lon: any) {
    L.marker([lat, lon]).addTo(this.map).bindPopup('RED5').openPopup();
    this.map.panTo(new L.LatLng(lat, lon));

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic(dispositivo: DispositivoDto) {
    let estilo = {
      'color': '#005eff',
      'weight': 5,
      'opacity': 0.65
    };
    this.subscription = this.brockerService.topic(dispositivo)
      .subscribe(
        (data: IMqttMessage) => {
          this.message = JSON.parse(data.payload.toString());

          //this.messages.push(this.message);
          this.coordinates.push([this.message.latitud, this.message.longitud]);
          if (this.coordinates.length >= 2) {
            const linea = geojson.parse(this.data, { 'LineString': 'line' });
            console.log(linea);
            L.geoJSON(linea, {
              style: estilo
            }).addTo(this.map);
            this.setMarker(this.message.latitud, this.message.longitud);
          } else {
            this.setMarker(this.message.latitud, this.message.longitud);
          }
        });
  }

  obtenerDispositivos() {
    this.dispositivoService.getDispositivosTodos().subscribe(
      res => {
        this.dispositivos = res;
        console.log(this.dispositivos);
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
