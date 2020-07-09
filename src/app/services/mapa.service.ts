import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import bingTileLayer from 'leaflet-bing-layer';
import { geoJSON } from 'leaflet';
let geojson = require('geojson');
@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private map;
  latitud = -16.6478;
  longitud = -68.2922;

  constructor() { }
  public initMap(): void {
    L.Icon.Default.mergeOptions({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
    const options = {
      bingMapsKey: 'AnSERau4L-wtJSyhhTX8E7WmVMOft_yhaeAvftc9Vjo-ijbhH59sJmDeHa_aMS8v',
      imagerySet: 'Aerial',
      maxZoom: 18,
    };
    const bing = new bingTileLayer(options);

    const grafical = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
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
      Planos: grafical,
      Satelite: bing,
    };

    const overlayMaps = {
      Calles: carto,
    };
    L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  }

  setMarker(lat: any, lon: any) {
    L.marker([lat, lon]).addTo(this.map).bindPopup('RED5');
    this.map.panTo(new L.LatLng(lat, lon));
  }

  dibujarRuta(coordinates: any[]) {
    let data = [{
      line: []
    }];

    let estilo = {
      'color': '#2d9c1c',
      'weight': 5,
      'opacity': 0.9
    };
    data[0].line = coordinates;
    const linea = geojson.parse(data, { 'LineString': 'line' });
    L.geoJSON(linea, { style: estilo }).addTo(this.map);
  }
}
