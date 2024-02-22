import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "../httpMessage.model";

@Injectable()
export class EmpDatasource{

    private url: string = "http://localhost:8080/employees";

    constructor(private http: HttpClient){ };

    getAll(): Observable<Employee[]>{
        return this.sendRequest<Employee[]>("GET", this.url);
    }

    getById(id: number): Observable<Employee>{
        return this.sendRequest<Employee>("GET", `${this.url}/${id}`);
    }

    save(emp : Employee):Observable<Employee>{
        return this.sendRequest<Employee>("POST", this.url, emp);
    }

    update(emp: Employee): Observable<Employee>{
        return this.sendRequest<Employee>("PUT", `${this.url}/${emp.id}`, emp);
    }

    delete(id: number): Observable<HttpMessage>{
      return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    }


    private sendRequest<T>(verb: string, url: string, body?: Employee): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}