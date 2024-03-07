import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<LeaveRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
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
    this.leave.employeeId = this.data.id;
    this.attenData.saveLeave(this.leave).subscribe(l => { 
    this.dialogRef.close()
    });
  }
}
