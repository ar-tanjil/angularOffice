import { NgModule } from "@angular/core";
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from "src/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { EmployeeTableComponent } from './employee/employee-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ModelModule } from "../model/model.module";
import { AppRoutingModule } from "../app-routing.module";
import { RegisterFormComponent } from './employee/emploee-from/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopnavComponent } from "./navbar/topnav/topnav.component";
import { SidenavComponent } from "./navbar/sidenav/sidenav.component";
import { DepartmentsComponent } from './organization/departments/departments.component';
import { DesignationsComponent } from './organization/desigantaions/designations.component';
import { PayrollComponent } from './payroll/payroll.component';
import { DepartmentFormComponent } from './organization/departments/department-form/department-form.component';
import { DesigFormComponent } from './organization/desigantaions/designation-from/desig-form.component';
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
import { AttendanceComponent } from "./timesheet/attendances/attendance.component";
import { CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";
import { EmpDepChartComponent } from "./dashbord/emp-dep-chart/emp-dep-chart.component";
import { LeavesComponent } from './timesheet/leaves/leaves.component';
import { HolidayComponent } from './timesheet/holidays/holiday.component';
import { PayslipComponent } from './payroll/payslip/payslip.component';
import { HolidayFormComponent } from './timesheet/holidays/holiday-form/holiday-form.component';
import { NotificationComponent } from './navbar/notification/notification.component';
import { LeaveRequestComponent } from './timesheet/leaves/leave-form/leave-request.component';
import { DemoFormComponent } from './demo/demo-form/demo-form.component';
import { LoginComponent } from "./login/login.component";
import { AnnouncementsComponent } from './organization/announcements/announcements.component';
import { PlociesComponent } from './organization/plocies/plocies.component';
import { RolesComponent } from './employee/roles/roles.component';
import { ProcessPayrollComponent } from './payroll/process-payroll/process-payroll.component';
import { DetailsPayrollComponent } from './payroll/details-payroll/details-payroll.component';
import { LeavePolicyComponent } from './timesheet/leave-policy/leave-policy.component';
import { PolicyFormComponent } from "./timesheet/leave-policy/policy-form/policy-form.component";
import { ClaimComponent } from './payroll/claim/claim.component';
import { CategoryFormComponent } from './payroll/claim/category-form/category-form.component';
import { ClaimFormComponent } from './payroll/claim/claim-form/claim-form.component';
import { OfficeShiftComponent } from './timesheet/office-shift/office-shift.component';
import { ShiftFormComponent } from './timesheet/office-shift/shift-form/shift-form.component';
import { PaymentListComponent } from './payroll/payment-list/payment-list.component';
import { FormAnnouncementComponent } from './organization/announcements/form-announcement/form-announcement.component';

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
        LoginComponent,
        AnnouncementsComponent,
        PlociesComponent,
        RolesComponent,
        ProcessPayrollComponent,
        DetailsPayrollComponent,
        LeavePolicyComponent,
        PolicyFormComponent,
        ClaimComponent,
        CategoryFormComponent,
        ClaimFormComponent,
        OfficeShiftComponent,
        ShiftFormComponent,
        PaymentListComponent,
        FormAnnouncementComponent
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