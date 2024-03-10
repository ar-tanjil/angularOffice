import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { OfficeDays } from 'src/app/model/attendance/attendance.model';
import { FormMessage } from 'src/app/model/from.message.service';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss']
})
export class ShiftFormComponent implements OnInit {

  day: OfficeDays;

  constructor(
    public dialogRef: MatDialogRef<ShiftFormComponent>,
    private attenData: AttendanceDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    this.day = new OfficeDays();
  }



  ngOnInit(): void {
      let id = this.data.id;
      if(id){
        this.attenData.getDaysById(id).subscribe(d => {
          this.day = d; 
          this.officeDayForm.patchValue(this.day);
        })
      }
  }


  officeDayForm: FormGroup = new FormGroup({
    id: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    status: new FormControl()
    
  });

  submitForm(){

    Object.assign(this.day, this.officeDayForm.value);
    this.attenData.saveDays(this.day).subscribe(d => {
      this.dialogRef.close(d);  
    })
    

  }

  
  


}
