import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Attendance, AttendanceSheet, Holiday, Leave, LeavePolicy, OfficeDays, Rule, TimePeriod } from "./attendance.model";



@Injectable()
export class AttendanceDatasource {

    private holidayUrl: string = "http://localhost:8080/holidays";
    private leaveUrl: string = "http://localhost:8080/emp_leaves";
    private attendanceUrl: string = "http://localhost:8080/attendances";
    private leavePolicyUrl: string = "http://localhost:8080/leavePolicies";
    private officeDaysUrl: string = "http://localhost:8080/days";
    private officeRulesUrl: string = "http://localhost:8080/rules";

    constructor(private http: HttpClient) { };


    // Attendance ---------------------------------------------------

    countTodayAttendance(): Observable<number> {
        return this.sendRequest<number>("GET", `${this.attendanceUrl}/count/present`);
    }

    getAttendanceSheet(start: string, end: string): Observable<AttendanceSheet[]> {
        return this.sendRequest<AttendanceSheet[]>("GET", `${this.attendanceUrl}/sheet/${start}/${end}`);
    }

    
    getAttendanceLog(period: TimePeriod): Observable<Attendance[]> {
        return this.sendRequest<Attendance[]>("POST", `${this.attendanceUrl}/table`, period);
    }

    getAttendanceLogByEmp(period: TimePeriod, id: number): Observable<Attendance[]> {
        return this.sendRequest<Attendance[]>("POST", `${this.attendanceUrl}/table/${id}`, period);
    }

    getAttendanceByDay(id: number, day: string): Observable<Attendance> {
        return this.sendRequest<Attendance>("GET", `${this.attendanceUrl}/day/${id}/${day}`);
    }

    giveAttendance(id: number): Observable<Attendance> {
        return this.sendRequest<Attendance>("GET", `${this.attendanceUrl}/${id}`);

    }

    giveMockAttendance(id: number): Observable<Attendance> {
        return this.sendRequest<Attendance>("GET", `${this.attendanceUrl}/give/employee/${id}`);

    }


    // Leave --------------------------------------------
    saveLeave(leave: Leave): Observable<Leave> {
        return this.sendRequest<Leave>("POST", `${this.leaveUrl}`, leave);
    }

    grantLeave(id: number): Observable<boolean> {
        return this.sendRequest<boolean>("GET", `${this.leaveUrl}/grant/${id}`);
    }


    rejectLeave(id: number): Observable<boolean> {
        return this.sendRequest<boolean>("GET", `${this.leaveUrl}/reject/${id}`);
    }

    getAllLeave(): Observable<Leave[]> {
        return this.sendRequest<Leave[]>("GET", `${this.leaveUrl}`);
    }

    countLeaveToday():Observable<number>{
        return this.sendRequest<number>("GET", `${this.leaveUrl}/on_leave`);    
    }


    // Holiday ----------------------------------------------


    getAllHoliday(): Observable<Holiday[]> {
        return this.sendRequest<Holiday[]>("GET", this.holidayUrl);
    }

    getHolidayById(id: number): Observable<Holiday> {
        return this.sendRequest<Holiday>("GET", `${this.holidayUrl}/${id}`);
    }

    saveHoliday(holiday: Holiday): Observable<Holiday> {
        return this.sendRequest<Holiday>("POST", this.holidayUrl, holiday);
    }

    updateHoliday(holiday: Holiday): Observable<Holiday> {
        return this.sendRequest<Holiday>("PUT", this.holidayUrl, holiday);
    }

    deleteHoliday(id: number): Observable<Holiday> {
        return this.sendRequest<Holiday>("DELETE", `${this.holidayUrl}/${id}`);
    }

    checkHoliday(day: string): Observable<boolean> {
        return this.sendRequest<boolean>("GET", `${this.holidayUrl}/check/${day}`);
    }

// Leave Policy -------------------------------------------------

    getPolicyByEmployee(id: number): Observable<LeavePolicy>{
        return this.sendRequest<LeavePolicy>("GET", `${this.leavePolicyUrl}/${id}`);
    }

    saveLeavePolicy(leavePolicy: LeavePolicy): Observable<LeavePolicy> {
        return this.sendRequest<LeavePolicy>("POST", this.leavePolicyUrl, leavePolicy);
    }


    getAllLeavePolicy():Observable<LeavePolicy[]>{
        return this.sendRequest<LeavePolicy[]>("GET",`${this.leavePolicyUrl}`);
    }

    
    checkMedicalLeavePolicy(id: number):Observable<boolean>{
        return this.sendRequest<boolean>("GET",`${this.leavePolicyUrl}/check/medical/${id}`);
    }

    checkCasualLeavePolicy(id: number):Observable<boolean>{
        return this.sendRequest<boolean>("GET",`${this.leavePolicyUrl}/check/casual/${id}`);
    }


// Days -------------------------------------------

    getAllDays():Observable<OfficeDays[]>{
        return this.sendRequest<OfficeDays[]>("GET",`${this.officeDaysUrl}`);   
    }

    getDaysById(id: number):Observable<OfficeDays>{
        return this.sendRequest<OfficeDays>("GET",`${this.officeDaysUrl}/${id}`);   
    }

    saveDays(day: OfficeDays): Observable<OfficeDays>{
        return this.sendRequest<OfficeDays>("PUT",`${this.officeDaysUrl}/${day.id}`, day);       
    }


    // ------------------------------- Attendance Rule

    getAllRules():Observable<Rule[]>{
        return this.sendRequest<Rule[]>("GET",`${this.officeRulesUrl}`);   
    }

    getRuleById(id: number):Observable<Rule>{
        return this.sendRequest<Rule>("GET",`${this.officeRulesUrl}/${id}`);   
    }

    saveRule(rule: Rule): Observable<Rule>{
        return this.sendRequest<Rule>("PUT",`${this.officeRulesUrl}/${rule.id}`, rule);       
    }

    private sendRequest<T>(verb: string, url: string, body?: T | TimePeriod): Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body
        }).pipe(catchError((error: Response) => {
            throw (`Network Error: ${error.statusText} (${error.status})`)
        }));
    }

}