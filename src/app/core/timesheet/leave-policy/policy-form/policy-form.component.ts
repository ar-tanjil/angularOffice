import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { LeavePolicy } from 'src/app/model/attendance/attendance.model';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { EmployeeTable } from 'src/app/model/employee/employee.model';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {

  employee: EmployeeTable[];
  editing: boolean = false;



  

  constructor(
    private empData: EmployeeDatasource,
    private attData: AttendanceDatasource,
    public dialogRef: MatDialogRef<PolicyFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }

  ){
    this.employee = new Array<EmployeeTable>();
  }

  ngOnInit(): void {
      this.getEmployeeWithoutPolicy();
  }


  policyForm: FormGroup = new FormGroup({
    id: new FormControl(),
    medical: new FormControl(),
    casual: new FormControl(),
    employeeId: new FormControl()
  })

  submit(){
    let policy = new LeavePolicy();
    Object.assign(policy, this.policyForm.value) 
    this.attData.saveLeavePolicy(policy).subscribe(lev => {
      this.dialogRef.close();
    })
  }


  getEmployeeWithoutPolicy(){
    this.empData.getEmpWithoutPolicy().subscribe(emp => {
      this.employee = emp;
    })
  }

}
