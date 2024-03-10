import { Time } from "@angular/common";
import { EmployeeTable } from "../employee/employee.model";

export class AttendanceSheet {
    constructor(
        public present?: boolean[],
        public firstName?: number
    ) { }
}


export class Attendance {
    constructor(
        public id?: number,
        public day?: string,
        public checkIn?: string,
        public checkOut?: string,
        public employeeId?: string,
        public employeeName?: string,
        public checkInStatus?: string,
        public checkOutStatus?: string
    ) { }
}


export class Holiday {
    constructor(
        public id?: number,
        public day?: Date,
        public reason?: string
    ) { }
}

export class Leave {
    constructor(
        public id?: number,
        public day?: Date,
        public type?: string,
        public reason?: string,
        public status?: string,
        public employeeId?: number,
        public employeeName?: string
    ) {

    }
}

export class LeavePolicy {
    constructor(
        public id?: number,
        public medical?: number,
        public casual?: number,
        public medicalSpent?: number,
        public casualSpent?: number,
        public unpaidSpent?: number,
        public employee?: EmployeeTable,
        public employeeId?: number
    ) { }
}

export class TimePeriod {
    constructor(
        public startDate?: Date,
        public endDate?: Date
    ) {

    }
}

export class OfficeDays {
    constructor(
        public id?: number,
        public day?: string,
        public startTime?: Time,
        public endTime?: Time,
        public status?: string
    ) { }
}