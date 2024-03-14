import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Job} from "./job.model";
import { HttpMessage } from "../httpMessage.model";

@Injectable()
export class JobDatasource{


    private url: string = "http://localhost:8080/designations";

    constructor(private http: HttpClient){ };

    getAll(): Observable<Job[]>{
        return this.sendRequest<Job[]>("GET", this.url);
    }

    getById(id: number): Observable<Job>{
        return this.sendRequest<Job>("GET", `${this.url}/${id}`);
    }

    save(desi : Job):Observable<Job>{
        return this.sendRequest<Job>("POST", this.url, desi);
    }

    update(job: Job): Observable<Job>{
        return this.sendRequest<Job>("PUT", `${this.url}/${job.id}`, job);
    }

    delete(id: number): Observable<HttpMessage>{
      return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    }

    getAllVacantPost():Observable<Job[]>{
        return this.sendRequest<Job[]>("GET",`${this.url}/vacancy`);
    }


    getAllByDeparment(id: number):Observable<Job[]>{
        return this.sendRequest<Job[]>("GET",`${this.url}/departments/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: Job): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }
}