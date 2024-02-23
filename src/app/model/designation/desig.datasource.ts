import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Designation } from "./designation";
import { HttpMessage } from "../httpMessage.model";

@Injectable()
export class DesinationDatasource{


    private url: string = "http://localhost:8080/designations";

    constructor(private http: HttpClient){ };

    getAll(): Observable<Designation[]>{
        return this.sendRequest<Designation[]>("GET", this.url);
    }

    getById(id: number): Observable<Designation>{
        return this.sendRequest<Designation>("GET", `${this.url}/${id}`);
    }

    save(desi : Designation):Observable<Designation>{
        return this.sendRequest<Designation>("POST", this.url, desi);
    }

    update(dep: Designation): Observable<Designation>{
        return this.sendRequest<Designation>("PUT", `${this.url}/${dep.id}`, dep);
    }

    delete(id: number): Observable<HttpMessage>{
      return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    }

    getAllVacanctPost():Observable<Designation[]>{
        return this.sendRequest<Designation[]>("GET",`${this.url}/vacancy`);
    }

    private sendRequest<T>(verb: string, url: string, body?: Designation): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }
}