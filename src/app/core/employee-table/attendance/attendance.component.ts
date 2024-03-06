import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { AttendanceSheet, AttendanceDemo } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {



  attendance: AttendanceSheet[] = new Array<AttendanceSheet>();
  sartDate!: string;
  endDate!: string;
  titleMonth!: string;

  constructor(private payData: PayrollDatasource) {
    let date = new Date();
    this.getPerid(date);
    this.titleMonth = this.getMonthsString(date);

  }

  ngOnInit(): void {
    this.getAttendanceSheet(this.sartDate, this.endDate);
  }



  get getMonths(): number[] {
    let date = new Date();
    let months = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let leapYear = this.chekcLeapYea(date.getFullYear());
    if (date.getMonth() == 1 && leapYear) {
      return new Array(29);
    }
    return new Array(months.getDate());

  }

  getMonthsString(date: Date) {
    const month = ["January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"];

    return month[date.getMonth()] + " , " + date.getFullYear();
  }



  getPerid(date: Date) {
    this.sartDate = new Date(date.getFullYear(), date.getMonth(), 1, 6)
      .toISOString().split("T")[0];
    this.endDate = new Date(date.getFullYear(), date.getMonth(), 6)
      .toISOString().split("T")[0];
  }



  chekcLeapYea(year: number): boolean {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
      return true;
    } else {
      return false;
    }

  }



  getAttendanceSheet(start: string, end: string) {
    this.payData.getAttendanceSheet(start, end).subscribe(sheet => {
      this.attendance = sheet;
    })
  }



}
