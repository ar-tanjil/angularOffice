import { Component, OnInit } from '@angular/core';
import { ShiftFormComponent } from './shift-form/shift-form.component';
import { auto } from '@popperjs/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { OfficeDays } from 'src/app/model/attendance/attendance.model';

@Component({
  selector: 'app-office-shift',
  templateUrl: './office-shift.component.html',
  styleUrls: ['./office-shift.component.scss']
})
export class OfficeShiftComponent implements OnInit {


  days: OfficeDays[];

  constructor(
    private attenData: AttendanceDatasource,
    private dialog: MatDialog
  ){
    this.days = new Array<OfficeDays>();
  }


  ngOnInit(): void {
   this.getAllDays(); 
  }

  getAllDays(){
    this.attenData.getAllDays().subscribe(d => {
      this.days = d;
    })
  }


  updateDialog(id: number) {

    if(id < 0){
      return;
    }

    let addHolidayDialog = this.dialog.open(ShiftFormComponent, {
      height: auto,
      width: '30%',
      data: {
        id: id
      }
    }
    );
    addHolidayDialog.afterClosed().subscribe(ob => {
      if(ob){
        this.getAllDays()
      }
    })
  }

}
