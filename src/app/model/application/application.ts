export class Application{

    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public dob?: Date,
        public email?: string,
        public phoneNumber?: string,
        public ssc?: string,
        public sscPassingYear?: Date,
        public hsc?: string,
        public hscPassingYear?: Date,
        public undergraduate?: string,
        public undergraduatePassingYear?: Date,
        public postgraduate?: string,
        public postgraduatePassingYear?: Date,
        public zipCode?: string,
        public roadNo?: string,
        public city?: string,
        public country?: string,
        public jobId?: number,
        public reference?: string,
        public jobTitle?: string,
        public departmentName?: string

    ){
    }
}

export interface ApplicationTable{
    id: number;
    name: string;
    jobTitle: string;
    departmentName: string;
}