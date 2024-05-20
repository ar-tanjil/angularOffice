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



  
organization: boolean = false;
toggleOrganization(){
   this.organization = this.organization ? false : true;
}


timesheet: boolean = false;
toggleTimesheet(){
   this.timesheet = this.timesheet ? false : true;
}

}
