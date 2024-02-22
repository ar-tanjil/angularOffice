import { Injectable } from "@angular/core";
import { Designation } from "./designation";
import { Observable, ReplaySubject } from "rxjs";
import { DesinationDatasource } from "./desig.datasource";

@Injectable()
export class DesigModel{

    
    private designations: Designation[];
    private locator = (employee: Designation, id?: number) => employee.id == id;
    private replaySubject: ReplaySubject<Designation[]>;

    constructor(private datasouce: DesinationDatasource) {
        this.designations = new Array<Designation>();
        this.replaySubject = new ReplaySubject<Designation[]>(1);
        this.datasouce.getAll().subscribe(desig => {
            this.designations = desig;
            this.replaySubject.next(desig);
            this.replaySubject.complete();
        })
    }

    getDesignations(): Designation[] {
        return this.designations;
    }

    getDesignation(id: number): Designation | undefined {
        return this.designations.find((desig) => this.locator(desig, id));
    }

    getDesignationObservable(id: number): Observable<Designation | undefined>{
        let subject = new ReplaySubject<Designation | undefined>(1);
        this.replaySubject.subscribe(emp => {
            subject.next(emp.find(e => this.locator(e, id)));
            subject.complete();
        })
        return subject;
    }

    deleteDesignation(id: number) {
        this.datasouce.delete(id).subscribe(() => {
            let index = this.designations.findIndex(dep => this.locator(dep, id));
            if (index > -1) {
                this.designations.splice(index, 1);
            }
        })
    }

    saveDesignation(designation: Designation) {
        if (designation.id == 0 || designation.id == null) {
            this.datasouce.save(designation)
                .subscribe(deisg => this.designations.push(deisg));
        } else {
            this.datasouce.update(designation)
                .subscribe(desig => {
                    let index = this.designations.findIndex(item => {
                        this.locator(item, desig.id);
                    });

                    this.designations.splice(index, 1, desig);
                })
        }
    }

}