import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { ToDo } from "./todo.model";
import { JWTTokenService } from "../authentication/jwtToken.service";


@Injectable()
export class ToDoDatasource {

    private url: string = "http://localhost:8080/todos";

    constructor(private http: HttpClient, private jwt: JWTTokenService) { };

    getAllByEmployee(): Observable<ToDo[]> {
        let id = this.jwt.getId() ?? '';
      
        return this.sendRequest<ToDo[]>("GET", `${this.url}/employee/${id}`);
    }

    getActiveByEmployee(): Observable<ToDo[]> {
        let id = this.jwt.getId() ?? '';
      
        return this.sendRequest<ToDo[]>("GET", `${this.url}/active/${id}`);
    }

    getCompletedByEmployee(): Observable<ToDo[]> {
        let id = this.jwt.getId() ?? '';
      
        return this.sendRequest<ToDo[]>("GET", `${this.url}/completed/${id}`);
    }

    completTodo(id: number): Observable<ToDo> {  
        return this.sendRequest<ToDo>("GET", `${this.url}/status/${id}`);
    }


    save(toDo: ToDo): Observable<ToDo> {
        let id = this.jwt.getId() ?? '';
        if(id != ''){
            toDo.employeeId = Number(id);
        }
        return this.sendRequest<ToDo>("POST", this.url, toDo);
    }


    deletTodo(id: number):Observable<void>{
        return this.sendRequest<void>("DELETE", `${this.url}/${id}`);
    }

    // update(ToDo: ToDo): Observable<ToDo>{
    //     return this.sendRequest<ToDo>("PUT", `${this.url}/${ToDo.id}`, ToDo);
    // }

    // delete(id: number): Observable<HttpMessage>{
    //   return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    // }


    private sendRequest<T>(verb: string, url: string, body?: ToDo | string): Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw (`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}