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

        constructor(private model: EmpModel){
            
        }

        get employTable(): EmployeeTable[]{
          return this.model.getEmployees();
        }


}
