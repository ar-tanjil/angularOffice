import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { PayrollTable } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  month!: number;
  year!: number;
  payTable: PayrollTable[];
  private locator = (payroll: PayrollTable, id?: number) => payroll.employeeId == id;
  private replaySubject: ReplaySubject<PayrollTable[]>;


  constructor(private model: PayrollDatasource) {
    this.lastMonth();
    this.payTable = new Array<PayrollTable>();
    this.replaySubject = new ReplaySubject<PayrollTable[]>();
  }




  ngOnInit(): void {
    this.getAllPayrollByPeriod(this.year, this.month);
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



  getAllPayrollByPeriod(year: number, month: number) {
    this.model.getAllByPeriod(year, month).subscribe(pay => {
      this.payTable = pay;
      this.replaySubject.next(pay);
      this.replaySubject.complete();
    })
  }

}
