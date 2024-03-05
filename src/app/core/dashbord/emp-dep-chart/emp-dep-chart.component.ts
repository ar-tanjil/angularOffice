import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DepDatasource } from 'src/app/model/department/dep.datasource';
import { Department, DepartmentChart } from 'src/app/model/department/deparment';
import { DepModel } from 'src/app/model/department/department.model';


@Component({
  selector: 'app-emp-dep-chart',
  templateUrl: './emp-dep-chart.component.html',
  styleUrls: ['./emp-dep-chart.component.scss']
})
export class EmpDepChartComponent implements OnInit {

  


    constructor(private depData: DepDatasource,
      private model: DepModel){
        
    }
ngOnInit(): void {
  console.log(this.model.getChartData());
  console.log(this.model.getDepartments());
  
}




chartOptions = {
    animationEnabled: true,
    title: {
      text: "Employee By Department"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: this.model.getChartData()
    }]
  }



 
}

// https://canvasjs.com/angular-charts/pie-chart-index-data-label/
// https://code-projects.org/hr-management-system-in-java-with-source-code/
