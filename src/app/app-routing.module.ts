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

const routes: Routes = [
  {path:"dashboard", component:DashbordComponent},
  {path: "emp", component:EmployeeTableComponent},
  {path: "register/:mode", component: RegisterFormComponent},
  {path: "department/:mode", component: DepartmentFormComponent},
  {path: "designation/:mode", component: DesigFormComponent},
  {path:"profile", component: ProfileComponent},
  {path:"department", component: DepartmentsComponent},
  {path:"designation", component:DesignationsComponent},
  {path:"payroll", component: PayrollComponent},
  {path: "", redirectTo:"/dashbord", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
