import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/model/application/application.model';
import { ApplicationDatasource } from 'src/app/model/application/application.datsource';
import { Job } from 'src/app/model/designation/job.model';
import { JobDatasource } from 'src/app/model/designation/job.datasource';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  title!: string;

  application: Application;
  editing: boolean = false;
  job: Job;

  constructor(
    private appModel: ApplicationDatasource,
    private activeRoute: ActivatedRoute,
    private appData: ApplicationDatasource,
    private jobData: JobDatasource,
    private router: Router) {
    this.application = new Application();
    this.job = new Job();

    activeRoute.params.subscribe(params => {
      this.editing = params["mode"] == 'edit';
      let id = params["id"];

      if (this.editing) {
        this.getApplicationForUpdate(id);
      } else{
        jobData.getById(id).subscribe(j => {
          this.job = j;
          this.title = j.jobTitle ?? "";
          this.applicationForm.value.jobId = this.job.id;
        })
      }
    })
  }



  ngOnInit(): void {

  }


  applicationForm: FormGroup = new FormGroup({
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
    reference: new FormControl(),
    jobTitle: new FormControl(),
    departmentName: new FormControl()
  })

  submitForm() {

    if (this.applicationForm.valid) {

      Object.assign(this.application, this.applicationForm.value);
      console.log(this.application);
      
      this.appModel.save(this.application).subscribe(app => {
        this.router.navigate(["applicationList"]);
      })

    }
  }



  getApplicationForUpdate(id: number) {
    if (id) {
      if (!this.editing) {
        this.appModel.getById(id).subscribe(job => {
          this.job = job;
          this.application.jobId = id;
          this.application.jobTitle = job.jobTitle;
          this.application.departmentName = job.departmentName;
          this.applicationForm.patchValue(this.application);
        })
      } else {
        this.appData.getById(id).subscribe(app => {
          this.application = app;
          this.applicationForm.patchValue(this.application);
        })
      }
    }
  }




}
