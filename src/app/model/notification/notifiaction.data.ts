import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, StompSubscription, Stomp } from '@stomp/stompjs';
import { NotifyModel } from './notification.model';




export type ListenerCallBack = (message: NotifyModel) => void;

@Injectable()
export class NotificationService implements OnDestroy{

  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor() {
    this.connection = Stomp.client('ws://localhost:8080/myapp');
    this.connection.connect({}, () => {});
    // this call back is used to done after connection
  }

  public send(task: NotifyModel): void {
    if (this.connection && this.connection.connected) {
      this.connection.send('/app/admin', {}, JSON.stringify(task));
    }
  }

  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe('/notification/admin', 
        message => fun(JSON.parse(message.body)));
      }); 
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}