export class Department{
    constructor(
        public id?: number,
        public departmentName?: string,
        public managerId?: number,
        public managerName?: string,
        public departmentDesc?: string
    ){}
}

export class DepartmentChart{
    constructor(
        
        public name: string,
        public y: number
    ){}
}