import { Department } from "../department/deparment.model";

export class Announcement{
    constructor(
       public id?: number,
       public title?: string,
       public target?: string,
       public date?: Date,
       public subject?: string,
       public description?: string,
       public departmentId?: number,
       public departmentDto?: Department
    ) {
        
    }
}