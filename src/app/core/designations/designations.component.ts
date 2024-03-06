import {JobDatasource } from '../../model/designation/job.datasource';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DesigFormComponent } from './desig-form/desig-form.component';
import { auto } from '@popperjs/core';
import { ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Job } from 'src/app/model/designation/job.model';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent {

  designations: Job[];
  private locator = (designation: Job, id?: number) => designation.id == id;
  private replaySubject: ReplaySubject<Job[]>;

  constructor(
    private jobData: JobDatasource,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {
    this.designations = new Array<Job>();
    this.replaySubject = new ReplaySubject<Job[]>();
    this.getAllJobs();
  }



  getAllJobs(): void {

    this.jobData.getAll().subscribe(desig => {
      this.designations = desig;
      this.replaySubject.next(desig);
      this.replaySubject.complete();
    })

  }


  openDialog() {
    let addSalaryDialog = this.dialog.open(DesigFormComponent, {
      height: auto,
      width: '40%',
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      if (ob) {
        this.getAllJobs();
        this.toaster.success("Add New Job");
      }
      this.getAllJobs();

    })
  }


  updateDialog(id: number) {
    if (id < 0) {
      return;
    }

    let addSalaryDialog = this.dialog.open(DesigFormComponent, {
      height: auto,
      width: '40%',
      data: {
        id: id
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      if (ob) {
        this.getAllJobs();
        this.toaster.success("Updated")
      }
      this.getAllJobs();
    })

  }



  delete(id: number) {

    if (id < 0) {
      return;
    }

    Swal.fire({

      title: 'Are you sure want to remove?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',

      cancelButtonText: 'No, keep it'

    }).then((result) => {

      if (result.value) {

        this.jobData.delete(id).subscribe(dep => {
          let index = this.designations.findIndex(item => this.locator(item, id));
          this.designations.splice(index, 1);
          this.toaster.warning("Deleted");
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })
  }


}
