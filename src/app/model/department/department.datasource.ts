import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Department, DepartmentChart } from "./deparment.model";
import { HttpMessage } from "../httpMessage.model";

@Injectable()
export class DepartmentDatasource{

    private url: string = "http://localhost:8080/departments";

    constructor(private http: HttpClient){ };

    getAll(): Observable<Department[]>{
        return this.sendRequest<Department[]>("GET", this.url);
    }

    getById(id: number): Observable<Department>{
        return this.sendRequest<Department>("GET", `${this.url}/${id}`);
    }

    save(dep : Department):Observable<Department>{
        return this.sendRequest<Department>("POST", this.url, dep);
    }

    update(dep: Department): Observable<Department>{
        return this.sendRequest<Department>("PUT", `${this.url}/${dep.id}`, dep);
    }

    delete(id: number): Observable<HttpMessage>{
      return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    }



    getChartData(): Observable<DepartmentChart[]>{
        return this.sendRequest<DepartmentChart[]>("GET", `${this.url}/chart/dep`);
      }
    


    private sendRequest<T>(verb: string, url: string, body?: Department): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}