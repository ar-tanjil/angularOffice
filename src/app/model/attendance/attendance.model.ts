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

export class Leave{
    constructor(
        public id?: number,
        public day?: Date,
        public type?: string,
        public reason?: string,
        public status?: boolean,
        public employeeId?: number
    ){

    }
}