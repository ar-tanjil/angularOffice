import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { Employee, EmployeeTable } from 'src/app/model/employee/employee.model';
import { FormMessage } from 'src/app/model/from.message.service';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Payroll, PayrollTable } from 'src/app/model/payroll/payroll.model';
import { DetailsPayrollComponent } from '../details-payroll/details-payroll.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-process-payroll',
  templateUrl: './process-payroll.component.html',
  styleUrls: ['./process-payroll.component.scss']
})
export class ProcessPayrollComponent implements OnInit {

  employeeList: EmployeeTable[];
  payrollList: PayrollTable[];
  payroll: Payroll;

  constructor(
    private empData: EmployeeDatasource,
    private payData: PayrollDatasource,
    private dialog: MatDialog
  ) {
    this.employeeList = new Array<EmployeeTable>();
    this.payrollList = new Array<Payroll>();
    this.payroll = new Payroll();

    this.payData.getPayrollByPeriod(2024, 3).subscribe(pay => {
      this.payrollList  = pay;
    })

  }

  ngOnInit(): void {
    this.getAllEmployeeList();
  }

  processForm: FormGroup = new FormGroup({
    employeeId: new FormControl("", Validators.required),
    period: new FormControl("", Validators.required)
  })


  getAllEmployeeList() {
    this.empData.getAll().subscribe(list => {
      this.employeeList = list;
    })
  }


  processPayroll() {

    let id = this.processForm.value.employeeId;
    let period = this.processForm.value.period.split("-");
    let year = period[0];
    let month = period[1];
    
    if (id == -1) {
      this.payData.getPayrollByPeriod(year, month).subscribe(pay => {
        this.payrollList = pay;
       
      });
    } else if (id) {
      this.payData.getPayrollByEmpAndPeriod(id, year, month).subscribe(pay => {
        this.payroll = pay;
      })
    }

  }





  payrollDetails(id: number){
    if(id < 0){
      return;
    }

    let addSalaryDialog = this.dialog.open(DetailsPayrollComponent, {
      height: auto,
      width: "60%",
      data: {
        id: id
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
    })
  }






}
