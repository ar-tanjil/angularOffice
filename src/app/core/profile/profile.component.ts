import { Holiday } from './../../model/payroll/payroll.model';
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
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { auto } from '@popperjs/core';

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
  holiday: boolean = false;

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
        
      })
    });

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

  }



  checkHoliday(day: string){
    this.payData.checkHoliday(day).subscribe(check => {
      this.holiday = check;
      this.getCheckInOut(this.attendance);
    })
  }


  getCheckInOut(att: Attendance) {

    if(this.holiday){
      this.checkInButton = "Holiday"
    } else{
    this.checkInButton = "Check In";
    }

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
     
      this.checkHoliday(this.date);
     
    })
  }



  
  openDialog() {
    let addSalaryDialog = this.dialog.open(LeaveRequestComponent, {
      height: auto,
      width: '45%',
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      console.log(ob);
      
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
