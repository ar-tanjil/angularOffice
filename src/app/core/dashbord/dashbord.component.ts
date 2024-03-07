import { Component, OnInit } from '@angular/core';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';
import { LocalStorageService } from 'src/app/model/authentication/storageService';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  totalEmployee: number = 0;
  totalSalary: number = 0;
  todayPresent: number = 0;
 



  constructor(
    private payData: PayrollDatasource,
    private empData: EmployeeDatasource,
    private attenData: AttendanceDatasource
  ) {


  }


  ngOnInit(): void {
    this.getTodayPresentNumber();
    this.getTotalEmployee();
    this.getTotalSalary();
  }

 

  getTotalEmployee() {
    this.empData.countEmployee().subscribe(total => {
      this.totalEmployee = total;
    })
  }

  getTotalSalary() {
    this.payData.countTotalSalary().subscribe(total => {
      this.totalSalary = total;
    })
  }

  getTodayPresentNumber() {
    this.attenData.countTodayAttendance().subscribe(total => {
      this.todayPresent = total;
    })
  }

}
