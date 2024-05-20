import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { Rule } from 'src/app/model/attendance/attendance.model';

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.scss']
})
export class RulesFormComponent implements OnInit {

  rule: Rule;

  constructor(
    public dialogRef: MatDialogRef<RulesFormComponent>,
    private attenData: AttendanceDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    this.rule = new Rule();
  }



  ngOnInit(): void {

    if (this.data.id) {
      this.getRule(this.data.id)
    }

  }



  rulesForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    inTime: new FormControl(),
    outTime: new FormControl(),
    penalty: new FormControl()
  })


  submitForm() {
    Object.assign(this.rule, this.rulesForm.value);
    this.attenData.saveRule(this.rule).subscribe(r => {
      this.dialogRef.close(r);
    })
  }


  getRule(id: number) {
    this.attenData.getRuleById(id).subscribe(r => {
      this.rule = r;
      this.rule.inTime = this.convertTime(this.rule.inTime ?? "")
      this.rule.outTime = this.convertTime(this.rule.outTime ?? "")
      this.rulesForm.patchValue(this.rule);
    })
  }



  convertTime(time: string) {

    let t = time.split("\u202F");
    let z = t[0].split(":");
    let hour = z[0];
    let minute = z[1];
    if (t[1] == "PM" && Number(hour) < 12) {
      hour = (Number(hour) + 12).toString();
    } else if (t[1] == "AM" && Number(hour) == 12) {
      hour = "00";
    }
    else if (hour.length == 1) {
      hour = "0" + hour;
    }

    return `${hour}:${minute}`
  }


}
