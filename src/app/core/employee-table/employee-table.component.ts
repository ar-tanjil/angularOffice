import { Component } from '@angular/core';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { EmpModel } from 'src/app/model/employee/emp.model';
import { Employee, EmployeeTable } from 'src/app/model/employee/employee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {

  employTable: EmployeeTable[] = new Array<EmployeeTable>();

        constructor(private model: EmpDatasource){
            this.model.getAll().subscribe(emp => {
              this.employTable = emp;
            })

        }


}
