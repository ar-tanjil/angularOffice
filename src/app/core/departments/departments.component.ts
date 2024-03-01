import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/model/department/deparment';
import { DepModel } from 'src/app/model/department/department.model';
import { FormMessage, FormOwner } from 'src/app/model/from.message.service';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {

    constructor(private model: DepModel, private dialog: MatDialog){

    }

    getDepartmetns():Department[]{
      return this.model.getDepartments();
    }


    openDialog() {
      let addSalaryDialog = this.dialog.open(DepartmentFormComponent, {
        height: auto,
        width: '40%'
      }
      );
      addSalaryDialog.afterClosed().subscribe(ob => {
        
      })
  }


}