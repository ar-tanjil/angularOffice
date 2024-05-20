import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './core/dashbord/dashbord.component';
import { EmployeeTableComponent } from './core/employee/employee-table.component';
import { RegisterFormComponent } from './core/employee/emploee-from/register-form.component';
import { ProfileComponent } from './core/profile/profile.component';
import { DepartmentsComponent } from './core/organization/departments/departments.component';
import { DesignationsComponent } from './core/organization/desigantaions/designations.component';
import { PayrollComponent } from './core/payroll/payroll.component';
import { DepartmentFormComponent } from './core/organization/departments/department-form/department-form.component';
import { DesigFormComponent } from './core/organization/desigantaions/designation-from/desig-form.component';
import { ApplicationComponent } from './core/application/application.component';
import { ApplicationFormComponent } from './core/application/form-application/application-form.component';
import { ApplicationListComponent } from './core/application/list-application/application-list.component';
import { DetailsApplicationComponent } from './core/application/details-application/details-application.component';
import { AddSalaryComponent } from './core/payroll/add-salary/add-salary.component';
import { SalaryDetailsComponent } from './core/payroll/salary-details/salary-details.component';
import { TaxComponent } from './core/payroll/tax/tax.component';
import { AttendanceComponent } from './core/timesheet/attendances/attendance.component';
import { LeavesComponent } from './core/timesheet/leaves/leaves.component';
import { HolidayComponent } from './core/timesheet/holidays/holiday.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './model/authentication/authGurd';
import { ProcessPayrollComponent } from './core/payroll/process-payroll/process-payroll.component';
import { LeavePolicyComponent } from './core/timesheet/leave-policy/leave-policy.component';
import { ClaimComponent } from './core/payroll/claim/claim.component';
import { OfficeShiftComponent } from './core/timesheet/office-shift/office-shift.component';
import { AnnouncementsComponent } from './core/organization/announcements/announcements.component';
import { PaymentListComponent } from './core/payroll/payment-list/payment-list.component';
import { OffboardingComponent } from './core/employee/offboarding/offboarding.component';
import { RolesComponent } from './core/employee/roles/roles.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashbordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employee",
    component: EmployeeTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "application",
    component: ApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "applicationList",
    component: ApplicationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "details/:mode/:id",
    component: DetailsApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register/:mode/:id",
    component: RegisterFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "department/:mode",
    component: DepartmentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "department/:mode/:id",
    component: DepartmentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "designation/:mode",
    component: DesigFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "designation/:mode/:id",
    component: DesigFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "apply",
    component: ApplicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "apply/:mode/:id",
    component: ApplicationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "department",
    component: DepartmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "designation",
    component: DesignationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "payroll",
    component: PayrollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "salary/:mode/:id",
    component: AddSalaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "salaryDetails/:id",
    component: SalaryDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "attendance",
    component: AttendanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "tax",
    component: TaxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "leave",
    component: LeavesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "holiday",
    component: HolidayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "process",
    component: ProcessPayrollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "claim",
    component: ClaimComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "leavePolicy",
    component: LeavePolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "officeShift",
    component: OfficeShiftComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "announcement",
    component: AnnouncementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "payment",
    component: PaymentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "role",
    component: RolesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
