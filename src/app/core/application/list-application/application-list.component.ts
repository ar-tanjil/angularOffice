import { ApplicationDatasource } from 'src/app/model/application/application.datsource';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Application, ApplicationTable } from 'src/app/model/application/application.model';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit{

  applicationList: ApplicationTable[];
  replaySubject: ReplaySubject<ApplicationTable[]>;

  constructor(private appData: ApplicationDatasource){
    
    this.applicationList = new Array<ApplicationTable>();
    this.replaySubject = new ReplaySubject<ApplicationTable[]>(1);

  }


  ngOnInit(): void {
      this.getApplicationList();
  }

  
  getApplicationList(){
    this.appData.getAllTable().subscribe(app => {
      this.applicationList = app;
      this.replaySubject.next(app);
      this.replaySubject.complete();
    })
  }


  

}
