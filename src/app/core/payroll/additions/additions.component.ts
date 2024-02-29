import { Salary } from 'src/app/model/payroll/payroll.model';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additions',
  templateUrl: './additions.component.html',
  styleUrls: ['./additions.component.scss']
})
export class AdditionsComponent {



  additionsForm: FormGroup = new FormGroup({

  });

  submit(){

  }


}
