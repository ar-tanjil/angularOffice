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

const routes: Routes = [
  {path:"dashboard", component:DashbordComponent},
  {path: "employee", component:EmployeeTableComponent},
  {path:"application", component:ApplicationComponent},
  {path:"applicationList", component:ApplicationListComponent},
  {path:"details/:mode/:id", component:DetailsApplicationComponent},
  {path: "register/:mode/:id", component: RegisterFormComponent},
  {path: "register", component: RegisterFormComponent},
  {path: "department/:mode", component: DepartmentFormComponent},
  {path: "department/:mode/:id", component: DepartmentFormComponent},
  {path: "designation/:mode", component: DesigFormComponent},
  {path: "designation/:mode/:id", component: DesigFormComponent},
  {path:"apply", component:ApplicationFormComponent},
  {path:"apply/:mode/:id", component:ApplicationFormComponent},
  {path:"profile", component: ProfileComponent},
  {path:"profile/:id", component: ProfileComponent},
  {path:"department", component: DepartmentsComponent},
  {path:"designation", component:DesignationsComponent},
  {path:"payroll", component: PayrollComponent},
  {path:"salary/:mode/:id", component: AddSalaryComponent},
  {path:"salaryDetails/:id", component: SalaryDetailsComponent},
  {path:"attendance", component: AttendanceComponent},
  {path:"tax", component: TaxComponent},
  {path: "", redirectTo:"/dashboard", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
