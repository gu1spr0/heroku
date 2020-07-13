import { DispositivoDto } from './../models/dispositivo.dto';
import { PuntosDto } from './../models/puntos.dto';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import bingTileLayer from 'leaflet-bing-layer';
import { geoJSON } from 'leaflet';
import 'leaflet-draw';
import { PuntosService } from './puntos.service';
import * as moment from 'moment';
const geojson = require('geojson');
@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private map;
  latitud = -16.6478;
  longitud = -68.2922;
  public punto: PuntosDto;
  public puntos: PuntosDto[];
  formatDate = 'YYYY-MM-DD';
  formatHour = 'HH:mm:ss';
  public srid = { type: 'name', properties: { name: 'EPSG:3857' } };
  public custom: L.Control;
  constructor(
    public puntosService: PuntosService) { }
  public initMap(): void {

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
      layers: [grafical, bing],
    });

    const baseMaps = {
      Satelite: bing,
      Planos: grafical
    };

    const overlayMaps = {
      Calles: carto,
    };
    L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  }

  setMarker(lat: any, lon: any, dispositivo?: any) {
    L.marker([lat, lon]).addTo(this.map).bindPopup(
      // tslint:disable-next-line: max-line-length
      '<ul class="infoDispositivo"><li><b>NOMBRE:</b>' + dispositivo.nombre + '</li><li><b>MARCA:</b>' + dispositivo.vehiculo.marca + '</li><li><b>PLACA:</b>' + dispositivo.vehiculo.placa + '</li><li><b>CONDUCTOR:</b>' + dispositivo.vehiculo.conductor.persona.nombre + ' ' + dispositivo.vehiculo.conductor.persona.paterno + '</li></ul>'
    ).openPopup();
    this.map.panTo(new L.LatLng(lat, lon));
  }

  dibujarRuta(coordinates: any[]) {
    const data = [{
      line: []
    }];

    const estilo = {
      color: '#2d9c1c',
      weight: 5,
      opacity: 0.9
    };
    data[0].line = coordinates;
    const linea = geojson.parse(data, { LineString: 'line' });
    L.geoJSON(linea, { style: estilo }).addTo(this.map);
  }

  controlesDibujo() {
    const editableLayers = new L.FeatureGroup();
    this.map.addLayer(editableLayers);
    const MyCustomMarker = L.Icon.extend({
      options: {
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      }
    });

    const drawItems = new L.FeatureGroup();
    this.map.addLayer(drawItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#f357a1',
            message: 'Error no se puede dibujar'
          },
          shapeOptions: {
            color: '#e3732d',
            opacity: 1
          }
        },
        polyline: {
          shapeOptions: {
            color: '#3f750f',
            opacity: 1,
            weight: 4
          }
        },
        circle: false,
        circlemarker: false,
        rectangle: false,
        marker: {
          icon: new MyCustomMarker(),
        }
      },
      edit: {
        featureGroup: drawItems,
      }
    });
    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const type = e.layerType;
      const layer = e.layer;
      // let punto;
      if (type === 'marker') {
        const p = layer.toGeoJSON().geometry;
        const date = new Date();
        p.crs = this.srid;
        this.punto = new PuntosDto();
        this.punto.punto = p;
        this.punto.fecha = moment(date).format(this.formatDate);
        this.punto.hora = moment(date).format(this.formatHour);
        this.punto.valido = 'AC';
        this.guardarPunto(this.punto);
      }
      drawItems.addLayer(layer);
    });
  }
  guardarPunto(punto: PuntosDto) {
    this.puntosService.guardarPunto(punto)
      .subscribe(
        result => {
          console.log('Registrado');
        },
        err => {
          console.log('error');
        });
  }

  public puntosTodos() {
    this.puntosService.getPuntos().subscribe(
      res => {
        this.puntos = res;
        console.log(this.puntos);
        this.puntos.forEach((element: any, index) => {
          const x = element.punto.coordinates[1] - 0.00023;
          const y = element.punto.coordinates[0] + 0.00006;
          const id = element.puntoId;
          const marker = L.marker([x, y], { title: id }).bindPopup('Acopio disponible: <bold>' + String(id) + '</bold>');
          marker.addTo(this.map);
        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }

  // public agregarControl() {
  //   let Custom = L.Control.extend({
  //     onAdd() {
  //       return L.DomUtil.get('custom');
  //     },
  //     onRemove() { }
  //   });

  //   this.custom = new Custom({
  //     position: 'bottomright'
  //   }).addTo(this.map);
  // }


}
