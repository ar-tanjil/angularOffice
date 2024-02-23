import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

constructor(private model: DesigModel){

}


designationForm: FormGroup = new FormGroup(
  {
    id: new FormControl(),
    jobTitle: new FormControl(),
    minSalary: new FormControl(),
    maxSalary: new FormControl()
  }
)

submitForm(){
  Object.assign(this.designation, this.designationForm.value);
  this.model.saveDesignation(this.designation);
  this.designationForm.reset();
}


}
