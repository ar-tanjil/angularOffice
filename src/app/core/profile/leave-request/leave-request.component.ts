import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/model/notification/notifiaction.data';
import { NotifyModel } from 'src/app/model/notification/notification.model';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent {

  notify: NotifyModel = new NotifyModel();

  notfiyList: NotifyModel[] = [];

  constructor(private notifyServ: NotificationService){
      
  }

  ngOnInit(){
    this.notifyServ.listen(task => {
            this.notfiyList.push(task);
    })
    console.log(this.notfiyList);

  }


  leaveForm: FormGroup = new FormGroup({
    id: new FormControl(),
    senderId: new FormControl(),
    recipientId: new FormControl(),
    content: new FormControl()
  })

  submit(){

      Object.assign(this.notify, this.leaveForm.value);
      this.notify.senderId = "ashiq";
      this.notify.recipientId = "admin";
    
      this.notifyServ.send(this.notify);
      console.log(this.notfiyList);
      
  }
}
