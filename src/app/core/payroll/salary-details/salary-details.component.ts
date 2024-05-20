import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Salary } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.scss']
})
export class SalaryDetailsComponent implements OnInit {


  salary: Salary;

  constructor(
    public dialogRef: MatDialogRef<SalaryDetailsComponent>,
    private payData: PayrollDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ){
    this.salary = new Salary();
  };

  ngOnInit(): void {
      this.getSalary(this.data.id)
  }


  getSalary(id: number){
    this.payData.getSalaryByEmployee(id).subscribe(sal => {
      this.salary = sal;
    })
  }

}
