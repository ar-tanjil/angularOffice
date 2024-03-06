import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Attendance, AttendanceSheet, Holiday, Leave } from "./attendance.model";



@Injectable()
export class AttendanceDatasource{

    private holidayUrl: string = "http://localhost:8080/holidays";
    private leaveUrl: string = "http://localhost:8080/emp_leaves";
    private attendanceUrl: string = "http://localhost:8080/attendances";

    constructor(private http: HttpClient){ };


    // Attendance ---------------------------------------------------

 countTodayAttendance():Observable<number>{
        return this.sendRequest<number>("GET", `${this.attendanceUrl}/count/present`);    
    }

    getAttendanceSheet(start: string, end: string): Observable<AttendanceSheet[]> {
        return this.sendRequest<AttendanceSheet[]>("GET", `${this.attendanceUrl}/${start}/${end}`);
    }

    getCurrentMonthSheet():Observable<|AttendanceSheet[]>{
        return this.sendRequest<AttendanceSheet[]>("GET", `${this.attendanceUrl}/sheet/current_month`)
    }

    getAttendanceByDay(id: number, day: string): Observable<Attendance> {
        return this.sendRequest<Attendance>("GET", `${this.attendanceUrl}/day/${id}/${day}`);
    }

    giveAttendance(id: number): Observable<Attendance> {
        return this.sendRequest<Attendance>("POST", `${this.attendanceUrl}/${id}`);

    }


    // Leave --------------------------------------------
    saveLeave(leave: Leave): Observable<Leave>{
        return this.sendRequest<Leave>("POST", `${this.leaveUrl}`, leave);
    }

    grantLeave():Observable<Leave>{
        return this.sendRequest<Leave>("PUT", `${this.leaveUrl}`);    
    }



    // Holiday ----------------------------------------------


    getAllHoliday():Observable<Holiday[]>{
        return this.sendRequest<Holiday[]>("GET", this.holidayUrl);
    }

    getHolidayById(id: number): Observable<Holiday> {
        return this.sendRequest<Holiday>("GET", `${this.holidayUrl}/${id}`);
    }

    saveHoliday(holiday: Holiday): Observable<Holiday>{
        return this.sendRequest<Holiday>("POST", this.holidayUrl, holiday);
    }

    updateHoliday(holiday: Holiday): Observable<Holiday>{
        return this.sendRequest<Holiday>("PUT", this.holidayUrl, holiday);
    }

    deleteHoliday(id: number): Observable<Holiday>{
        return this.sendRequest<Holiday>("DELETE", `${this.holidayUrl}/${id}`);
    }

    checkHoliday(day: string): Observable<boolean>{
        return this.sendRequest<boolean>("GET", `${this.holidayUrl}/check/${day}`);
    }


    private sendRequest<T>(verb: string, url: string, body?: T): Observable<T>{
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}