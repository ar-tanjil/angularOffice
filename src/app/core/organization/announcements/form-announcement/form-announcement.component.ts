import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnouncementDatasource } from 'src/app/model/announcement/announcement.datasource';
import { Announcement } from 'src/app/model/announcement/announcement.model';
import { Department } from 'src/app/model/department/deparment.model';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';

@Component({
  selector: 'app-form-announcement',
  templateUrl: './form-announcement.component.html',
  styleUrls: ['./form-announcement.component.scss']
})
export class FormAnnouncementComponent {

  title: string = ""
  departmentList: Department[] = [];
  showDepartment: boolean = false;

  constructor(
    private depData: DepartmentDatasource,
    private announData: AnnouncementDatasource,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<FormAnnouncementComponent>
  ) { }


  announcementForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    target: new FormControl(),
    date: new FormControl(),
    subject: new FormControl(),
    description: new FormControl(),
    departmentId: new FormControl()
  })

  submitForm() {
    let announcement = new Announcement();
    Object.assign(announcement, this.announcementForm.value);
    this.announData.save(announcement).subscribe(() => {
        this.dialogRef.close();
    })
  }




  changeTarget(target: string){
    if(target == "DEPARTMENT"){
      this.showDepartment = true;
      this.getDepartments();
    } else{
      this.showDepartment = false;
    }
  }


  getDepartments(){
    this.depData.getAll().subscribe(emp => {
      this.departmentList = emp;
    })
  }


}
