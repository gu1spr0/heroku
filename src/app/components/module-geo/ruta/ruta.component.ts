import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss']
})
export class RutaComponent implements OnInit {

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];
  constructor(private wsSocket: WebsocketService) { }

  ngOnInit() {
    this.wsSocket.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.wsSocket.getUsers().subscribe((users: number) => {
      this.users = users;
    });

  }

  addChat() {
    this.messages.push(this.message);
    this.wsSocket.sendChat(this.message);
    this.message = '';
  }

}
