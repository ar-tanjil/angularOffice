import { NgModule } from "@angular/core";
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from "src/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ModelModule } from "../model/model.module";
import { AppRoutingModule } from "../app-routing.module";
import { RegisterFormComponent } from './employee-table/register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopnavComponent } from "./navbar/topnav/topnav.component";
import { SidenavComponent } from "./navbar/sidenav/sidenav.component";
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { PayrollComponent } from './payroll/payroll.component';
import { DepartmentFormComponent } from './departments/department-form/department-form.component';
import { DesigFormComponent } from './designations/desig-form/desig-form.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationFormComponent } from './application/form-application/application-form.component';
import { ApplicationListComponent } from './application/list-application/application-list.component';
import { DetailsApplicationComponent } from './application/details-application/details-application.component';
import { AddSalaryComponent } from './payroll/add-salary/add-salary.component';
import { DeductionsComponent } from './payroll/deductions/deductions.component';
import { AdditionsComponent } from './payroll/additions/additions.component';
import { TaxComponent } from './payroll/tax/tax.component';
import { SalaryDetailsComponent } from './payroll/salary-details/salary-details.component';
import { AddTaxComponent } from './payroll/tax/add-tax/add-tax.component';
import { AttendanceComponent } from "./employee-table/attendance/attendance.component";
import { CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";
import { EmpDepChartComponent } from "./dashbord/emp-dep-chart/emp-dep-chart.component";
import { LeavesComponent } from './employee-table/leaves/leaves.component';
import { HolidayComponent } from './employee-table/holiday/holiday.component';
import { PayslipComponent } from './payroll/payslip/payslip.component';
import { HolidayFormComponent } from './employee-table/holiday/holiday-form/holiday-form.component';
import { NotificationComponent } from './navbar/notification/notification.component';
import { LeaveRequestComponent } from './profile/leave-request/leave-request.component';
import { DemoFormComponent } from './demo/demo-form/demo-form.component';
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [
        NavbarComponent,
        EmployeeTableComponent,
        DashbordComponent,
        RegisterFormComponent,
        ProfileComponent,
        TopnavComponent,
        SidenavComponent,
        DepartmentsComponent,
        DesignationsComponent,
        PayrollComponent,
        DepartmentFormComponent,
        DesigFormComponent,
        ApplicationComponent,
        ApplicationFormComponent,
        ApplicationListComponent,
        DetailsApplicationComponent,
        AddSalaryComponent,
        DeductionsComponent,
        AdditionsComponent,
        TaxComponent,
        SalaryDetailsComponent,
        AddTaxComponent,
        AttendanceComponent,
        EmpDepChartComponent,
        LeavesComponent,
        HolidayComponent,
        PayslipComponent,
        HolidayFormComponent,
        NotificationComponent,
        LeaveRequestComponent,
        DemoFormComponent,
        LoginComponent
    ],
    exports: [
        NavbarComponent,
        EmployeeTableComponent,
        DashbordComponent,
        RegisterFormComponent,
        ProfileComponent,
        TopnavComponent,
        SidenavComponent,
        DepartmentsComponent,
        DesignationsComponent,
        PayrollComponent,
        DepartmentFormComponent,
        DesigFormComponent,
        ApplicationComponent,
        ApplicationFormComponent,
        AddSalaryComponent,
        AttendanceComponent,
        LeaveRequestComponent,
        FormsModule,
        ReactiveFormsModule,
        LoginComponent
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        ModelModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CanvasJSAngularChartsModule
    ]
})
export class CoreModule {

}