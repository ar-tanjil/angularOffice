import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';
import { auto } from '@popperjs/core';
import Swal from 'sweetalert2';
import { Holiday } from 'src/app/model/attendance/attendance.model';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent {

  admin: boolean = false;
  holiday: Holiday[];
  replaySubject: ReplaySubject<Holiday[]>;

  constructor(
    private attenData: AttendanceDatasource,
    private dialog: MatDialog,
    private jwtService: JWTTokenService
  ) {
    this.holiday = new Array<Holiday>();
    this.replaySubject = new ReplaySubject<Holiday[]>(1);
    this.getAllHoliday();
    this.admin = jwtService.getRole() == "ADMIN";
  }



  getAllHoliday() {
    this.attenData.getAllHoliday().subscribe(holy => {
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
          this.attenData.deleteHoliday(id).subscribe(tax => {
            this.getAllHoliday();
          })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })

  }

}
