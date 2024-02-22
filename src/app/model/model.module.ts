import { NgModule } from "@angular/core";
import { EmpDatasource } from "./emp.datasource";
import { EmpModel } from "./emp.model";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [],
    providers: [EmpDatasource, EmpModel],
    imports: [HttpClientModule]
})
export class ModelModule{

}