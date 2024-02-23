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
        ApplicationListComponent
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
        ApplicationFormComponent
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        ModelModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CoreModule {

}