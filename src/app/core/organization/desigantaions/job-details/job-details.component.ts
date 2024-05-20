import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobDatasource } from 'src/app/model/designation/job.datasource';
import { Job } from 'src/app/model/designation/job.model';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { EmployeeTable } from 'src/app/model/employee/employee.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  designation: Job;
  employeeList: EmployeeTable[];

  constructor(private jobData: JobDatasource,
    private empData: EmployeeDatasource,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<JobDetailsComponent>
  ) {
    this.designation = new Job();
    this.employeeList = new Array<EmployeeTable>();
  }


ngOnInit(): void {
    if(this.data.id){
      this.getJob(this.data.id);
    }
}



  getJob(id: number){
    this.jobData.getById(id).subscribe(j => {
      this.designation = j;      
      this.getAllEmployeeByJob(id)
    })
  }

  getAllEmployeeByJob(id: number){
    this.empData.getEmployeeByJob(id).subscribe(e => {
      this.employeeList = e;      
    })
  }


}
