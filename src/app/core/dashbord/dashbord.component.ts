import { Component, OnInit } from '@angular/core';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
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
    private empData: EmpDatasource
  ) { }


  ngOnInit(): void {
      this.getTodayPresentNumber();
      this.getTotalEmployee();
      this.getTotalSalary();
  }


  getTotalEmployee(){
    this.empData.countEmployee().subscribe(total => {
      this.totalEmployee = total;
    })
  }

  getTotalSalary(){
    this.payData.countTotalSalary().subscribe(total => {
      this.totalSalary = total;
    })
  }

  getTodayPresentNumber(){
    this.payData.countTodayAttendance().subscribe(total => {
      this.todayPresent = total;
    })
  }

}
