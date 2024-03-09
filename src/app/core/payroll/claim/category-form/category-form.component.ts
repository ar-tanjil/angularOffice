import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {



  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),    
    claimType: new FormControl()
  })

  
  submit(){

  }

}
