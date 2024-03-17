import { Component, OnInit } from '@angular/core';
import { ShiftFormComponent } from './shift-form/shift-form.component';
import { auto } from '@popperjs/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { OfficeDays, Rule } from 'src/app/model/attendance/attendance.model';
import { RulesFormComponent } from './rules-form/rules-form.component';
import { RolesComponent } from '../../employee/roles/roles.component';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';

@Component({
  selector: 'app-office-shift',
  templateUrl: './office-shift.component.html',
  styleUrls: ['./office-shift.component.scss']
})
export class OfficeShiftComponent implements OnInit {


  days: OfficeDays[];
  rules: Rule[];
  admin: boolean = false;

  constructor(
    private attenData: AttendanceDatasource,
    private dialog: MatDialog,
    private jwtService: JWTTokenService
  ){
    this.days = new Array<OfficeDays>();
    this.rules = new Array<Rule>();
    this.admin = jwtService.getRole() == "ADMIN";
  }


  ngOnInit(): void {
   this.getAllDays(); 
   this.getAllRules();
  }

  getAllDays(){
    this.attenData.getAllDays().subscribe(d => {
      this.days = d;
    })
  }

  getAllRules(){
    this.attenData.getAllRules().subscribe(r => {
      this.rules = r;
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

  changeRules(id: number){
    if(id < 0){
      return;
    }

    let addHolidayDialog = this.dialog.open(RulesFormComponent, {
      height: auto,
      width: '30%',
      data: {
        id: id
      }
    }
    );
    addHolidayDialog.afterClosed().subscribe(ob => {
      if(ob){
        this.getAllRules()
      }
    })
  }

}
