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
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';

@Component({
  selector: 'app-process-payroll',
  templateUrl: './process-payroll.component.html',
  styleUrls: ['./process-payroll.component.scss']
})
export class ProcessPayrollComponent implements OnInit {

  admin: boolean = false;
  employeeList: EmployeeTable[];
  payrollList: PayrollTable[];
  payroll: Payroll;

  constructor(
    private empData: EmployeeDatasource,
    private payData: PayrollDatasource,
    private dialog: MatDialog,
    private jwtService: JWTTokenService
  ) {
    this.employeeList = new Array<EmployeeTable>();
    this.payrollList = new Array<Payroll>();
    this.payroll = new Payroll();
    this.admin = jwtService.getRole() == "ADMIN";
  }

  ngOnInit(): void {
    this.getAllEmployeeList();
    this.getAllPendingPayroll();
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



  getAllPendingPayroll(){
    this.payData.getPendingPayroll().subscribe(p => {
      this.payrollList =  p;
    })
  }


  processPayroll() {

    if(this.processForm.invalid){
      return;
    }

    let id = this.processForm.value.employeeId;
    let period = this.processForm.value.period.split("-");
    let year = period[0];
    let month = period[1];
    
    if (id == -1) {
      this.payData.processPayrollByPeriod(year, month).subscribe(pay => {
        this.getAllPendingPayroll();
       
      });
    } else if (id) {
      this.payData.processPayrollByEmployee(id, year, month).subscribe(pay => {
        this.getAllPendingPayroll();
      })
    }

  }

  paymentPayroll(id: number){
    if(id == -1){
      return;
    }

    this.payData.paymentPayroll(id).subscribe(a =>{
      this.getAllPendingPayroll();
    })


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


  deletePayroll(id: number){
    if(id < 0){
      return;
    }
    this.payData.deletePayrollById(id).subscribe(b => {
      this.getAllPendingPayroll();
    })
  }




}
