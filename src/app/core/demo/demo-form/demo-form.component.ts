import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent {


  employeeForm: FormGroup = new FormGroup(
    {
      id: new FormControl(),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl(),
      dob: new FormControl(),
      email: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.pattern('[0-9]{11}')),
      ssc: new FormControl("", Validators.pattern('^[1-5]\.[0-9]{2}$')),
      sscPassingYear: new FormControl(),
      hsc: new FormControl("", Validators.pattern('^[1-5]\.[0-9]{2}$')),
      hscPassingYear: new FormControl(),
      undergraduate: new FormControl("", Validators.pattern('^[1-4]\.[0-9]{2}$')),
      undergraduatePassingYear: new FormControl(),
      postgraduate: new FormControl("", Validators.pattern('^[1-4]\.[0-9]$')),
      postgraduatePassingYear: new FormControl(),
      zipCode: new FormControl(),
      roadNo: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      jobId: new FormControl("", Validators.required),
      departmentId: new FormControl("", Validators.required)
    }
  )









groupPosition: number = 1;


risePosition(){
if(this.groupPosition < 4){
  this.groupPosition++;
}
}

reducePosition(){
if(this.groupPosition > 1){
  this.groupPosition--;
}
}

}
