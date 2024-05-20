import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApplicationDatasource } from "./application/application.datsource";
import { PayrollDatasource } from "./payroll/payroll.datasouce";
import { EmployeeDatasource } from "./employee/employee.datasource";
import { DepartmentDatasource } from "./department/department.datasource";
import { JobDatasource } from "./designation/job.datasource";
import { AttendanceDatasource } from "./attendance/attendance.datasource";
import { UniversalAppInterceptor } from "./authentication/httpHeaderService";
import { AuthenticationDatasource } from "./authentication/auth.datasource";
import { LocalStorageService } from "./authentication/storageService";
import { NotificationService } from "./notification/notification.service";
import { NotificationData } from "./notification/notifiaction.data";
import { ClaimDatasource } from "./claim/claim.datasource";
import { AnnouncementDatasource } from "./announcement/announcement.datasource";
import { ToDoDatasource } from "./ToDo/todo.datasource";
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
        NotificationData,
        AuthenticationDatasource,
        LocalStorageService,
        ClaimDatasource,
        AnnouncementDatasource,
        ToDoDatasource,
        { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
    ],
    imports: [HttpClientModule]
})
export class ModelModule{

}