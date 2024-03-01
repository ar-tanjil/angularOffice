import { DesinationDatasource } from './../../model/designation/desig.datasource';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Designation } from 'src/app/model/designation/designation';
import { DesigModel } from 'src/app/model/designation/designation.model';
import { DesigFormComponent } from './desig-form/desig-form.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent {

  designationTable: Designation[] = new Array<Designation>()

  constructor(
    private model: DesinationDatasource,
    private dialog: MatDialog
    ){
    this.model.getAll().subscribe(desig => {
      this.designationTable = desig;
    })
    
  }




  openDialog() {
    let addSalaryDialog = this.dialog.open(DesigFormComponent, {
      height: auto,
      width: '40%'
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
      
    })
}




}
