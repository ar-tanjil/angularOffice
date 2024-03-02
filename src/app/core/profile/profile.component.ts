import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { Employee } from 'src/app/model/employee/employee';
import { AddSalaryComponent } from '../payroll/add-salary/add-salary.component';
import { Subscription, retry } from 'rxjs';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Attendance } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  emp: Employee = new Employee();
  time = new Date();
  intervalId!: any;
  subscription!: Subscription;
  checkInButton!: string;
  date!: string;
  attendance: Attendance = new Attendance();
  checkInTime!: string;
  checkOutTime!: string;

  constructor(private empData: EmpDatasource,
    private payData: PayrollDatasource,
    private activerRoute: ActivatedRoute,
    private dialog: MatDialog) {
    let day = new Date();
    this.date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 6)
      .toISOString().split("T")[0];


  }

  ngOnInit() {

    this.activerRoute.params.subscribe(params => {
      let id = params["id"] ?? 1
      this.empData.getById(id).subscribe(e => {
        this.emp = e ?? new Employee();
        this.getAttendanc(id, this.date);
        console.log(id, this.date);

      })
    });

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

  }



  getCheckInOut(att: Attendance) {

    this.checkInButton = "Check In";

    if (att.entryTime) {
      this.checkInButton = "Check Out"
    }

    this.checkInTime = att.entryTime ?? "--/--/--";
    this.checkOutTime = att.leaveTime ?? "--/--/--";
  }


  giveAttendance(id: number) {
    if (id > 0) {
      this.payData.giveAttendance(id).subscribe(e => {
        this.getAttendanc(id, this.date);
      })
    }
  }



  getAttendanc(id: number, day: string) {
    this.payData.getAttendanceByDay(id, day).subscribe(att => {
      this.attendance = att ?? new Attendance();
      console.log(att);

      this.getCheckInOut(this.attendance);
    })
  }


  // getPerid(date: Date) {
  //   this.sartDate = new Date(date.getFullYear(), date.getMonth(), 1, 6)
  //     .toISOString().split("T")[0];
  // }



  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
