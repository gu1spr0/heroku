import { Injectable } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { DispositivoDto } from '../models/dispositivo.dto';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  dispositivo: DispositivoDto;
  constructor(
    private mqttService: MqttService) {
  }
  topic(dispositivo: DispositivoDto): Observable<IMqttMessage> {
    console.log(dispositivo);
    return this.mqttService.observe(dispositivo.sub);
  }
  // topic(): Observable<IMqttMessage> {
  //   return this.mqttService.observe('LatLon/ARD-100');
  // }
  connected(): boolean {
    let sw = false;
    this.mqttService.onConnect
      .subscribe(
        res => {
          sw = true;
        },
        error => {
          sw = false;
        }
      );
    return sw;
  }

}
