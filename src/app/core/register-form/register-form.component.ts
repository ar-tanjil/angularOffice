import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  employee: Employee = new Employee();

  employeeForm: FormGroup = new FormGroup(
      {
        id: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        hireDate: new FormControl(),
        email: new FormControl(),
        phoneNumber: new FormControl(),
        job: new FormControl(),
        department: new FormControl(),
        address: new FormControl()

      }    
  )

  submitForm(){
    Object.assign(this.employee, this.employeeForm.value);
    console.log(this.employee);
    
  }

}
