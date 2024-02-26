import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/model/application/application';
import { ApplicationDatasource } from 'src/app/model/application/application.datsource';
import { ApplicationModel } from 'src/app/model/application/application.model';
import { Designation } from 'src/app/model/designation/designation';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {

  title!: string;

  application: Application = new Application();
  editing: boolean = false;
  job: Designation = new Designation();

  constructor(private appModel: ApplicationModel, private route: ActivatedRoute,
    private appData: ApplicationDatasource, private router: Router) {

    route.params.subscribe(params => {
      this.editing = params["mode"] == 'edit';
      let id = params["id"];
      if (id) {

        if (!this.editing) {
          appModel.getOrgiJob(id).subscribe(job => {
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
    })

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
      this.appModel.saveApplication(this.application);
      this.applicationForm.reset();

    }
  }


}
