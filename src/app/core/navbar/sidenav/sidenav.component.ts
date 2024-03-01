import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {




payroll: boolean = false;
  toggle(){
     this.payroll = this.payroll ? false : true;
  }
}
