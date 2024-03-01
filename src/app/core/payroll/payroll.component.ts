import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { PayrollTable, Salary } from 'src/app/model/payroll/payroll.model';
import { AddSalaryComponent } from './add-salary/add-salary.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  month!: number;
  year!: number;
  salaryTable: Salary[];
  private locator = (payroll: PayrollTable, id?: number) => payroll.employeeId == id;
  private replaySubject: ReplaySubject<Salary[]>;


  constructor(private model: PayrollDatasource, private dialog: MatDialog) {
    this.lastMonth();
    this.salaryTable = new Array<Salary>();
    this.replaySubject = new ReplaySubject<Salary[]>();
  }




  ngOnInit(): void {
    this.getAllSalary();
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


  openDialog() {
    let addSalaryDialog = this.dialog.open(AddSalaryComponent, {
      height: auto,
      width: '45%'
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      this.getAllSalary();
    })

  }



  getAllSalary() {
    this.model.getAllSalary().subscribe(emp => {
      this.salaryTable = emp;
      this.replaySubject.next(emp);
      this.replaySubject.complete();
    })
  }











  // getAllPayrollByPeriod(year: number, month: number) {
  //   this.model.getAllByPeriod(year, month).subscribe(pay => {
  //     this.payTable = pay;
  //     this.replaySubject.next(pay);
  //     this.replaySubject.complete();
  //   })
  // }

}
