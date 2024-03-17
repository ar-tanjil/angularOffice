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
  todayOnLeave: number = 0;
  allTodo: ToDo[] = [];
  name: string = "";
  greeting: string = "";




  constructor(
    private payData: PayrollDatasource,
    private empData: EmployeeDatasource,
    private attenData: AttendanceDatasource,
    private todoData: ToDoDatasource,
    private jwtService: JWTTokenService
  ) {


  }


  ngOnInit(): void {
    this.getTodayPresentNumber();
    this.getTotalEmployee();
    this.getTotalSalary();
    this.getAllToDo();
    this.getOnLeave();
    this.getName();
    this.greetingMethod();
  }


  getName(){
   this.name =  this.jwtService.getName() ?? "";
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


  getOnLeave() {
    this.attenData.countLeaveToday().subscribe(n => {
      this.todayOnLeave = n;
    })
  }


 greetingMethod(){
    let myDate = new Date();
    console.log(myDate);
    
    let hrs = myDate.getHours();
  console.log(hrs);
  
    let greet = "";

    if (hrs < 12)
      greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      greet = 'Good Evening';

    this.greeting =  greet;
  }



  // --------------- TO DO


  getAllToDo() {
    this.todoData.getAllByEmployee()?.subscribe(todo => {
      this.allTodo = todo;
    })
  }
  getActive() {
    this.todoData.getActiveByEmployee().subscribe(todo => {
      this.allTodo = todo;
    })
  }

  getCompleted() {
    this.todoData.getCompletedByEmployee().subscribe(todo => {
      this.allTodo = todo;
    })
  }


  changeTodo(id: number, cheker: any) {
    if (id == -1) {
      return;
    }
    if (cheker.value) {
      this.todoData.completTodo(id).subscribe(a => {
        this.getAllToDo();
      }
      )
    }
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

  deleteTodo(id: number) {
    if (id == -1) {
      return;
    }

    this.todoData.deletTodo(id).subscribe(a => {
      this.getAllToDo();
    })
  }




}
