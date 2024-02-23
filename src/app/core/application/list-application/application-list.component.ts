import { Component } from '@angular/core';
import { Application } from 'src/app/model/application/application';
import { ApplicationModel } from 'src/app/model/application/application.model';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent {


  constructor(private model: ApplicationModel){

    
  }

  get getApplications(): Application[]{
    return this.model.getApplications();
  }

  recruit(id: number){
    this.model.recruit(id);
  }

}
