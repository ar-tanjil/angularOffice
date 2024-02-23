import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/model/department/deparment';
import { DepModel } from 'src/app/model/department/department.model';
import { Designation } from 'src/app/model/designation/designation';
import { DesigModel } from 'src/app/model/designation/designation.model';

@Component({
  selector: 'app-desig-form',
  templateUrl: './desig-form.component.html',
  styleUrls: ['./desig-form.component.scss']
})
export class DesigFormComponent {

  title: string = "";
  designation: Designation = new Designation();
  editing: boolean = false;

  constructor(private model: DesigModel, private route: ActivatedRoute) {

    route.params.subscribe(parmas => {
      this.editing = parmas["mode"] == 'edit';


      let id = parmas["id"];
      if (id) {
        model.getOrgDesiganation(id).subscribe(desig => {
          this.designation = desig;
          this.designationForm.patchValue(desig);
          console.log(this.designationForm.value);

          this.chooseTile(!this.editing);
        })
      }
    })
  }

  ngOnInit() {
  }

  get getDepartmentList(): Department[] {
    return this.model.getDepartmentList();
  }


  designationForm: FormGroup = new FormGroup(
    {
      id: new FormControl(),
      jobTitle: new FormControl(),
      minSalary: new FormControl(),
      maxSalary: new FormControl(),
      totalPost: new FormControl(),
      departmentId: new FormControl(this.designation.departmentId, Validators.required)
    }
  )

  submitForm() {
    if (this.designationForm.valid) {
      Object.assign(this.designation, this.designationForm.value);
      this.model.saveDesignation(this.designation);
      this.designationForm.reset();
    }
  }

  chooseTile(val: boolean) {
    if (val) {
      this.title = `Create New Job`
    } else {
      this.title = `Update ${this.designation.jobTitle} Post Details Of ${this.designation.departmentName}`
    }
  }


}
