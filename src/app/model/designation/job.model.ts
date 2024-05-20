import { Department } from "../department/deparment.model";
import { EmployeeTable } from "../employee/employee.model";

export class Job{
    constructor(
       public id?: number,
       public jobTitle?: string,
       public minSalary?: number,
       public maxSalary?: number,
       public departmentId?: number,
       public totalPost?: number,
       public vacancy?: number,
       public requirements?: string[],
       public departmentDto?: Department,
       public employeeTables?: EmployeeTable[]
    ){}
}