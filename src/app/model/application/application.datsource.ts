
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "../httpMessage.model";
import { Application, ApplicationTable } from "./application.model";
import { Employee } from "../employee/employee.model";

@Injectable()
export class ApplicationDatasource{

    private url: string = "http://localhost:8080/applications";

    constructor(private http: HttpClient){ };

    getAll(): Observable<Application[]>{
        return this.sendRequest<Application[]>("GET", this.url);
    }

    getAllTable(): Observable<ApplicationTable[]>{
        return this.sendRequest<ApplicationTable[]>("GET", this.url);
        
    }

    getById(id: number): Observable<Application>{
        return this.sendRequest<Application>("GET", `${this.url}/${id}`);
    }

    save(dep : Application):Observable<Application>{
        return this.sendRequest<Application>("POST", this.url, dep);
    }

    update(dep: Application): Observable<Application>{
        return this.sendRequest<Application>("PUT", `${this.url}/${dep.id}`, dep);
    }

    delete(id: number): Observable<HttpMessage>{
      return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    }



    recruitFromApplication(id: number):Observable<Employee>{
        return this.sendRequest<Employee>("GET", `${this.url}/recruit/${id}`);
    }


    private sendRequest<T>(verb: string, url: string, body?: Application): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}