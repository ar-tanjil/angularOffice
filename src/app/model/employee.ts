export class Employee{
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public hireDate?: Date,
        public email?: string,
        public phoneNumber?: string,
        public job?: number,
        public department?: number,
        public address?: string
    ){}
}