import { Component, OnInit } from '@angular/core';
import {  JobDatasource } from 'src/app/model/designation/job.datasource';
import { Job } from 'src/app/model/designation/job.model';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

vacantJobs: Job[] = new Array <Job>();

  constructor(
     private jobData: JobDatasource
     ) {
    
  }

ngOnInit(): void {
    this.getAllVacantPost();
}



getAllVacantPost(){
  this.jobData.getAllVacantPost().subscribe(v => {
    this.vacantJobs = v;
  })
}

}
