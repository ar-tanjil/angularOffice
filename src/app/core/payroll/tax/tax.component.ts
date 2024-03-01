import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Tax } from 'src/app/model/payroll/payroll.model';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent {

  taxTable!: Tax[];

  constructor(private payData: PayrollDatasource,
    private dialog: MatDialog){}



  openDialog(){
    let addSalaryDialog = this.dialog.open(AddTaxComponent, {
      height: auto,
      width: '30%'
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {

    })
  }

}
