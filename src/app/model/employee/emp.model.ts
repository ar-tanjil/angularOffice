import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { EmpDatasource } from "./emp.datasource";
import { Observable, ReplaySubject } from "rxjs";

@Injectable()
export class EmpModel {

    private employees: Employee[];
    private locator = (employee: Employee, id?: number) => employee.id == id;
    private replaySubject: ReplaySubject<Employee[]>;

    constructor(private datasouce: EmpDatasource) {
        this.employees = new Array<Employee>();
        this.replaySubject = new ReplaySubject<Employee[]>(1);
        this.datasouce.getAll().subscribe(emp => {
            this.employees = emp;
            this.replaySubject.next(emp);
            this.replaySubject.complete();
        })
    }

    getEmployees(): Employee[] {
        return this.employees;
    }

    getEmployee(id: number): Employee | undefined {
        return this.employees.find((emp) => this.locator(emp, id));
    }

    getEmployeeObservable(id: number): Observable<Employee | undefined>{
        let subject = new ReplaySubject<Employee | undefined>(1);
        this.replaySubject.subscribe(emp => {
            subject.next(emp.find(e => this.locator(e, id)));
            subject.complete();
        })
        return subject;
    }

    deleteEmployee(id: number) {
        this.datasouce.delete(id).subscribe(() => {
            let index = this.employees.findIndex(emp => this.locator(emp, id));
            if (index > -1) {
                this.employees.splice(index, 1);
            }
        })
    }

    saveEmployee(employee: Employee) {
        if (employee.id == 0 || employee.id == null) {
            this.datasouce.save(employee)
                .subscribe(emp => this.employees.push(emp));
        } else {
            this.datasouce.update(employee)
                .subscribe(emp => {
                    let index = this.employees.findIndex(item => {
                        this.locator(item, emp.id);
                    });

                    this.employees.splice(index, 1, emp);
                })
        }
    }

}