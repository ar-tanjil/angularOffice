import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Tax } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {

  editing: boolean = false;
  tax: Tax;
  constructor(
    private payData: PayrollDatasource,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddTaxComponent>
  ) {
    this.tax = new Tax();
  }

  ngOnInit(): void {
      if(this.data.id){
        this.getTaxById(this.data.id);
        this.editing = true;
      }
  }




  taxForm: FormGroup = new FormGroup({
    id: new FormControl(),
    minRange: new FormControl(),
    maxRange: new FormControl(),
    percentage: new FormControl()
  });



  submit() {
    if (this.taxForm.valid) {
      Object.assign(this.tax, this.taxForm.value);
      if (this.editing) {
       
        this.payData.updateTax(this.tax).subscribe(tax => {
          this.dialogRef.close(tax);
        })


      } else {
        this.payData.saveTax(this.tax).subscribe(tax => {
          this.dialogRef.close(tax);
        })
      }
    }
  }


  getTaxById(id: number) {
    this.payData.getTaxById(id).subscribe(tax => {
      this.tax = tax;
      this.taxForm.patchValue(this.tax);
    })
  }


}
