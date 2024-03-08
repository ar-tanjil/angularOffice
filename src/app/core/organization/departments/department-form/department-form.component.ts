import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/model/department/deparment.model';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';
import { JobDatasource } from 'src/app/model/designation/job.datasource';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {

  title: string = ""
  department: Department = new Department();
  editing: boolean = false;
  constructor(
    private depData: DepartmentDatasource,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<DepartmentFormComponent>
  ) {

      if (this.data.id) {
        this.depData.getById(this.data.id).subscribe(dep => {
          this.department = dep;
          this.departmentForm.patchValue(this.department);
          this.editing = true;
        })
      }
  }


  departmentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    departmentName: new FormControl("", Validators.required),
    managerId: new FormControl(),
    mangagerName: new FormControl(),
    departmentDesc: new FormControl()
  })

  submitForm() {
    if (this.departmentForm.valid) {
      Object.assign(this.department, this.departmentForm.value);
      if (this.editing) {
        this.depData.update(this.department).subscribe(dep => {
          this.dialogRef.close(dep);

        })
      } else {
        this.depData.save(this.department).subscribe(dep => {
          console.log(dep);
          
            this.dialogRef.close(dep);
        })
      }

    }
  }

}
