import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Department, DepartmentChart } from 'src/app/model/department/deparment.model';
import { DepartmentDatasource } from 'src/app/model/department/department.datasource';



@Component({
  selector: 'app-emp-dep-chart',
  templateUrl: './emp-dep-chart.component.html',
  styleUrls: ['./emp-dep-chart.component.scss']
})
export class EmpDepChartComponent implements OnInit {

  departmentChart: DepartmentChart[] = new Array<DepartmentChart>();
  replaySubject: ReplaySubject<DepartmentChart[]>;
  chartOptions: any = [];
  

  constructor(
    private depData: DepartmentDatasource,
  ) {
      this.departmentChart = new Array<DepartmentChart>();
      this.replaySubject = new ReplaySubject<DepartmentChart[]>(1);

  }


  ngOnInit(): void {
this.getChartData();
 
  }



    getChartData(){
      this.depData.getChartData().subscribe(data => {
        this.departmentChart = data;
        this.replaySubject.next(data);
        this.replaySubject.complete();


        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: "Employee By Department"
          },
          data: [{
            type: "pie",
            startAngle: -90,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###.##'%'",
            dataPoints: this.departmentChart
          }]}

      })
    }
 




  }



 






// https://canvasjs.com/angular-charts/pie-chart-index-data-label/
// https://code-projects.org/hr-management-system-in-java-with-source-code/
// chartjs
