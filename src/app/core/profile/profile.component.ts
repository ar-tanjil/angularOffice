import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { Employee } from 'src/app/model/employee/employee';
import { AddSalaryComponent } from '../payroll/add-salary/add-salary.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  emp: Employee = new Employee();

  constructor(private data: EmpDatasource, private activerRoute: ActivatedRoute, private dialog: MatDialog) {


  }

  ngOnInit() {

    this.activerRoute.params.subscribe(params => {
      let id = params["id"] ?? 1
      this.data.getById(id).subscribe(e => {
        this.emp = e ?? new Employee();
      })
    })

  }


  openDialog() {
    this.dialog.open(AddSalaryComponent, {
      height: '400px',
      width: '400px',
      data: {
        id: this.emp.id
      }
    },
    );
  }

}
