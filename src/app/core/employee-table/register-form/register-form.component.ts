import { Department } from 'src/app/model/department/deparment.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee/employee.model';
import { JobDatasource } from 'src/app/model/designation/job.datasource';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';
import { Job } from 'src/app/model/designation/job.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  employee: Employee = new Employee();
  departmentList!: Department[];
  designationList!: Job[];

  title: string = "Add New Employee";


  constructor(
    private empData: EmployeeDatasource,
    private depData: DepartmentDatasource,
    private jobData: JobDatasource,    
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
      this.getDepartment();

  }


  ngOnInit(): void {

  }


  getDepartment(): void {
    this.depData.getAll().subscribe(dep => {
      this.departmentList = new Array<Department>();
      this.departmentList = dep;
    })
  }

  getDesignation(dep: any): void {
   console.log(dep);
   
    if(!dep){
      return
    }
    
    this.jobData.getAllByDeparment(dep).subscribe(job => {
      this.designationList = new Array<Job>();
      this.designationList = job;
    })
  }


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

  submitForm() {
    if (this.employeeForm.valid) {
      Object.assign(this.employee, this.employeeForm.value);
   
      
      if(this.data.id){
        this.empData.update(this.employee).subscribe(emp => {
          if(emp){
          this.dialogRef.close(emp)
          }
        })
      } else{
        this.empData.save(this.employee).subscribe(emp => {
          console.log(emp);

          if(emp){
            this.dialogRef.close(emp)
          
          }
          
        })
      } 
    }

  }


  chooseTitle(val: boolean) {
    if (val) {
      this.title = `Update ${this.employee.firstName} Details`
    } else {
      this.title = `Add new Employee`
    }
  }


  // Maintain Group Positon
  
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
