import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {





employee: boolean = false;
toggleEmployee(){
  this.employee = this.employee ? false : true;
}


payroll: boolean = false;
  togglePayroll(){
     this.payroll = this.payroll ? false : true;
  }
}
