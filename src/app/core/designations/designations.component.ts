import { DesinationDatasource } from './../../model/designation/desig.datasource';
import { Component } from '@angular/core';
import { Designation } from 'src/app/model/designation/designation';
import { DesigModel } from 'src/app/model/designation/designation.model';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent {

  designationTable: Designation[] = new Array<Designation>()

  constructor(private model: DesinationDatasource){
    this.model.getAll().subscribe(desig => {
      this.designationTable = desig;
    })
    
  }




}
