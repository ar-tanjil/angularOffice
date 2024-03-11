import { Time } from '@angular/common';
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
          this.day.startTime = this.convertTime(d.startTime??"");
          this.day.endTime = this.convertTime(d.endTime ?? "");
          
          this.officeDayForm.patchValue(this.day);
        })
      }
  }



  convertTime(time : string){
    let t = time.split("\u202F");
    let z = t[0].split(":");
    let hour = z[0];
    let minute = z[1];
    if(t[1] == "PM"){
      hour = (Number(hour) + 12).toString();
    } else if (hour.length < 1){
      hour = "0"+ hour;
    }

    return `${hour}:${minute}`
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
