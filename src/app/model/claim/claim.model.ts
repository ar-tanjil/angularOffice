import { EmployeeTable } from "../employee/employee.model"

export class Claim{
   
   constructor(
    public id?: number,
   public title?: string,
   public claimStatus?: string,
   public amount?: number,
   public date?: Date,
   public  claimCategory?: ClaimCategory,
   public employee?: EmployeeTable,
   public employeeId?: number,
   public categoryId?: number
   ){

   }
}

export class ClaimCategory{
   
   constructor(
    public id?: number,
   public name?: string,
   public claimType?: string

   ){}
}