import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Announcement } from "./announcement.model";

@Injectable()
export class AnnouncementDatasource{

    private url: string = "http://localhost:8080/announcements";

    constructor(private http: HttpClient){ };

    getAll(): Observable<Announcement[]>{
        return this.sendRequest<Announcement[]>("GET", this.url);
    }

    getById(id: number): Observable<Announcement>{
        return this.sendRequest<Announcement>("GET", `${this.url}/${id}`);
    }

    getByDepartment(id: number): Observable<Announcement>{
        return this.sendRequest<Announcement>("GET", `${this.url}/department/${id}`);
    }

    save(announcement : Announcement):Observable<Announcement>{
        return this.sendRequest<Announcement>("POST", this.url, announcement);
    }

    // update(announcement: Announcement): Observable<Announcement>{
    //     return this.sendRequest<Announcement>("PUT", `${this.url}/${announcement.id}`, announcement);
    // }

    // delete(id: number): Observable<HttpMessage>{
    //   return this.sendRequest<HttpMessage>("DELETE", `${this.url}/${id}`);
    // }


    private sendRequest<T>(verb: string, url: string, body?: Announcement): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}