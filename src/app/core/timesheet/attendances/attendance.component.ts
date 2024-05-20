import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { Attendance, AttendanceSheet, TimePeriod } from 'src/app/model/attendance/attendance.model';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { EmployeeTable } from 'src/app/model/employee/employee.model';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {



  attendance: AttendanceSheet[] = new Array<AttendanceSheet>();
  attendanceLog: Attendance[] = new Array<Attendance>();
  titleMonth: Date = new Date();
  period:{startDate: string, endDate: string}  = this.getPerid(new Date());
  timePeriod: TimePeriod;
  employeeList: EmployeeTable[];
  
  constructor(
    private attnData: AttendanceDatasource,
    private empData: EmployeeDatasource,
    ) {
      this.timePeriod = new TimePeriod();
      this.timePeriod.startDate = new Date(this.period.startDate);
      this.timePeriod.endDate = new Date(this.period.endDate);
      this.attendanceLogForm.patchValue(this.period);
      this.employeeList = new Array<EmployeeTable>();
      
  }

  ngOnInit(): void {
    

    this.getAttendanceSheet(this.period.startDate, this.period.endDate);
    this.getAttendacneLog(this.timePeriod);
    this.getAllEmployeeList();
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





  getPerid(date: Date) {
   let sartDate = new Date(date.getFullYear(), date.getMonth(), 1, 6)
      .toISOString().split("T")[0];
   let endDate = new Date(date.getFullYear(), date.getMonth() + 1,0, 6)
      .toISOString().split("T")[0];
      return {
        startDate: sartDate,
        endDate: endDate
      }
  }

  makeDateString(date: Date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6)
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
    this.attnData.getAttendanceSheet(start, end).subscribe(sheet => {
      this.attendance = sheet;
    })
  }


  attendanceLogForm: FormGroup = new FormGroup(
    {
      employeeId: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    }
  )

  getAttendacneLog(time: TimePeriod){
        this.attnData.getAttendanceLog(time).subscribe(log => {
          this.attendanceLog = log;
        })
  }

  searchAttendanceLog(){
    let id = this.attendanceLogForm.value.employeeId;

    if(!id){
      console.log(id);
      return 
    }

    if(id == -1){
      Object.assign(this.timePeriod, this.attendanceLogForm.value);
      this.getAttendacneLog(this.timePeriod);
    } else{
      Object.assign(this.timePeriod, this.attendanceLogForm.value);
      this.attnData.getAttendanceLogByEmp(this.timePeriod, id).subscribe(log => {
        this.attendanceLog = log;
      });
    }
    

   
  }


  getAllEmployeeList() {
    this.empData.getAll().subscribe(list => {
      this.employeeList = list;
    })
  }




}
