import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToDoDatasource } from 'src/app/model/ToDo/todo.datasource';
import { ToDo } from 'src/app/model/ToDo/todo.model';
import { AttendanceDatasource } from 'src/app/model/attendance/attendance.datasource';
import { JWTTokenService } from 'src/app/model/authentication/jwtToken.service';
import { LocalStorageService } from 'src/app/model/authentication/storageService';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  totalEmployee: number = 0;
  totalSalary: number = 0;
  todayPresent: number = 0;
  allTodo: ToDo[] = [];




  constructor(
    private payData: PayrollDatasource,
    private empData: EmployeeDatasource,
    private attenData: AttendanceDatasource,
    private todoData: ToDoDatasource
  ) {


  }


  ngOnInit(): void {
    this.getTodayPresentNumber();
    this.getTotalEmployee();
    this.getTotalSalary();
    this.getAllToDo();
  }



  getTotalEmployee() {
    this.empData.countEmployee().subscribe(total => {
      this.totalEmployee = total;
    })
  }

  getTotalSalary() {
    this.payData.countTotalSalary().subscribe(total => {
      this.totalSalary = total;
    })
  }

  getTodayPresentNumber() {
    this.attenData.countTodayAttendance().subscribe(total => {
      this.todayPresent = total;
    })
  }







  // --------------- TO DO


  getAllToDo() {
    this.todoData.getAllByEmployee()?.subscribe(todo => {
      this.allTodo = todo;
    })
  }
  getActive(){
    this.todoData.getActiveByEmployee().subscribe(todo => {
      this.allTodo = todo;
    })
  }

  getCompleted(){
    this.todoData.getCompletedByEmployee().subscribe(todo => {
      this.allTodo = todo;
    })
  }


  changeTodo(id: number, cheker: any){
    if(id == -1){
      return;
    }
    if(cheker.value){
      this.todoData.completTodo(id).subscribe(a =>{
        this.getAllToDo();
      }
    )}
  }

  saveTodo(task: any) {

    if (!task.value) {
      return
    }

    let todo = new ToDo();
    todo.description = task.value;
   
    this.todoData.save(todo).subscribe(() => {
      this.getAllToDo();
      task.value = ""
    })
  }

  deleteTodo(id: number){
    if(id == -1){
      return;
    }

    this.todoData.deletTodo(id).subscribe(a => {
      this.getAllToDo();
    })
  }




}
