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
  constructor(public wsService: WebsocketService, private mqttService: MqttService) {
    this.subscription = this.mqttService.observe('LatLon').subscribe((message: IMqttMessage) => {
      this.message = JSON.parse(message.payload.toString());
      console.log(this.message);
      L.marker([this.message.latitud, this.message.longitud]).addTo(this.map).bindPopup(this.message.sensorID + "--" + this.message.velocidad).openPopup();
    });
  }
  ngOnInit() {
  }
  ngAfterContentInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('mapa', {
      center: [this.latitud, this.longitud],
      zoom: 18
    });
    const carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 21,
    });
    const options = {
      bingMapsKey: 'AnSERau4L-wtJSyhhTX8E7WmVMOft_yhaeAvftc9Vjo-ijbhH59sJmDeHa_aMS8v',
      imagerySet: 'Aerial',
      maxZoom: 21
    };
    const bing = new bingTileLayer(options);

    bing.addTo(this.map);
    carto.addTo(this.map);
  }
  iniciar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        this.map.panTo(new L.LatLng(this.latitud, this.longitud));
        L.marker([this.latitud, this.longitud]).addTo(this.map);
      });
      this.ventanaLocalizacion = false;
    }

  }
}
