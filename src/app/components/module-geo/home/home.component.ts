import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as L from 'leaflet';
import bingTileLayer from 'leaflet-bing-layer';
import { WebsocketService } from '../../../services/websocket.service';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  private map;
  ventanaLocalizacion = true;
  latitud = -16.6478;
  longitud = -68.2922;
  private subscription: Subscription;
  public message: any;
  // constructor(public wsService: WebsocketService, private mqttService: MqttService) { }
  constructor(private mqttService: MqttService) { }
  ngOnInit() {
  }
  ngAfterContentInit(): void {
    this.initMap();
  }

  private initMap(): void {
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
      maxZoom: 18,
    });

    this.map = L.map('mapa', {
      center: [this.latitud, this.longitud],
      zoom: 18,
      layers: [bing, grafical],
    });

    const baseMaps = {
      'Planos': bing,
      'Satelite': grafical,
    };

    const overlayMaps = {
      'Cites': carto,
    }


    L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  }
  iniciar() {
    this.ventanaLocalizacion = false;
    this.subscription = this.mqttService.observe('LatLon').subscribe((message: IMqttMessage) => {
      this.message = JSON.parse(message.payload.toString());
      this.map.panTo(new L.LatLng(this.message.latitud, this.message.longitud));
      // tslint:disable-next-line: max-line-length
      L.marker([this.message.latitud, this.message.longitud]).addTo(this.map).bindPopup(this.message.sensorID + '--' + this.message.velocidad).openPopup();
    });
  }
}
