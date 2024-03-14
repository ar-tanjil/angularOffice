export class ToDo {
    constructor(
        public id?: number,
        public description?: string,
        public status?: string,
        public createTime?: Date,
        public employeeId?: number
    ) {}
}