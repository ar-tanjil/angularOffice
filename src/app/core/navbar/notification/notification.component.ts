import { Component, OnInit } from '@angular/core';
import { NotifyModel } from 'src/app/model/notification/notification.model';

import { NotificationService } from 'src/app/model/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {



  constructor(private notifyService: NotificationService){

  }

  get notification(): NotifyModel[]{
    return this.notifyService.notification;
  }

}
