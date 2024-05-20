import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { EmployeeTable } from 'src/app/model/employee/employee.model';
import { DemoFormComponent } from '../demo/demo-form/demo-form.component';
import { auto } from '@popperjs/core';
import { RegisterFormComponent } from './emploee-from/register-form.component';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {

  employeeTable: EmployeeTable[];
  private replaySubject: ReplaySubject<EmployeeTable[]>;
  admin: boolean = false;

  constructor(
    private empData: EmployeeDatasource,
    private dialog: MatDialog,
    private jwtService: JWTTokenService
  ) {
    this.employeeTable = new Array<EmployeeTable>();
    this.replaySubject = new ReplaySubject<EmployeeTable[]>(1);
    this.getEmployTable();
    this.admin = jwtService.getRole() == "ADMIN"
    console.log(this.admin);
    
  }

  getEmployTable(): void {
    this.empData.getAll().subscribe(emp => {
      this.employeeTable = emp;
      this.replaySubject.next(emp);
      this.replaySubject.complete();
      console.log("hi");
      
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
      this.getEmployTable();
    })
  }

}
