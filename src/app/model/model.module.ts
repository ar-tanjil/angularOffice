import { NgModule } from "@angular/core";
import { EmpDatasource } from "./employee/emp.datasource";
import { EmpModel } from "./employee/emp.model";
import { HttpClientModule } from "@angular/common/http";
import { DepDatasource } from "./department/dep.datasource";
import { DepModel } from "./department/department.model";
import { DesinationDatasource } from "./designation/desig.datasource";
import { DesigModel } from "./designation/designation.model";
import { FormMessage } from "./from.message.service";
import { ApplicationDatasource } from "./application/application.datsource";
import { ApplicationModel } from "./application/application.model";
import { RefreshService } from "./msgService/refereshService";

@NgModule({
    declarations: [],
    providers: [
        EmpDatasource, 
        EmpModel,
        DepDatasource,
        DepModel,
        DesinationDatasource,
        DesigModel,
        FormMessage,
        ApplicationDatasource,
        ApplicationModel,
        RefreshService
    ],
    imports: [HttpClientModule]
})
export class ModelModule{

}