import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { Leave } from 'src/app/model/attendance/attendance.model';



@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent {

  leave: Leave;
  medicalLeave: boolean = false;
  casualLeave: boolean = false;

  constructor(
    private attenData: AttendanceDatasource,
    private dialogRef: MatDialogRef<LeaveRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    ){
      this.leave = new Leave();
  }

  ngOnInit(){
    if(this.data.id){
      this.checkLeavePolicy(this.data.id);
    }
  }

  checkLeavePolicy(id: number){
    this.attenData.checkCasualLeavePolicy(id).subscribe(b => {
      this.casualLeave = b;
    })

    this.attenData.checkMedicalLeavePolicy(id).subscribe(b => {
      this.medicalLeave = b;
    })
  }


  leaveForm: FormGroup = new FormGroup({
    id: new FormControl(),
    employeeId: new FormControl(),
    scriptDay: new FormControl(),
    type: new FormControl(),
    reason: new FormControl()
  })

  submit(){
    Object.assign(this.leave, this.leaveForm.value);
    let scriptDay:Date = this.leaveForm.value.scriptDay;
    let day = new Date(scriptDay.getFullYear(), scriptDay.getMonth(), scriptDay.getDate(), 6)
    this.leave.day = day;
    this.leave.employeeId = this.data.id;
    this.attenData.saveLeave(this.leave).subscribe(l => { 
    this.dialogRef.close()
    });
  }
}



