import { NgModule } from "@angular/core";
import { EmpDatasource } from "./emp.datasource";
import { EmpModel } from "./emp.model";

@NgModule({
    declarations: [],
    providers: [EmpDatasource, EmpModel],
})
export class ModelModule{

}