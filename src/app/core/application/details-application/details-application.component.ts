import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/model/application/application';
import { ApplicationDatasource } from 'src/app/model/application/application.datsource';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { Employee } from 'src/app/model/employee/employee';

@Component({
  selector: 'app-details-application',
  templateUrl: './details-application.component.html',
  styleUrls: ['./details-application.component.scss']
})
export class DetailsApplicationComponent {

  app!:Application | Employee;
  title: string = "Applicants Details"
  emp!: boolean;



  constructor(private route: ActivatedRoute, private data : ApplicationDatasource,
    private router: Router, private empData: EmpDatasource
    ){

    route.params.subscribe(parms => {
      let id = parms["id"];
      if(parms["mode"] == "app"){
        this.app = new Application();
      if(id){
        data.getById(id).subscribe(a => {
          this.app = a;
          this.title = a.firstName + " Details"
        })
      }
      } else{
          this.app = new Employee;
          if(id){
            empData.getById(id).subscribe(e => {
              this.app = e;
              this.title = e.firstName + " Details";
              this.emp = true;
            })
          }
      }
      
    })
  }

  recruit(id: number){
    this.data.recruitFromApplication(id).subscribe((a) => {
      this.router.navigate(['/profile', a.id])
      
    });
  }


  terminate(id: number){
    if(id > 0){
      this.empData.delete(id).subscribe(e => {
        this.router.navigate(['/employee']);
      })
    }
    
  }

reject(id: number){
  if(id > -1){
    this.data.delete(id).subscribe(() => {
      this.router.navigate(["/applicationList"]);
    })
  }
}

}
