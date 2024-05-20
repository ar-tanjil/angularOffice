import { EmployeeTable } from "../employee/employee.model";

export class Department{
    constructor(
        public id?: number,
        public departmentName?: string,
        public managerId?: number,
        public manager?: EmployeeTable,
        public departmentDesc?: string
    ){}
}

export class DepartmentChart{
    constructor(
        public name: string,
        public y: number
    ){}
}