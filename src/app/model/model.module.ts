import { NgModule } from "@angular/core";
import { EmpDatasource } from "./employee/emp.datasource";
import { EmpModel } from "./employee/emp.model";
import { HttpClientModule } from "@angular/common/http";
import { DepDatasource } from "./department/dep.datasource";
import { DepModel } from "./department/department.model";
import { DesinationDatasource } from "./designation/desig.datasource";
import { DesigModel } from "./designation/designation.model";
import { FormMessage } from "./from.message.service";

@NgModule({
    declarations: [],
    providers: [
        EmpDatasource, 
        EmpModel,
        DepDatasource,
        DepModel,
        DesinationDatasource,
        DesigModel,
        FormMessage
    ],
    imports: [HttpClientModule]
})
export class ModelModule{

}