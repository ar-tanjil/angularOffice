import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/model/department/deparment';
import { DepModel } from 'src/app/model/department/department.model';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {

  title: string = ""
  department: Department = new Department();
  editing: boolean = false;
  constructor(private model: DepModel, private route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.editing = params["mode"] == 'edit';
      let id = params["id"];
      if (id) {
        this.model.getOrgDepartment(id).subscribe(dep => {
          this.department = dep;
          this.departmentForm.patchValue(this.department);
        })
      }
    })



  }


  departmentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    departmentName: new FormControl(),
    managerId: new FormControl(),
    mangagerName: new FormControl(),
    departmentDesc: new FormControl()
  })

  submitForm() {
    Object.assign(this.department, this.departmentForm.value);
    this.model.saveDepartment(this.department);
    this.departmentForm.reset();
  }

}
