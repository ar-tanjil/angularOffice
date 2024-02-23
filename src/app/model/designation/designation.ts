import { publishFacade } from "@angular/compiler";

export class Designation{
    constructor(
       public id?: number,
       public jobTitle?: string,
       public minSalary?: number,
       public maxSalary?: number,
       public departmentName?: string,
       public departmentId?: number,
       public totalPost?: number,
       public vacancy?: number
    ){}
}