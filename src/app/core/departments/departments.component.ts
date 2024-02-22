import { Component } from '@angular/core';
import { Department } from 'src/app/model/department/deparment';
import { DepModel } from 'src/app/model/department/department.model';
import { FormMessage, FormOwner } from 'src/app/model/from.message.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {

    constructor(private model: DepModel){

    }

    getDepartmetns():Department[]{
      return this.model.getDepartments();
    }

  
}
