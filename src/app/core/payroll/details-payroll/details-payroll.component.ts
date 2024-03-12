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


toWord(num: number) {
    if (num < 0)
      return false;
	 let single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
	let  double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
	let below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
	if (num === 0) return 'Zero'
	function translate(num: number) {
	  let	word: string  = ""
		if (num < 10) {
			word = single_digit[num] + ' '
		}
		else if (num < 20) {
			word = double_digit[num - 10] + ' '
		}
		else if (num < 100) {
		let	rem = translate(num % 10)
			word = below_hundred[(num - num % 10) / 10 - 2] + ' ' + rem
		}
		else if (num < 1000) {
			word = single_digit[Math.trunc(num / 100)] + ' Hundred ' + translate(num % 100)
		}
		else if (num < 1000000) {
			word = translate(num / 1000).trim() + ' Thousand ' + translate(num % 1000)
		}
		else if (num < 1000000000) {
			word = translate(num / 1000000).trim() + ' Million ' + translate(num % 1000000)
		}
		else {
			word = translate(num / 1000000000).trim() + ' Billion ' + translate(num % 1000000000)
		}
		return word
	}
	let result = translate(num) 
	return result.trim()+' Taka'
}


}
