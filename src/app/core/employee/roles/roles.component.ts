import { Component, OnInit } from '@angular/core';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { User } from 'src/app/model/employee/employee.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  userList: User[] = new Array<User>();

  constructor(private empData: EmployeeDatasource) {
    
  }

  ngOnInit(): void {
      this.getAllUser();
  }

  getAllUser(){
    this.empData.getAllUser().subscribe(u => {
      this.userList = u; 
    })
  }

  changerUserRole(id: number){
    if(id < 1){
      return;
    }
    this.empData.changeRole(id).subscribe(u => {
      this.getAllUser();
    })
  }


}
