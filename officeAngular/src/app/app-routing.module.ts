import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './core/dashbord/dashbord.component';
import { EmployeeTableComponent } from './core/employee-table/employee-table.component';
import { RegisterFormComponent } from './core/register-form/register-form.component';
import { ProfileComponent } from './core/profile/profile.component';

const routes: Routes = [
  {path:"dashboard", component:DashbordComponent},
  {path: "emp", component:EmployeeTableComponent},
  {path: "register", component: RegisterFormComponent},
  {path:"profile", component: ProfileComponent},
  {path: "", redirectTo:"/dashbord", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
