import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/model/application/application';
import { ApplicationDatasource } from 'src/app/model/application/application.datsource';
import { ApplicationModel } from 'src/app/model/application/application.model';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { EmpModel } from 'src/app/model/employee/emp.model';
import { Employee } from 'src/app/model/employee/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-application',
  templateUrl: './details-application.component.html',
  styleUrls: ['./details-application.component.scss']
})
export class DetailsApplicationComponent {

  app!: Application | Employee;
  title: string = "Applicants Details"
  emp!: boolean;



  constructor(private route: ActivatedRoute,
    private appData: ApplicationDatasource,
    private router: Router,
    private empData: EmpDatasource,
    private appModel: ApplicationModel,
    private empModel: EmpModel,
    private toaster: ToastrService
  ) {

    route.params.subscribe(parms => {
      let id = parms["id"];
      if (parms["mode"] == "app") {
        this.app = new Application();
        if (id) {
          appData.getById(id).subscribe(a => {
            this.app = a;
            this.title = a.firstName + " Details"
          })
        }
      } else {
        this.app = new Employee;
        if (id) {
          empData.getById(id).subscribe(e => {
            this.app = e;
            this.title = e.firstName + " Details";
            this.emp = true;
          })
        }
      }

    })
  }

  recruit(id: number) {
    this.appData.recruitFromApplication(id).subscribe((emp) => {
      this.toaster.success("Recruited")
      this.router.navigate(["/profile", emp.id]);
  })



    this.appModel.recruitApplication(id);
  }


  terminate(id: number) {

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

        this.empData.delete(id).subscribe(e => {
          this.router.navigate(["/employee"]);
          this.toaster.warning("Terminated");
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })

  }

  reject(id: number) {

    this.appModel.deleteApplication(id);

  }

}
