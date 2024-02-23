import { DepModel } from '../../../model/department/department.model';
import { Department } from 'src/app/model/department/deparment';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EmpModel } from 'src/app/model/employee/emp.model';
import { Employee } from 'src/app/model/employee/employee';
import { FormMessage, FormOwner } from 'src/app/model/from.message.service';
import { Designation } from 'src/app/model/designation/designation';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  employee: Employee = new Employee();
  editing!: boolean;
  title!: string;


  constructor(private model: EmpModel, private route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.editing = params["mode"] == "edit";
      let id = params["id"];
      if (id) {
        model.getOrgEmployee(id).subscribe(emp => {
          this.employee = emp ?? new Employee();
          this.employeeForm.patchValue(this.employee);
          
        })
      }
    });
  }

  get departmentList(): Department[] {
    return this.model.getDeprtmentList();
  }

  get designationList(): Designation[] {
    return this.model.getDesignationList();
  }


  ngOnInit() {
    this.chooseTitle(this.editing);
  }

  employeeForm: FormGroup = new FormGroup(
    {
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      dob: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      ssc: new FormControl(),
      sscPassingYear: new FormControl(),
      hsc: new FormControl(),
      hscPassingYear: new FormControl(),
      undergraduate: new FormControl(),
      undergraduatePassingYear: new FormControl(),
      postgraduate: new FormControl(),
      postgraduatePassingYear: new FormControl(),
      zipCode: new FormControl(),
      roadNo: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      jobId: new FormControl(),
      departmentId: new FormControl(),
      departmentName: new FormControl(),
      jobTitle: new FormControl()
    }
  )

  submitForm() {

    Object.assign(this.employee, this.employeeForm.value);
    this.model.saveEmployee(this.employee);


  }


  chooseTitle(val: boolean) {
    if (val) {
      this.title = `Update ${this.employee.firstName} details`
    } else {
      this.title = `Add new Employee`
    }
  }

}
