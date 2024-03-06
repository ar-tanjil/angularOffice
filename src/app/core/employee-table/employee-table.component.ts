import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {  EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import {  EmployeeTable } from 'src/app/model/employee/employee.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {

    employeeTable: EmployeeTable[];
   private replaySubject: ReplaySubject<EmployeeTable[]>;

        constructor(private empData: EmployeeDatasource){
            this.employeeTable = new Array<EmployeeTable>();
            this.replaySubject = new ReplaySubject<EmployeeTable[]>(1);
            this.getEmployTable();
        }

        getEmployTable(): void{
          this.empData.getAll().subscribe(emp => {
            this.employeeTable = emp;
            this.replaySubject.next(emp);
            this.replaySubject.complete();
          })
        }


}
