import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee/employee.model';
import { Subscription} from 'rxjs';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { LeaveRequestComponent } from '../timesheet/leaves/leave-form/leave-request.component';
import { auto } from '@popperjs/core';
import { Attendance, LeavePolicy } from 'src/app/model/attendance/attendance.model';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';
import { Time } from '@angular/common';
import { RegisterFormComponent } from '../employee/emploee-from/register-form.component';
import { SafeCall } from '@angular/compiler';
import { Salary } from 'src/app/model/payroll/payroll.model';

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
  checkInTime!: string | Date;
  checkOutTime!: string | Date;
  holiday: boolean = false;
  otheProfile: boolean = false;
  leavePolicy: LeavePolicy = new LeavePolicy();
  admin: boolean = false;
  userName: string = "";
  salary: Salary = new Salary();


  constructor(private empData: EmployeeDatasource,
    private payData: PayrollDatasource,
    private jwtService: JWTTokenService,
    private attenData: AttendanceDatasource,
    private activerRoute: ActivatedRoute,
    private dialog: MatDialog) {
    let day = new Date();
    this.date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 6)
      .toISOString().split("T")[0];

      this.admin = jwtService.getRole() == "ADMIN";
      // this.userName = jwtService.getUser()?? "";
  }

  ngOnInit() {
    this.activerRoute.params.subscribe(params => {

      let profileId = this.jwtService.getId();

      let id = params["id"] ?? this.jwtService.getId()

      this.getSalary(id)

      if(profileId != id){
        this.otheProfile = true;
      }

      this.getLeavePolicy(id);

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
    this.attenData.checkHoliday(day).subscribe(check => {
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

    if (att.checkIn) {
      this.checkInButton = "Check Out"
    }


    this.checkInTime = att.checkIn ?? "--/--/--";
    this.checkOutTime = att.checkOut ?? "--/--/--";
  }


  giveAttendance(id: number) {
    if (id > 0) {
      this.attenData.giveAttendance(id).subscribe(e => {
        this.getAttendanc(id, this.date);
      })
    }
  }



  getAttendanc(id: number, day: string) {
    this.attenData.getAttendanceByDay(id, day).subscribe(att => {
      this.attendance = att ?? new Attendance();
     
      this.checkHoliday(this.date);
     
    })
  }

  getLeavePolicy(id: number){
    this.attenData.getPolicyByEmployee(id).subscribe( policy => {
      this.leavePolicy = policy;
    })
  }


  
  openDialog() {
    let leaveDialog = this.dialog.open(LeaveRequestComponent, {
      height: auto,
      width: '45%',
      data: {
        id: this.emp.id
      }
    }
    );
    leaveDialog.afterClosed().subscribe(ob => {
      
    })
  }

  updateDialog(){
    let leaveDialog = this.dialog.open(RegisterFormComponent, {
      height: auto,
      width: auto,
      data: {
        id: this.emp.id
      }
    }
    );
    leaveDialog.afterClosed().subscribe(ob => {
      this.empData.getById(this.emp.id ?? 0).subscribe(e => {
        this.emp = e ?? new Employee();
        
      })
    })
  }



  getSalary(empId: number){
    this.payData.getSalaryByEmployee(empId).subscribe(s => {
      this.salary = s;
    })
  }



  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }




}
