import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeTable } from 'src/app/model/employee/employee.model';
import { ClaimComponent } from '../claim.component';
import { Claim, ClaimCategory } from 'src/app/model/claim/claim.model';

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.scss']
})
export class ClaimFormComponent {

  admin: boolean = true;
  employeeList: EmployeeTable[];
  categoryList: ClaimCategory[];
  claim: Claim;

  constructor(

  ){
    this.employeeList = new Array<EmployeeTable>();
    this.categoryList = new Array<ClaimCategory>();
    this.claim = new Claim();
  }



  claimForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    claimStatus: new FormControl(),
    amount : new FormControl(),
    date: new FormControl(),
    employeeId: new FormControl(),
    categoryId: new FormControl()
  })

  submit(){

  }

}
