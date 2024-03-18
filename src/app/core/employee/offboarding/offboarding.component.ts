import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { EmployeeTable } from 'src/app/model/employee/employee.model';

@Component({
  selector: 'app-offboarding',
  templateUrl: './offboarding.component.html',
  styleUrls: ['./offboarding.component.scss']
})
export class OffboardingComponent implements OnInit {


  employeeList: EmployeeTable[];

  constructor(
    private empData: EmployeeDatasource
  ) {
    this.employeeList = new Array<EmployeeTable>();
  }

  ngOnInit(): void {
      this.getAllEmployeeList()
  }



  terminationForm: FormGroup = new FormGroup({
    employeeId: new FormControl(),
    separationDate: new FormControl()
  })

  submit(){}



  getAllEmployeeList() {
    this.empData.getAll().subscribe(list => {
      this.employeeList = list;
    })
  }



}
