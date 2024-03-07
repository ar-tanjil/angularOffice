import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Tax } from 'src/app/model/payroll/payroll.model';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { auto } from '@popperjs/core';
import { ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent {

  taxTable: Tax[];
  private replaySubject: ReplaySubject<Tax[]>;
  private locator = (tax: Tax, id?: number) => tax.id == id;
  constructor(
    private payData: PayrollDatasource,
    private dialog: MatDialog,
    private toaster: ToastrService
    ){
      this.taxTable = new Array<Tax>();
      this.replaySubject = new ReplaySubject<Tax[]>(1);
      this.getAllTax();

    }



    getAllTax(){
      this.payData.getAllTax().subscribe(tax => {
        this.taxTable = tax;
        this.replaySubject.next(tax);
        this.replaySubject.complete();
      })
    }



  openDialog(){
    let addSalaryDialog = this.dialog.open(AddTaxComponent, {
      height: auto,
      width: auto,
      data: {
        id: null
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
        if(ob){
         this.getAllTax();
        }
    })
  }

  
  updateDialog(id: number){

    if(id < 0){
      return;
    }

    let addSalaryDialog = this.dialog.open(AddTaxComponent, {
      height: auto,
      width: '30%',
      data: {
        id: id
      }
    }
    );
    addSalaryDialog.afterClosed().subscribe(ob => {
        if(ob){
          let index = this.taxTable.findIndex(item => this.locator(item, ob.id));
          this.taxTable.splice(index, 1, ob);
        }
    })
  }


  
  delete(id: number) {

    if (id < 0) {
      return;
    }

    Swal.fire({

      title: 'Are you sure want to remove?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',

      cancelButtonText: 'No, keep it'

    }).then((result) => {

      if (result.value) {
          this.payData.deleteTax(id).subscribe(tax => {
            this.getAllTax();
          })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })
  }




}
