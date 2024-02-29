import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "../httpMessage.model";
import { PayrollTable } from "./payroll.model";

@Injectable()
export class PayrollDatasource{

    private url: string = "http://localhost:8080/payrolls";

    constructor(private http: HttpClient){ };

    getAllByPeriod(year: number, month: number): Observable<PayrollTable[]>{
        return this.sendRequest<PayrollTable[]>("GET", `${this.url}/${year}/${month}`);
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


    private sendRequest<T>(verb: string, url: string, body?: PayrollTable): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

    // Direct method 
    // getDirAll(): Observable<EmployeeTable[]>{
    //     return this.sendRequest<EmployeeTable[]>("GET", this.url);
    // }

}