import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepModel } from 'src/app/model/department/department.model';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {

  title: string =""

  constructor(private model: DepModel){}


  departmentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    departmentName: new FormControl(),
    managerId: new FormControl(),
    mangagerName: new FormControl(),
    departmentDesc: new FormControl()
  })

  submitForm(){

  }

}
