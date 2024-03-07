import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApplicationDatasource } from "./application/application.datsource";
import { PayrollDatasource } from "./payroll/payroll.datasouce";
import { NotificationService } from "./notification/notifiaction.data";
import { EmployeeDatasource } from "./employee/employee.datasource";
import { DepartmentDatasource } from "./department/department.datasource";
import { JobDatasource } from "./designation/job.datasource";
import { AttendanceDatasource } from "./attendance/attendance.datasource";
import { UniversalAppInterceptor } from "./authentication/httpHeaderService";
import { AuthenticationDatasource } from "./authentication/auth.datasource";
import { LocalStorageService } from "./authentication/storageService";

@NgModule({
    declarations: [],
    providers: [
        ApplicationDatasource,
        EmployeeDatasource,
        DepartmentDatasource,
        JobDatasource,
        AttendanceDatasource,
        PayrollDatasource,
        NotificationService,
        AuthenticationDatasource,
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
    ],
    imports: [HttpClientModule]
})
export class ModelModule{

}