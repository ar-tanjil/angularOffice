import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './core/dashbord/dashbord.component';
import { EmployeeTableComponent } from './core/employee-table/employee-table.component';
import { RegisterFormComponent } from './core/employee-table/register-form/register-form.component';
import { ProfileComponent } from './core/profile/profile.component';
import { DepartmentsComponent } from './core/departments/departments.component';
import { DesignationsComponent } from './core/designations/designations.component';
import { PayrollComponent } from './core/payroll/payroll.component';
import { DepartmentFormComponent } from './core/departments/department-form/department-form.component';
import { DesigFormComponent } from './core/designations/desig-form/desig-form.component';
import { ApplicationComponent } from './core/application/application.component';
import { ApplicationFormComponent } from './core/application/form-application/application-form.component';
import { ApplicationListComponent } from './core/application/list-application/application-list.component';
import { DetailsApplicationComponent } from './core/application/details-application/details-application.component';
import { AddSalaryComponent } from './core/payroll/add-salary/add-salary.component';
import { SalaryDetailsComponent } from './core/payroll/salary-details/salary-details.component';
import { TaxComponent } from './core/payroll/tax/tax.component';
import { AttendanceComponent } from './core/employee-table/attendance/attendance.component';
import { LeavesComponent } from './core/employee-table/leaves/leaves.component';
import { HolidayComponent } from './core/employee-table/holiday/holiday.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './model/authentication/authGurd';

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
  { path: "apply", component: ApplicationFormComponent },
  { path: "apply/:mode/:id", component: ApplicationFormComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "department", component: DepartmentsComponent },
  { path: "designation", component: DesignationsComponent },
  { path: "payroll", component: PayrollComponent },
  { path: "salary/:mode/:id", component: AddSalaryComponent },
  { path: "salaryDetails/:id", component: SalaryDetailsComponent },
  { path: "attendance", component: AttendanceComponent },
  { path: "tax", component: TaxComponent },
  { path: "leave", component: LeavesComponent },
  { path: "holiday", component: HolidayComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
