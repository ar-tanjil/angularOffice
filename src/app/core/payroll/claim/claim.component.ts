import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Claim, ClaimCategory } from 'src/app/model/claim/claim.model';
import { EmployeeTable } from 'src/app/model/employee/employee.model';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { auto } from '@popperjs/core';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent {

employeeList: EmployeeTable[];
claimList: Claim[];
categoryList: ClaimCategory[];

constructor(
  private dialog: MatDialog
) {
  this.employeeList = new Array<EmployeeTable>();
  this.claimList = new Array<Claim>();
  this.categoryList = new Array<ClaimCategory>();
}



  searchForm: FormGroup = new FormGroup({
    employeeId: new FormControl()
  })

  search(){

  }




  openClaimDialog() {
    let addSalaryDialog = this.dialog.open(ClaimFormComponent, {
      height: auto,
      width: auto,
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
  
    })
  }

  openCategoyrDialog() {
    let addSalaryDialog = this.dialog.open(CategoryFormComponent, {
      height: auto,
      width: auto,
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
  
    })
  }


}
