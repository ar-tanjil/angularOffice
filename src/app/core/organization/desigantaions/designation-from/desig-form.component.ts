import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/model/department/deparment.model';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';
import { JobDatasource } from 'src/app/model/designation/job.datasource';
import { Job } from 'src/app/model/designation/job.model';


@Component({
  selector: 'app-desig-form',
  templateUrl: './desig-form.component.html',
  styleUrls: ['./desig-form.component.scss']
})
export class DesigFormComponent {

  title: string = "";
  designation: Job;
  departmentList: Department[];
  editing: boolean = false;

  constructor(private jobData: JobDatasource,
    private depData: DepartmentDatasource,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<DesigFormComponent>
  ) {
    this.designation = new Job();
    this.departmentList  = new Array<Department>()
  }

  ngOnInit() {
    
    this.getData(this.data.id);
    this.getDepartmentList();

  }

  keywordGroup = new FormArray([
    this.createRequirementFormControl()
  ])


  getData(id: number | null) {
    if (id) {
      this.jobData.getById(id).subscribe(desig => {
        this.designation = desig;
        desig.totalPost = 0;
        this.editing = true;
       this.keywordGroup.clear()
        this.designation.requirements?.forEach(val => {
          this.keywordGroup.push(this.createRequirementFormControl())
        })
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
      departmentId: new FormControl("", Validators.required),
      requirements: this.keywordGroup
    }
  )

  submitForm() {
    if (this.designationForm.valid) {
      let newJob = new Job();
      Object.assign(newJob, this.designationForm.value);
      if(!this.editing){
        this.jobData.save(newJob).subscribe(job => {
          
          if(job){
              this.dialogRef.close(job);
            }
            this.dialogRef.close();
          }   
        )
      } else{
          this.jobData.update(newJob).subscribe(job => {
            this.dialogRef.close(job);
          })
      }
      this.designationForm.reset();
    }
  }

  chooseTile(val: boolean) {
    if (val) {
      this.title = `Create New Job`
    } else {
      this.title = `Update ${this.designation.jobTitle} Post Details Of ${this.designation.departmentDto?.departmentName}`
    }
  }



  createRequirementFormControl(): FormControl{
    return new FormControl();
  }

  addRequirement(){
    this.keywordGroup.push(this.createRequirementFormControl())
  }

  removeRequirement(index: number){
    this.keywordGroup.removeAt(index)
  }

}
