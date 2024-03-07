import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/model/department/deparment.model';
import { FormMessage, FormOwner } from 'src/app/model/from.message.service';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { auto } from '@popperjs/core';
import { ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { JobDatasource } from 'src/app/model/designation/job.datasource';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {



  departments: Department[];
  private locator = (employee: Department, id?: number) => employee.id == id;
  private replaySubject: ReplaySubject<Department[]>;


  constructor(
    private depData: JobDatasource, 
    private dialog: MatDialog,
    private toster: ToastrService
    ) {
    this.departments = new Array<Department>();
    this.replaySubject = new ReplaySubject<Department[]>(1);
    this.getDepartments();


  }

  getDepartments() {
    this.depData.getAll().subscribe(emp => {
      this.departments = emp;
      this.replaySubject.next(emp);
      this.replaySubject.complete();
    })
  }


  openDialog() {
    let addSalaryDialog = this.dialog.open(DepartmentFormComponent, {
      height: auto,
      width: '40%',
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      if (ob) {
          this.departments.push(ob);
          this.toster.success("Add New Department");  
      }

    })
  }



  updateDialog(id: number) {

    if (id < 0) {
      return;
    }

    let addSalaryDialog = this.dialog.open(DepartmentFormComponent, {
      height: auto,
      width: '40%',
      data: {
        id: id
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      if (ob) {
        let index = this.departments.findIndex(dep => this.locator(dep, ob.id));
        this.departments.splice(index, 1, ob);
        this.toster.success("Update Successfully")

      }
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

        this.depData.delete(id).subscribe(dep => {
          let index = this.departments.findIndex(item => this.locator(item, id));
          this.departments.splice(index, 1);
            this.toster.warning("Deleted");
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })

  }











}