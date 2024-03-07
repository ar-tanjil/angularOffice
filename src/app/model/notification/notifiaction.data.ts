import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, StompSubscription, Stomp } from '@stomp/stompjs';
import { NotifyModel } from './notification.model';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from '../authentication/auth.model';
import { JWTTokenService } from '../authentication/jwtToken.service';




export type ListenerCallBack = (message: NotifyModel) => void;

@Injectable()
export class NotificationData implements OnDestroy{

  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor(private http: HttpClient, private jwtService: JWTTokenService) {
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
        let name = this.jwtService.getRole()?.toLocaleLowerCase();
        this.subscription = this.connection!.subscribe(`/user/${name}/topic`, 
        message => fun(JSON.parse(message.body)));
      }); 
    }
  }


  private url: string = "http://localhost:8080/messages";
  getOldNotifiaciton():Observable<NotifyModel[]>{
    let name = this.jwtService.getRole()?.toLocaleLowerCase();
    return this.sendRequest<NotifyModel[]>("GET",`${this.url}/${name}`);
  }


  private sendRequest<T>(verb: string, url: string, body?: T): Observable<T>{
    return this.http.request<T>(verb, url, {
        body: body
    }).pipe(catchError((error: Response) => {
        throw(`Network Error: ${error.statusText} (${error.status})`)
    }));
}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}