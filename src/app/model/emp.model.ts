import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { EmpDatasource } from "./emp.datasource";

@Injectable()
export class EmpModel {

    private employees: Employee[];
    private locator = (employee: Employee, id?: number) => employee.id == id;

    constructor(private datasouce: EmpDatasource) {
        this.employees = new Array<Employee>();
        this.datasouce.getEmployees().forEach(emp => this.employees.push(emp));
    }

    getEmployees(): Employee[] {
        return this.employees;
    }

    getEmployee(id: number): Employee | undefined {
        return this.employees.find((emp) => this.locator(emp, id));
    }

    editEmployee(employee: Employee) {
        let index = this.employees.findIndex(emp => this.locator(emp, employee.id));
        this.employees.splice(index, 1, employee);
    }

    deleteEmployee(id: number) {
        let index = this.employees.findIndex((emp) => this.locator(emp, id));
        this.employees.splice(index, 1);
    }

    saveEmployee(employee: Employee) {
        this.employees.push(employee);
    }

}