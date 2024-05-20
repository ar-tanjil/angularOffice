import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { HttpMessage } from "../httpMessage.model";
import { AuthModel, JwtToken } from "./auth.model";

@Injectable()
export class AuthenticationDatasource{

    private url: string = "http://localhost:8080/office/auth";

    constructor(private http: HttpClient){ };

    proceedLogin(log: AuthModel):Observable<JwtToken>{
        return this.sendRequest<JwtToken>("POST", `${this.url}/login`, log);
    }

    private sendRequest<T>(verb: string, url: string, body?: AuthModel): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }



     // getAll(): Observable<Department[]>{
    //     return this.sendRequest<Department[]>("GET", this.url);
    // }

    // getById(id: number): Observable<Department>{
    //     return this.sendRequest<Department>("GET", `${this.url}/${id}`);
    // }

    // save(dep : Department):Observable<Department>{
    //     return this.sendRequest<Department>("POST", this.url, dep);
    // }

    // update(dep: Department): Observable<Department>{
    //     return this.sendRequest<Department>("PUT", `${this.url}/${dep.id}`, dep);
    // }

    // delete(id: number): Observable<HttpMessage>{
    //   return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    // }


}