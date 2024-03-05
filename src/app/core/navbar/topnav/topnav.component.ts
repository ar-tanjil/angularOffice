import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../notification/notification.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {

  notification: number = 0;
  date: Date = new Date();

  constructor(private dialog: MatDialog){


  }



  @Output()
  sidenav = new EventEmitter<boolean>(); 

  @Input()
  sidenavValue!: boolean; 

  toggleSidenav(value: boolean){
    this.sidenav.emit(value);
    console.log(this.sidenav);
    
  }



  openDialog() {
    let addSalaryDialog = this.dialog.open(NotificationComponent, {
      height: auto,
      width: '45%',
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      console.log(ob);
      
    })
  }

}
