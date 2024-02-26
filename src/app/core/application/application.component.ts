import { Component } from '@angular/core';
import { DesinationDatasource } from 'src/app/model/designation/desig.datasource';
import { Designation } from 'src/app/model/designation/designation';
import { DesigModel } from 'src/app/model/designation/designation.model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

vacantJobs: Designation[] = new Array <Designation>();

  constructor(private model: DesigModel, private data: DesinationDatasource) {
    this.data.getAllVacanctPost().subscribe(v => {
      this.vacantJobs = v;
    })
  }


  // get getVacantJobs() {
  //   return this.model.getVacantJobs();
  // }


}
