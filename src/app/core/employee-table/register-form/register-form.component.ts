import { Department } from 'src/app/model/department/deparment.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee/employee.model';
import { JobDatasource } from 'src/app/model/designation/job.datasource';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';
import { Job } from 'src/app/model/designation/job.model';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  employee: Employee = new Employee();
  departmentList!: Department[];
  designationList!: Job[];

  editing!: boolean;
  title: string = "Add New Employee";


  constructor(
    private empData: EmployeeDatasource,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private depData: DepartmentDatasource,
    private jobData: JobDatasource
  ) {



    activeRoute.params.subscribe(params => {

      this.editing = params["mode"] == "edit";

      this.chooseTitle(this.editing);
      this.getDepartment();
      this.getDesignation();

      let id = params["id"];
      if (id) {
        empData.getById(id).subscribe(emp => {
          this.employee = emp ?? new Employee();
          this.employeeForm.patchValue(this.employee);
          console.log(this.employee);

          // Call Method
         
          
          
        })
      }
    });
  }


  ngOnInit(): void {

  }


  getDepartment(): void {
    this.depData.getAll().subscribe(dep => {
      this.departmentList = new Array<Department>();
      this.departmentList = dep;
    })
  }

  getDesignation(): void {
    this.jobData.getAll().subscribe(job => {
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

      if(this.editing){
        this.empData.update(this.employee).subscribe(emp => {
          this.route.navigate(['profile', emp.id]);
        })
      } else{
        this.empData.save(this.employee).subscribe(emp => {
            this.route.navigate(["employee"]);
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



}
