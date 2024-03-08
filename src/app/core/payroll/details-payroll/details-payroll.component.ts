import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Payroll } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-details-payroll',
  templateUrl: './details-payroll.component.html',
  styleUrls: ['./details-payroll.component.scss']
})
export class DetailsPayrollComponent implements OnInit {

  payrollId!: number;
  payroll: Payroll;

  constructor(
    private payData: PayrollDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (data.id) {
      this.payrollId = this.data.id;
    }

    this.payroll = new Payroll();
  }


  ngOnInit(): void {
      if(this.payrollId){
        this.getPayrollById(this.payrollId);
      }
  }



  getPayrollById(id: number){
    this.payData.getPayrollById(id).subscribe(pay => {
      this.payroll = pay;
    })
  }




}
