import { Component } from '@angular/core';
import { DesigModel } from 'src/app/model/designation/designation.model';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent {

  constructor(private model: DesigModel){

  }

  get getDesignations(){
   return this.model.getDesignations();
  }



}
