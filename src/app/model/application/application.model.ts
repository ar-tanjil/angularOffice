import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from "rxjs";
import { Application } from "./application";
import { ApplicationDatasource } from "./application.datsource";
import { Employee } from "../employee/employee";
import { DesigModel } from "../designation/designation.model";
import { Designation } from "../designation/designation";

@Injectable()
export class ApplicationModel{

    
    private applications: Application[];
    private locator = (app: Application, id?: number) => app.id == id;
    private replaySubject: ReplaySubject<Application[]>;

    constructor(private datasouce: ApplicationDatasource, private desigModel: DesigModel) {
        this.applications = new Array<Application>();
        this.replaySubject = new ReplaySubject<Application[]>(1);
        this.datasouce.getAll().subscribe(app => {
            this.applications = app;
            this.replaySubject.next(app);
            this.replaySubject.complete();
        });
    }

    getApplications(): Application[] {
        return this.applications;
    }

    getApplication(id: number): Application | undefined {
        return this.applications.find((app) => this.locator(app, id));
    }

    getOrgiJob(id: number): Observable<Designation>{
        return this.desigModel.getOrgDesiganation(id);
    }

    getApplicationObservable(id: number): Observable<Application | undefined>{
        let subject = new ReplaySubject<Application | undefined>(1);
        this.replaySubject.subscribe(app => {
            subject.next(app.find(a => this.locator(a, id)));
            subject.complete();
        })
        return subject;
    }

    deleteApplication(id: number) {
        this.datasouce.delete(id).subscribe(() => {
            let index = this.applications.findIndex(app => this.locator(app, id));
            if (index > -1) {
                this.applications.splice(index, 1);
            }
        })
    }

    saveApplication(application: Application) {
        if (application.id == 0 || application.id == null) {
            this.datasouce.save(application)
                .subscribe(app => this.applications.push(app));
        } else {
            this.datasouce.update(application)
                .subscribe(app => {
                    let index = this.applications.findIndex(item => {
                        this.locator(item, app.id);
                    });

                    this.applications.splice(index, 1, app);
                })
        }
    }

    recruit(id: number){
        let replay = new ReplaySubject<Employee>(1);
        this.datasouce.recruitFromApplication(id).subscribe(emp => {
                replay.next(emp);
                replay.complete();
                this.deleteApplication(id);
        });
    }

}