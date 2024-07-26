import { Component, OnInit } from '@angular/core';
import { IBarChart } from 'src/app/Interfaces/charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';

export const DATA_BAR_CHART:IBarChart[]=[
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }
]

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  data:IBarChart[]=[];
  view: [number,number] = [1000,900];
  colorScheme: Color = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA',], group: ScaleType.Ordinal, selectable: true, name: 'Customer Usage', };

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  constructor() {
  }

  ngOnInit(): void {
    this.data=DATA_BAR_CHART;

    setTimeout(()=>{
      console.log('*****');
      const dataPeru={
        name:"agregado por mi",
        value:586
      };
      this.data=[...this.data,dataPeru];
    },1500);
  }
  
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  operacion(){
    
  }

}
