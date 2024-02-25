import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpDatasource } from 'src/app/model/employee/emp.datasource';
import { Employee } from 'src/app/model/employee/employee';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  emp: Employee = new Employee();

  constructor(private data: EmpDatasource, private activerRoute: ActivatedRoute){


  }

  ngOnInit(){

    this.activerRoute.params.subscribe(parms => {
      let id = parms["id"] ?? 1
      this.data.getById(id).subscribe(e => {
        this.emp = e ?? new Employee();
      })
    })
    
  }


}
