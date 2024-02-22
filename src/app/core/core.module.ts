import { NgModule } from "@angular/core";
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from "src/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ModelModule } from "../model/model.module";
import { AppRoutingModule } from "../app-routing.module";
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        NavbarComponent,
        EmployeeTableComponent,
        DashbordComponent,
        RegisterFormComponent,
        ProfileComponent
    ],
    exports: [
        NavbarComponent,
        EmployeeTableComponent,
        DashbordComponent
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