import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeTable } from 'src/app/model/employee/employee.model';
import { ClaimComponent } from '../claim.component';
import { Claim, ClaimCategory } from 'src/app/model/claim/claim.model';
import { ClaimDatasource } from 'src/app/model/claim/claim.datasource';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.scss']
})
export class ClaimFormComponent implements OnInit {

  admin: boolean = true;
  employeeList: EmployeeTable[];
  categoryList: ClaimCategory[];
  claim: Claim;

  constructor(
    private claimData: ClaimDatasource,
    private empData: EmployeeDatasource,
    public dialogRef: MatDialogRef<ClaimFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    this.employeeList = new Array<EmployeeTable>();
    this.categoryList = new Array<ClaimCategory>();
    this.claim = new Claim();
  }


ngOnInit(): void {
    this.getAllCategory();
    this.getAllEmployeeShort()
    
    
}


  claimForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    claimStatus: new FormControl(),
    amount: new FormControl(),
    date: new FormControl(),
    employeeId: new FormControl(),
    categoryId: new FormControl()
  })

  submit() {
    let claim = new Claim();
    Object.assign(claim, this.claimForm.value);
    console.log(claim);
    

    this.claimData.saveClaim(claim).subscribe(c => {
      this.dialogRef.close(c);
    })
  }


  getAllCategory(){
    this.claimData.getAllClaimCategory().subscribe(c => {
      this.categoryList = c;
      console.log(this.categoryList);
    })
  }

  getAllEmployeeShort(){
    this.empData.getAll().subscribe(e => {
      this.employeeList = e;
    })
  }

}
