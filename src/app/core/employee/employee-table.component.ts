import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import {  EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import {  EmployeeTable } from 'src/app/model/employee/employee.model';
import { DemoFormComponent } from '../demo/demo-form/demo-form.component';
import { auto } from '@popperjs/core';
import { RegisterFormComponent } from './emploee-from/register-form.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {

    employeeTable: EmployeeTable[];
   private replaySubject: ReplaySubject<EmployeeTable[]>;

        constructor(
          private empData: EmployeeDatasource,
          private dialog: MatDialog
          ){
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


        openDialog() {
          let addEmployeeDialog = this.dialog.open(RegisterFormComponent, {
            height: auto,
            width: auto,
            data: {
              id: null
            }
          }
          );
          addEmployeeDialog.afterClosed().subscribe(ob => {
          if(ob){
            this.getEmployTable();
          }
          })
        }

}
