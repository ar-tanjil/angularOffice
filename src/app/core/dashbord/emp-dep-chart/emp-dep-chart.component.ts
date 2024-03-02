import { Component } from '@angular/core';


@Component({
  selector: 'app-emp-dep-chart',
  templateUrl: './emp-dep-chart.component.html',
  styleUrls: ['./emp-dep-chart.component.scss']
})
export class EmpDepChartComponent {

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
      dataPoints: [
        { y: 14.1, name: "Toys" },
        { y: 28.2, name: "Electronics" },
        { y: 14.4, name: "Groceries" },
        { y: 43.3, name: "Furniture" }
      ]
    }]
  }

}

// https://canvasjs.com/angular-charts/pie-chart-index-data-label/
// https://code-projects.org/hr-management-system-in-java-with-source-code/
