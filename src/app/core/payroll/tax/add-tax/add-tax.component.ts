import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent {








  taxForm: FormGroup = new FormGroup({
    id: new FormControl(),
    minRange: new FormControl("", Validators.pattern("^[1-9][0-9]+$")),
    maxRange: new FormControl("", Validators.pattern("^[1-9][0-9]+$")),
    percentage: new FormControl("", [
      Validators.pattern("^[1-9][0-9]+$"),
      Validators.max(2)
    ])
  });

  submit(){
    
  }


}
