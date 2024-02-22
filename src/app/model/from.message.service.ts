import { Observable, Subject } from "rxjs";

export class FormMessage{
    message: Observable<FormOwner> = new Subject<FormOwner>();

    sendMessage(value: FormOwner){
        (this.message as Subject<FormOwner>).next(value);
    }
}

export enum FormOwner{
    DEPARTMENT, DESIGNATION, EMPLOYEE, ADDEMPLOYEE
}
