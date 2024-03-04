import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "../httpMessage.model";
import { Attendance, AttendanceSheet, Holiday, Payroll, PayrollTable, Salary, Tax } from "./payroll.model";

@Injectable()
export class PayrollDatasource {

    private payUrl: string = "http://localhost:8080/payrolls";
    private salUrl: string = "http://localhost:8080/salaries";
    private attUrl: string = "http://localhost:8080/attendances";
    private taxUrl: string = "http://localhost:8080/taxes";
    private holiUrl: string = "http://localhost:8080/holidays";


    constructor(private http: HttpClient) { };

    getPayrollByPeriod(year: number, month: number): Observable<PayrollTable[]> {
        return this.sendRequest<PayrollTable[]>("GET", `${this.payUrl}/${year}/${month}`);
    }

    getPayrollByEmpAndPeriod(empId: number, year: number, month: number): Observable<Payroll> {
        return this.sendRequest<Payroll>("GET", `${this.payUrl}/${empId}/${year}/${month}`);
    }

    getSalaryByEmployee(id: number): Observable<Salary> {
        return this.sendRequest<Salary>("GET", `${this.salUrl}/${id}`);
    }

    saveSalaryByEmployee(salary: Salary): Observable<Salary> {
        return this.sendRequest<Salary>("POST", `${this.salUrl}/${salary.employeeId}`, salary)
    }

    updateSalaryByEmployee(salary: Salary): Observable<Salary> {
        return this.sendRequest<Salary>("PATCH", `${this.salUrl}/${salary.employeeId}`, salary)
    }

    getAllSalary(): Observable<Salary[]> {
        return this.sendRequest<Salary[]>("GET", this.salUrl);
    }

    getAttendanceSheet(start: string, end: string): Observable<AttendanceSheet[]> {
        return this.sendRequest<AttendanceSheet[]>("GET", `${this.attUrl}/${start}/${end}`);
    }

    getAttendanceByDay(id: number, day: string): Observable<Attendance> {
        return this.sendRequest<Attendance>("GET", `${this.attUrl}/day/${id}/${day}`);
    }

    giveAttendance(id: number): Observable<Attendance> {
        return this.sendRequest<Attendance>("POST", `${this.attUrl}/${id}`);

    }

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

    getAllHoliday():Observable<Holiday[]>{
        return this.sendRequest<Holiday[]>("GET", this.holiUrl);
    }

    getHolidayById(id: number): Observable<Holiday> {
        return this.sendRequest<Holiday>("GET", `${this.holiUrl}/${id}`);
    }

    saveHoliday(holiday: Holiday): Observable<Holiday>{
        return this.sendRequest<Holiday>("POST", this.holiUrl, holiday);
    }

    updateHoliday(holiday: Holiday): Observable<Holiday>{
        return this.sendRequest<Holiday>("PUT", this.holiUrl, holiday);
    }

    deleteHoliday(id: number): Observable<Holiday>{
        return this.sendRequest<Holiday>("DELETE", `${this.holiUrl}/${id}`);
    }

    checkHoliday(day: string): Observable<boolean>{
        return this.sendRequest<boolean>("GET", `${this.holiUrl}/check/${day}`);
    }

    // getById(id: number): Observable<Employee>{
    //     return this.sendRequest<Employee>("GET", `${this.url}/${id}`);
    // }

    // save(emp : Employee):Observable<Employee>{
    //     return this.sendRequest<Employee>("POST", this.url, emp);
    // }

    // update(emp: Employee): Observable<Employee>{
    //     return this.sendRequest<Employee>("PUT", `${this.url}/${emp.id}`, emp);
    // }

    // delete(id: number): Observable<HttpMessage>{
    //   return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    // }


    private sendRequest<T>(verb: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw (`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

    // Direct method 
    // getDirAll(): Observable<EmployeeTable[]>{
    //     return this.sendRequest<EmployeeTable[]>("GET", this.url);
    // }

}