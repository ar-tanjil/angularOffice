import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Payroll, PayrollTable } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.scss']
})
export class SalaryDetailsComponent implements OnInit {

  month!: number;
  year!: number;
  empId!: number;
  payroll!: Payroll[];

  constructor(private payData: PayrollDatasource,
    private activeRouter: ActivatedRoute) {
    activeRouter.params.subscribe(param => {
      this.empId = param["id"];
      this.lastMonth();
      this.payroll = new Array<Payroll>();
    })
  }



  ngOnInit(): void {
    this.getPayroll(this.empId, this.year, this.month);
  }


  addEvent(event: MatDatepickerInputEvent<Date>) {
    let date = new Date(event.value ?? new Date());
    let month: number = date.getMonth() - 1;
    let year: number = date.getFullYear();
    if (month < 0) {
      month += 12;
      year -= 1;
    }

    this.getPayroll(this.empId, year, month);
  }

  getPayroll(id: number, year: number, month: number) {
    this.payData.getPayrollByEmpAndPeriod(id, year, month).subscribe(pay => {
      this.payroll = pay;
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
    this.month = month + 1;
    this.year = year;
  }

}
