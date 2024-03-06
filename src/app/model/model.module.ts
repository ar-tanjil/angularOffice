import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApplicationDatasource } from "./application/application.datsource";
import { PayrollDatasource } from "./payroll/payroll.datasouce";
import { NotificationService } from "./notification/notifiaction.data";
import { EmployeeDatasource } from "./employee/employee.datasource";
import { DepartmentDatasource } from "./department/department.datasource";
import { JobDatasource } from "./designation/job.datasource";
import { AttendanceDatasource } from "./attendance/attendance.datasource";

@NgModule({
    declarations: [],
    providers: [
        ApplicationDatasource,
        EmployeeDatasource,
        DepartmentDatasource,
        JobDatasource,
        AttendanceDatasource,
        PayrollDatasource,
        NotificationService
    ],
    imports: [HttpClientModule]
})
export class ModelModule{

}