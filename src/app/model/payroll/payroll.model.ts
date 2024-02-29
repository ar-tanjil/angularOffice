export class PayrollTable {
    constructor(
        public employeeId?: number,
        public firstName?: string,
        public netPay?: number,
        public period?: Date
    ) { }
}

export class Salary {
    constructor(
        public employeeId?: number,
        public basic?: number,
        public medicalAllowance?: number,
        public providentFund?: number
    ) { }
}


export class Deductions {
    constructor(
        public employeeId?: number,
        public unpaidLeave?: number,
        public loanPayment?: number,
        public tax?: number,
        public year?: number,
        public month?: string
    ) { }
}


export class Additions {
    constructor(
        public travelAllowance?: number,
        public bonus?: number,
        public year?: number,
        public month?: number,
        public employeeId?: number
    ) { }
}