import { Injectable } from "@angular/core";
import { Employee } from "./employee";

@Injectable()
export class EmpDatasource{

   private employee: Employee[];

    constructor(){
        this.employee = new Array<Employee>(
            new Employee(1, "Ashiqur", "Rahman", new Date(), "artanjil@gmail.com", "01720691000",
            "Manager", "Administration"),
            
            new Employee(2, "Rafiul", "Abeer", new Date(), "abeer@gmail.com", "017245789541",
            "Trainee", "Administration")
        )
    }

    getEmployees(): Employee[]{
        return this.employee;
    }
}