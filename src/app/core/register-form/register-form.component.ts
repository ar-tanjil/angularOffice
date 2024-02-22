import { DepModel } from './../../model/department/department.model';
import { Department } from 'src/app/model/department/deparment';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EmpModel } from 'src/app/model/employee/emp.model';
import { Employee } from 'src/app/model/employee/employee';
import { FormMessage, FormOwner } from 'src/app/model/from.message.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  employee: Employee = new Employee();
  department: Department = new Department();
  mood!: string;
  title!: string;

  // form state
  addEmployee: boolean = false;
  editEmployee: boolean = false;
  addDepartment: boolean = false;
  editDepartment: boolean = false;
  addDesignation: boolean = false;
  editDesignation: boolean = false;

  constructor(private empModel: EmpModel, private depMode: DepModel,  private route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.mood = params["mode"];
      console.log(this.mood);

    })

  }


  ngOnInit() {
    this.chooseState(this.mood);
    this.chooseTitle(this.mood);
  }

  employeeForm: FormGroup = new FormGroup(
    {
      id: new FormControl(),
      departmentName: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      hireDate: new FormControl(new Date()),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      job: new FormControl(),
      department: new FormControl(),
      address: new FormControl(),
      departmentDesc: new FormControl()
    }
  )

  submitForm() {
    if (this.addEmployee) {
      Object.assign(this.employee, this.employeeForm.value);
      this.empModel.saveEmployee(this.employee);
      console.log(this.employee);
    } else if (this.addDepartment) {
      Object.assign(this.department, this.employeeForm.value);
      this.depMode.saveDepartment(this.department);
      console.log(this.department);
    }

  }


  chooseState(val: string) {
    switch (val) {
      case "EMPLOYEE":
        this.addEmployee = true;
        break;
      case "DEPARTMENT":
        this.addDepartment = true;
        break;
    }
  }

  chooseTitle(val: string){
    switch (val) {
      case "EMPLOYEE":
        this.title = "Employee";
        break;
      case "DEPARTMENT":
        this.title = "Department";
        break;
    }
  }

}
