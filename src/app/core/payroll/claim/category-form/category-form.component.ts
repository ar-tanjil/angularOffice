import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClaimDatasource } from 'src/app/model/claim/claim.datasource';
import { ClaimCategory } from 'src/app/model/claim/claim.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {



  constructor(
    private claimData: ClaimDatasource,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ){

  }



  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),    
    claimType: new FormControl()
  })

  
  submit(){
    let category = new ClaimCategory();
    Object.assign(category, this.categoryForm.value);
    console.log(category);
    
    this.claimData.saveClaimCategory(category).subscribe(c => {
      this.dialogRef.close(c);
    })
  }

}
