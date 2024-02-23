import { Component } from '@angular/core';
import { DesigModel } from 'src/app/model/designation/designation.model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {


  constructor(private model: DesigModel,) {

  }


  get getVacantJobs() {
    return this.model.getVacantJobs();
  }


}
