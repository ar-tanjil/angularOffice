import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { Employee } from 'src/app/model/employee/employee.model';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Payroll } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  month!: number;
  year!: number;

  payroll: Payroll;
  employee: Employee;

  constructor(

    public dialogRef: MatDialogRef<PayslipComponent>,
    private payData: PayrollDatasource,
    private empData: EmployeeDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
      this.lastMonth();
      this.payroll = new Payroll();
      this.employee = new Employee();
    }

  ngOnInit(): void {
    if (this.data.id) {
      this.getPayrollByEmp();
      
      this.getEmployee();
    }
  }



  getPayrollByEmp() {
    this.payData.getPayrollByEmpAndPeriod(this.data.id, this.year, this.month).subscribe(pay => {
          this.payroll = pay;
          console.log(this.payroll);
    })
  }


  getEmployee(){
      this.empData.getById(this.data.id).subscribe(emp => {
        this.employee = emp;
      })
  }


  lastMonth() {
    let date: Date = new Date();
    let month: number = date.getMonth() - 1;
    let year: number = date.getFullYear();
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    this.month = month + 2;
    this.year = year;
  }





}
