import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { Leave } from 'src/app/model/attendance/attendance.model';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  panelOpenState = false;

  leaves: Leave[];
  replaySubject: ReplaySubject<Leave[]>;

  constructor(
    private attnData: AttendanceDatasource,
    private toster: ToastrService
    ){
    this.leaves = new Array<Leave>();
    this.replaySubject = new ReplaySubject<Leave[]>(1);
  }

  ngOnInit(): void {
      this.getAllLeaves();
      
  }


  getAllLeaves(){
    this.attnData.getAllLeave().subscribe(leav => {
      this.leaves = leav;
      this.replaySubject.next(leav);
      this.replaySubject.complete();
    })
  }

  grantLeave(id: number){
    if(id < 0){
      return
    }
    this.attnData.grantLeave(id).subscribe(success => {
      if(success){
        this.getAllLeaves();
      } else{
        this.toster.warning("Check Leave Policy")
      }
    })
  }

  rejectLeave(id: number){
    if(id < 0){
      console.log("haa");
      
      return
    }
    console.log(id);
    
    this.attnData.rejectLeave(id).subscribe(success => {
      if(success){
        this.getAllLeaves();
      }
    })
  }

}
