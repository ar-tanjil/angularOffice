import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeavePolicy } from 'src/app/model/attendance/attendance.model';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { auto } from '@popperjs/core';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';

@Component({
  selector: 'app-leave-policy',
  templateUrl: './leave-policy.component.html',
  styleUrls: ['./leave-policy.component.scss']
})
export class LeavePolicyComponent implements OnInit {

  leavePolicy: LeavePolicy[] = new Array<LeavePolicy>();
  admin: boolean = false;
  constructor(
    private dialog: MatDialog,
    private attData: AttendanceDatasource,
    private jwtService: JWTTokenService
  ){
    this.admin = jwtService.getRole() == "ADMIN";
  }


  ngOnInit(): void {
      this.getAllLeave();
  }



  getAllLeave(){
    this.attData.getAllLeavePolicy().subscribe(policy => {
      this.leavePolicy = policy;
    })
  }



  openDialog() {
    let addSalaryDialog = this.dialog.open(PolicyFormComponent, {
      height: auto,
      width: auto,
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      this.getAllLeave();
    })
  }
}
