import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';
import { FormAnnouncementComponent } from './form-announcement/form-announcement.component';
import { auto } from '@popperjs/core';
import { Announcement } from 'src/app/model/announcement/announcement.model';
import { AnnouncementDatasource } from 'src/app/model/announcement/announcement.datasource';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  announcementList: Announcement[] = [];

  constructor(
    private annData: AnnouncementDatasource,
    private dialog: MatDialog,
    private toster: ToastrService
  ){}



  ngOnInit(): void {
      this.getAllAnnoucnement();
  }


  openDialog() {
    let addSalaryDialog = this.dialog.open(FormAnnouncementComponent, {
      height: auto,
      width: '40%',
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
    
      this.getAllAnnoucnement();
    })
  }



  getAllAnnoucnement(){
    this.annData.getAll().subscribe(ann => {
      this.announcementList = ann;
    });
  }



}
