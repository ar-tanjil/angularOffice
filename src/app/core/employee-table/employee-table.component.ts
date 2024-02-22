import { Component } from '@angular/core';
import { EmpModel } from 'src/app/model/employee/emp.model';
import { Employee } from 'src/app/model/employee/employee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {

        constructor(private empModel: EmpModel){

        }

        get getEmployees(): Employee[]{
          return this.empModel.getEmployees();
        }

}
