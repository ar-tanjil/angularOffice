import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepDatasource } from 'src/app/model/department/dep.datasource';
import { Department } from 'src/app/model/department/deparment';
import { DepModel } from 'src/app/model/department/department.model';
import { DesinationDatasource } from 'src/app/model/designation/desig.datasource';
import { Designation } from 'src/app/model/designation/designation';
import { DesigModel } from 'src/app/model/designation/designation.model';

@Component({
  selector: 'app-desig-form',
  templateUrl: './desig-form.component.html',
  styleUrls: ['./desig-form.component.scss']
})
export class DesigFormComponent {

  title: string = "";
  designation: Designation = new Designation();
  departmentList: Department[] = new Array<Department>();
  editing: boolean = false;

  constructor(private jobData: DesinationDatasource,
    private depData: DepDatasource,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<DesigFormComponent>
  ) {
      this.getData(data.id);
      this.getDepartmentList();
  }

  ngOnInit() {
  }



  getData(id: number | null) {
    if (id) {
      this.jobData.getById(id).subscribe(desig => {
        this.designation = desig;
        desig.totalPost = 0;
        this.editing = true;
        this.designationForm.patchValue(desig);
        this.chooseTile(!this.editing);
      })
    }
  }


  getDepartmentList() {
    this.depData.getAll().subscribe(dep => {
      this.departmentList = dep;
    })
  }


  designationForm: FormGroup = new FormGroup(
    {
      id: new FormControl(),
      jobTitle: new FormControl(),
      minSalary: new FormControl(),
      maxSalary: new FormControl(),
      totalPost: new FormControl(),
      departmentId: new FormControl("", Validators.required)
    }
  )

  submitForm() {
    if (this.designationForm.valid) {
      Object.assign(this.designation, this.designationForm.value);
      this.designationForm.reset();
      if(!this.designation.id){
        this.jobData.save(this.designation).subscribe(job => {
          
          if(job){
              this.dialogRef.close(job);
            }
          }   
        )
      } else{
          this.jobData.update(this.designation).subscribe(job => {
            this.dialogRef.close(job);
          })
      }

    }
  }

  chooseTile(val: boolean) {
    if (val) {
      this.title = `Create New Job`
    } else {
      this.title = `Update ${this.designation.jobTitle} Post Details Of ${this.designation.departmentName}`
    }
  }


}
