import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }

  private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public message = this.messageSubject.asObservable();
  private hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7258/chathub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addNotificationDataListener = () => {
    this.hubConnection.on('ReceiveNotification', (user, message) => {
      this.messageSubject.next(message);
      console.log(message);
    });
  }
}
