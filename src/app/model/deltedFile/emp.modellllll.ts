// import { Injectable } from "@angular/core";
// import { Employee, EmployeeTable } from "./employee";
// import { EmpDatasource } from "./emp.datasource";
// import { Observable, Observer, ReplaySubject, Subject } from "rxjs";
// import { DepModel } from "../department/department.model";
// import { DesigModel } from "../designation/designation.model";
// import { Department } from "../department/deparment";
// import { Designation } from "../designation/job.model";
// import { Refreash, RefreshService } from "../msgService/refereshService";

// @Injectable()
// export class EmpModel {

//     private employees: EmployeeTable[];
//     private locator = (employee: EmployeeTable, id?: number) => employee.id == id;
//     private replaySubject: ReplaySubject<EmployeeTable[]>;

//     constructor(
//         private datasouce: EmpDatasource,
//         private depModel: DepModel,
//         private desigModel: DesigModel,
//         private refreash: RefreshService
//     ) {
//         this.employees = new Array<EmployeeTable>();
//         this.replaySubject = new ReplaySubject<EmployeeTable[]>(1);
//         this.loadData();

//         this.refreash.messages.subscribe(val => {
//             if (val == Refreash.EMP_TABLE) {
//             this.replaySubject = new ReplaySubject<EmployeeTable[]>(1);
//             this.loadData();
//             }
//         })
//     }

//     private loadData() {
//         this.datasouce.getAll().subscribe(emp => {
//             this.employees = emp;
//             this.replaySubject.next(emp);
//             this.replaySubject.complete();
//         })
//     }



//     getEmployees(): EmployeeTable[] {
//         return this.employees;
//     }


//     getEmployeeObservable(id: number): Observable<EmployeeTable | undefined> {
//         let subject = new ReplaySubject<EmployeeTable | undefined>(1);
//         this.replaySubject.subscribe(emp => {
//             subject.next(emp.find(e => this.locator(e, id)));
//             subject.complete();
//         })
//         return subject;
//     }

//     deleteEmployee(id: number) {
//         this.datasouce.delete(id).subscribe(() => {
//             let index = this.employees.findIndex(emp => this.locator(emp, id));
//             if (index > -1) {
//                 this.employees.splice(index, 1);
//             }
//         })
//     }

//     saveEmployee(employee: Employee) {
//         if (employee.id == undefined || employee.id == null) {
//             this.datasouce.save(employee)
//                 .subscribe(emp => {
//                     let employee = new EmployeeTable();
//                     Object.assign(employee, emp);
//                     this.employees.push(employee)
//                 });
//         } else {
//             this.datasouce.update(employee)
//                 .subscribe(emp => {
//                     let index = this.employees.findIndex(item => {
//                         this.locator(item, emp.id);
//                     });
//                     let employee = new EmployeeTable();
//                     Object.assign(employee, emp);
//                     this.employees.splice(index, 1, employee);
//                 })
//         }
//     }
//     // All my new Method 

//     getOrgEmployee(id: number): Observable<Employee> {
//         return this.datasouce.getById(id);
//     }


//     getDeprtmentList(): Department[] {
//         return this.depModel.getDepartments();
//     }

//     getDesignationList(): Designation[] {
//         return this.desigModel.getDesignations();
//     }



// }