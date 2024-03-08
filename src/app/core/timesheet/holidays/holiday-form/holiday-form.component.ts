import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { Holiday } from 'src/app/model/attendance/attendance.model';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';


@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})
export class HolidayFormComponent implements OnInit {

  title!: string;
  editing: boolean = false;
  holiday: Holiday;

  constructor(
    public dialogRef: MatDialogRef<HolidayFormComponent>,
    private attenData: AttendanceDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    this.holiday = new Holiday();
  }


    ngOnInit(): void {
        if(this.data.id){
          this.getHolidayById(this.data.id);
          this.editing = true;
        }
    }



  holidayForm: FormGroup = new FormGroup({
    id: new FormControl(),
    day: new FormControl(),
    reason: new FormControl()
  });

  submitForm() {
    if(this.holidayForm.valid){
      Object.assign(this.holiday, this.holidayForm.value);
      if(this.editing){
        this.attenData.updateHoliday(this.holiday).subscribe(holy => {
          this.dialogRef.close(holy);
        })
      } else{
        this.attenData.saveHoliday(this.holiday).subscribe(holy => {
          this.dialogRef.close(holy);
        })
      }
    }
  }



  getHolidayById(id: number) {
    if (id < 0) {
      return;
    }
    this.attenData.getHolidayById(id).subscribe(holy => {
      this.holiday = holy;
      this.holidayForm.patchValue(this.holiday);
    })
  }


}
