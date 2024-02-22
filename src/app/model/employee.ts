export class Employee{
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public hireDate?: Date,
        public email?: string,
        public phone?: string,
        public jobTitle?: string,
        public departmentName?: string,
    ){}
}