import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/model/application/application';
import { ApplicationDatasource } from 'src/app/model/application/application.datsource';
import { ApplicationModel } from 'src/app/model/application/application.model';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { EmpModel } from 'src/app/model/employee/emp.model';
import { Employee } from 'src/app/model/employee/employee';

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
    private data: ApplicationDatasource,
    private router: Router,
    private empData: EmpDatasource,
    private appModel: ApplicationModel,
    private empModel: EmpModel
  ) {

    route.params.subscribe(parms => {
      let id = parms["id"];
      if (parms["mode"] == "app") {
        this.app = new Application();
        if (id) {
          data.getById(id).subscribe(a => {
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
    this.appModel.recruitApplication(id);
  }


  terminate(id: number) {
    this.empModel.deleteEmployee(id);
    this.router.navigate(["/employee"]);
  }

  reject(id: number) {

    this.appModel.deleteApplication(id);

  }

}
