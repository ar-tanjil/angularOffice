import { Injectable } from "@angular/core";
// import { Message } from "./message.model";
import { Observable, ReplaySubject, Subject } from "rxjs";

@Injectable()
export class RefreshService {
    
    messages: ReplaySubject<Refreash> = new ReplaySubject<Refreash>(1);

    reportMessage(msg: Refreash) {
        (this.messages as Subject<Refreash>).next(msg);
    }
}

export enum Refreash{
    EMP_TABLE, APP_TABLE, JOB_TABLE, VAC_TABLE, DEP_TABLE
}
