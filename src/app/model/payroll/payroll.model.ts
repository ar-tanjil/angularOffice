export class PayrollTable{
    constructor(
       public employeeId?: number,
       public firstName?: string,
       public netPay?: number,
       public period?: Date
    ){}
}