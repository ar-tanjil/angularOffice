import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { EmployeeTable } from 'src/app/model/employee/employee.model';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { PayrollTable } from 'src/app/model/payroll/payroll.model';
import { DetailsPayrollComponent } from '../details-payroll/details-payroll.component';
import { MatDialog } from '@angular/material/dialog';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payrollList: PayrollTable[];
  employeeList: EmployeeTable[];

  constructor(
    private payData: PayrollDatasource,
    private empData: EmployeeDatasource,
    private dialog: MatDialog
  ){
    this.payrollList = new Array<PayrollTable>();
    this.employeeList = new Array<EmployeeTable>();
  }


  ngOnInit(): void {
    this.getAllEmployeeList();
    this.getAllPaymentPayroll();
  }


  searchForm: FormGroup = new FormGroup({
    employeeId: new FormControl("", Validators.required),
    period: new FormControl("", Validators.required)
  })

  searchPayroll(){

    if(this.searchForm.invalid){
      return;
    }

    let id = this.searchForm.value.employeeId;
    let period = this.searchForm.value.period.split("-");
    let year = period[0];
    let month = period[1];

    if(id == -1){
      this.payData.getPaymentPayrollByPeriod(year, month).subscribe(p => {
        this.payrollList =  p;
      })
    } else {
      this.payData.getPymentByEmployeeAndPeriod(id, year, month).subscribe( p => {
        this.payrollList = p
      })
    }

  }



  getAllEmployeeList() {
    this.empData.getAll().subscribe(list => {
      this.employeeList = list;
    })
  }

  getAllPaymentPayroll(){
    this.payData.getPaymentPayroll().subscribe(p => {
      this.payrollList =  p;
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

}
