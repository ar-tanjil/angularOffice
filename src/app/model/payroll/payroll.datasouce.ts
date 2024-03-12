import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Payroll, PayrollTable, Salary, Tax } from "./payroll.model";

@Injectable()
export class PayrollDatasource {

    private payrollUrl: string = "http://localhost:8080/payrolls";
    private salaryUrl: string = "http://localhost:8080/salaries";
    private taxUrl: string = "http://localhost:8080/taxes";
 


    constructor(private http: HttpClient) { };

    //Payroll --------------------------------------------- 

    deleteAllPayroll():Observable<void>{
        return this.sendRequest<void>("GET", `${this.payrollUrl}/refresh`);
    }

    deletePayrollById(id: number):Observable<void>{
        return this.sendRequest<void>("DELETE", `${this.payrollUrl}/${id}`);    
    }


    processPayrollByPeriod(year: number, month: number): Observable<PayrollTable[]> {
        return this.sendRequest<PayrollTable[]>("GET", `${this.payrollUrl}/process/${year}/${month}`);
    }

    getPendingPayroll(): Observable<PayrollTable[]> {
        return this.sendRequest<PayrollTable[]>("GET", `${this.payrollUrl}/pending`);
    }

    getPaymentPayroll(): Observable<PayrollTable[]> {
        return this.sendRequest<PayrollTable[]>("GET", `${this.payrollUrl}/payment`);
    }

    getPayrollByEmpAndPeriod(empId: number, year: number, month: number): Observable<Payroll> {
        return this.sendRequest<Payroll>("GET", `${this.payrollUrl}/employee/${empId}/${year}/${month}`);
    }

    getPayrollById(id: number): Observable<Payroll> {
        return this.sendRequest<Payroll>("GET", `${this.payrollUrl}/${id}`);
    }

    paymentPayroll(id:number){
        return this.sendRequest<Payroll>("GET", `${this.payrollUrl}/payment/${id}`);
    }

    // Salary---------------------------------------


    countTotalSalary():Observable<number>{
        return this.sendRequest<number>("GET", `${this.salaryUrl}/sum/salary`);     
    }

    getSalaryByEmployee(id: number): Observable<Salary> {
        return this.sendRequest<Salary>("GET", `${this.salaryUrl}/${id}`);
    }

    saveSalaryByEmployee(salary: Salary): Observable<Salary> {
        return this.sendRequest<Salary>("POST", `${this.salaryUrl}/${salary.employeeId}`, salary)
    }

    updateSalaryByEmployee(salary: Salary): Observable<Salary> {
        return this.sendRequest<Salary>("PATCH", `${this.salaryUrl}/${salary.employeeId}`, salary)
    }

    getAllSalary(): Observable<Salary[]> {
        return this.sendRequest<Salary[]>("GET", this.salaryUrl);
    }

   

    // Tax ----------------------------------------------------------

    getAllTax():Observable<Tax[]>{
        return this.sendRequest<Tax[]>("GET", this.taxUrl);
    }

    getTaxById(id: number): Observable<Tax> {
        return this.sendRequest<Tax>("GET", `${this.taxUrl}/${id}`);
    }

    saveTax(tax: Tax): Observable<Tax>{
        return this.sendRequest<Tax>("POST", this.taxUrl, tax);
    }

    updateTax(tax: Tax): Observable<Tax>{
        return this.sendRequest<Tax>("PUT", this.taxUrl, tax);
    }

    deleteTax(id: number): Observable<Tax>{
        return this.sendRequest<Tax>("DELETE", `${this.taxUrl}/${id}`);
    }

   
    

    private sendRequest<T>(verb: string, url: string,body?: T, params?:HttpParams): Observable<T> {

        return this.http.request<T>(verb, url, {
            body: body,
            params: params
        }).pipe(catchError((error: Response) => {
            throw (`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}