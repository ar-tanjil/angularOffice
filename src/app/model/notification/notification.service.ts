import { Injectable } from "@angular/core";
import { NotifyModel } from "./notification.model";
import { ReplaySubject } from "rxjs";
import { NotificationData } from "./notifiaction.data";

@Injectable()
export class NotificationService{
    notification: NotifyModel[];
    replaySubjet: ReplaySubject<NotifyModel[]>;


    constructor(private notifyData: NotificationData){
        this.notification = new Array<NotifyModel>();
        this.replaySubjet = new ReplaySubject<NotifyModel[]>(1);
        this.getNotification();
    }


    getNotification(){
        this.notifyData.getOldNotifiaciton().subscribe(notify => {
            this.notification = notify;
            this.replaySubjet.next(notify);
            this.replaySubjet.complete();
            this.subToNotify();
        })
    }


    subToNotify(){
        this.notifyData.listen(fun => {
            this.notification.push(fun);
        })
    }

}