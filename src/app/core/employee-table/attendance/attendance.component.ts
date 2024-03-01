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

  constructor(private payData: PayrollDatasource) {
    this.getPerid(new Date());  
  }

  ngOnInit(): void {
    this.getAttendanceSheet(this.sartDate, this.endDate);
  

  }



  get getMonths(): number[] {
    let date = new Date();
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let leapYear = this.chekcLeapYea(date.getFullYear());
    if (date.getMonth() == 1 && leapYear) {
      return new Array(29);
    }
    return new Array(months[date.getMonth()]);

  }



  getPerid(date: Date) {
    this.sartDate = new Date(date.getFullYear(), date.getMonth(), 1, 6)
      .toISOString().split("T")[0];
    this.endDate = new Date(date.getFullYear(), date.getMonth() +1, 0, 6)
      .toISOString().split("T")[0];
  }

  private convertOnlyDate(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    return `${year}-${month}-${day}`;
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







  get getAttenData(): AttendanceDemo[] {
    let demo: AttendanceDemo[] = new Array<AttendanceDemo>();

    for (let i = 1; i < 30; i++) {
      let present: boolean = false;
      if (i % 2 == 0) {
        present = true;
      }

      let day: Date = new Date();
      day.setDate(i);

      for (let j = 1; j < 5; j++) {
        let att = new AttendanceDemo(day, present, j);
        demo.push(att);
      }
    }
    return demo;
  }

}
