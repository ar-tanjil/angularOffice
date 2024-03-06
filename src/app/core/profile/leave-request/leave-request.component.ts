import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { Leave } from 'src/app/model/attendance/attendance.model';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';


@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent {

  leave: Leave;

  constructor(
    private attenData: AttendanceDatasource,
    private dialogRef: MatDialogRef<LeaveRequestComponent>
    ){
      this.leave = new Leave();
  }

  ngOnInit(){

  }


  leaveForm: FormGroup = new FormGroup({
    id: new FormControl(),
    employeeId: new FormControl(),
    day: new FormControl(),
    type: new FormControl(),
    reason: new FormControl()
  })

  submit(){
    Object.assign(this.leave, this.leaveForm.value);
    this.leave.employeeId = 1;
    this.leave.status = false;
    console.log(this.leave);
    
    this.attenData.saveLeave(this.leave).subscribe(l => {
      console.log(l);
      
    // this.dialogRef.close()
    });
  }
}
