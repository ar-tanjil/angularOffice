import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Claim, ClaimCategory } from 'src/app/model/claim/claim.model';
import { EmployeeTable } from 'src/app/model/employee/employee.model';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { auto } from '@popperjs/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ClaimDatasource } from 'src/app/model/claim/claim.datasource';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  employeeList: EmployeeTable[];
  claimList: Claim[];
  categoryList: ClaimCategory[];

  constructor(
    private dialog: MatDialog,
    private claimData: ClaimDatasource,
    private toaster: ToastrService
  ) {
    this.employeeList = new Array<EmployeeTable>();
    this.claimList = new Array<Claim>();
    this.categoryList = new Array<ClaimCategory>();
  }



  ngOnInit(): void {
    this.getAllCategory();
    this.getAllClaim();
  }

  getAllCategory() {
    this.claimData.getAllClaimCategory().subscribe(c => {
      this.categoryList = c;
    })
  }


  getAllClaim() {
    this.claimData.getAllClaim().subscribe(c => {
      this.claimList = c;
    })
  }



  searchForm: FormGroup = new FormGroup({
    employeeId: new FormControl()
  })

  search() {

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
      this.getAllClaim();
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
      this.getAllCategory()
    })
  }


  acceptClaim(id: number) {
    if (id < 0) {
      return;
    }
    this.claimData.acceptClaim(id).subscribe(b => {
      this.getAllClaim();
    });
  }

  rejectClaim(id: number) {
    if (id < 0) {
      return;
    }

    this.claimData.rejectClaim(id).subscribe(b => {
      this.getAllClaim();
    })

  }

  buttonShow(claimStatus: string) {
    if (claimStatus == 'ONPROCESS' || claimStatus == 'PAYMENT') {
      return false;
    }
    return true;
  }


}
