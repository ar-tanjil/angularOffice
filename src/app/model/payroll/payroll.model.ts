import { NgModel } from "@angular/forms";

export class PayrollTable {
    constructor(
        public id?: number,
        public employeeId?: number,
        public firstName?: string,
        public netPay?: number,
        public period?: Date
    ) { }
}

export class Payroll {
    constructor(
        public id?: number,
        public period?: Date,
        public unpaidLeave?: number,
        public loanPayment?: number,
        public tax?: number,
        public travelAllowance?: number,
        public bonus?: number,
        public basic?: number,
        public medicalAllowance?: number,
        public providentFund?: number,
        public netPay?: number,
        public employeeId?: number
    ) { }
}


export class Salary {
    constructor(
        public id?: number,
        public employeeId?: number,
        public firstName?: string,
        public basic?: number,
        public medicalAllowance?: number,
        public providentFund?: number,
        public jobTitle?: String,
        public departmentName?: string,
        public provident?: number,
        public medical?: number
    ) { }
}


export class Deductions {
    constructor(
        public id?: number,
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
        public id?: number,
        public travelAllowance?: number,
        public bonus?: number,
        public year?: number,
        public month?: number,
        public employeeId?: number
    ) { }
}

export class Tax {
    constructor(
        public id?: number,
        public minRange?: number,
        public maxRange?: number,
        public percentage?: number
    ) {

    }
}

export class AttendanceSheet {
    constructor(
        public present?: boolean[],
        public firstName?: number
    ) { }
}

export class AttendanceDemo {
    constructor(
        public day?: Date,
        public present?: boolean,
        public employeeId?: number
    ) { }
}

export class Attendance {
    constructor(
        public id?: number,
        public day?: string,
        public entryTime?: string,
        public leaveTime?: string,
        public employeeId?: string
    ) { }
}


export class Holiday{
    constructor(
        public id?: number,
        public day?: Date,
        public reason?: string
    ){}
}