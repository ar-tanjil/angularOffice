import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Holiday } from 'src/app/model/payroll/payroll.model';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';
import { auto } from '@popperjs/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent {

  holiday: Holiday[];
  replaySubject: ReplaySubject<Holiday[]>;

  constructor(
    private payData: PayrollDatasource,
    private dialog: MatDialog
  ) {
    this.holiday = new Array<Holiday>();
    this.replaySubject = new ReplaySubject<Holiday[]>(1);
    this.getAllHoliday();
  }



  getAllHoliday() {
    this.payData.getAllHoliday().subscribe(holy => {
      this.holiday = holy;
      this.replaySubject.next(holy);
      this.replaySubject.complete();
    })
  }



  openDialog() {
    let addHolidayDialog = this.dialog.open(HolidayFormComponent, {
      height: auto,
      width: '30%',
      data: {
        id: null
      }
    }
    );
    addHolidayDialog.afterClosed().subscribe(ob => {
      this.getAllHoliday();
    })
  }

  updateDialog(id: number){
    if(id < 0){
      return;
    }

    let updateHolidayDialog = this.dialog.open(HolidayFormComponent, {
      height: auto,
      width: '30%',
      data: {
        id: id
      }
    }
    );
    updateHolidayDialog.afterClosed().subscribe(ob => {
      this.getAllHoliday();
    })
  }


  deleteDialog(id: number){

    
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
          this.payData.deleteHoliday(id).subscribe(tax => {
            this.getAllHoliday();
          })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })

  }

}
