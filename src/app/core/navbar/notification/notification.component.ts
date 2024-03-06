import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NotificationService } from 'src/app/model/notification/notifiaction.data';
import { NotifyModel } from 'src/app/model/notification/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent  implements OnInit{

  notification: NotifyModel[];
  replaySubject: ReplaySubject<NotifyModel[]>

  constructor(private notifyData: NotificationService){
      this.notification = new Array<NotifyModel>();
      this.replaySubject = new ReplaySubject<NotifyModel[]>(1);
  }

  ngOnInit(): void {
      this.notifyData.listen(massg => {
        console.log(massg);
        
        this.notification.push(massg);
      })
  }

}
