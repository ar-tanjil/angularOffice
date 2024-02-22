import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "./httpMessage.model";

@Injectable()
export class EmpDatasource{

    private url: string = "";

    constructor(private http: HttpClient){ };

    getEmployees(): Observable<Employee[]>{
        return this.sendRequest<Employee[]>("GET", this.url);
    }

    getEmployee(id: number): Observable<Employee>{
        return this.sendRequest<Employee>("GET", `${this.url}/${id}`);
    }

    saveEmployee(emp : Employee):Observable<Employee>{
        return this.sendRequest<Employee>("POST", this.url, emp);
    }

    updateEmployee(emp: Employee): Observable<Employee>{
        return this.sendRequest<Employee>("PUT", `${this.url}/${emp.id}`, emp);
    }

    deleteEmpoloyee(id: number): Observable<HttpMessage>{
      return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    }


    private sendRequest<T>(verb: string, url: string, body?: Employee): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((erorr: Response) => {
            throw(`Network Error: ${erorr.statusText} (${erorr.status})`)
        }));
    }

}