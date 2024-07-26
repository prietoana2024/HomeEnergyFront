import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { IBarChart } from 'src/app/Interfaces/charts';

@Component({
  selector: 'app-financiamiento',
  templateUrl: './financiamiento.component.html',
  styleUrls: ['./financiamiento.component.css']
})
export class FinanciamientoComponent implements OnInit {


 // options colorScheme = {
   // options domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
 // options };

  productSales=[
    {"name":"book","value":5001},
    {"name":"grafic card","value":7335},
    {"name":"desk","value":5889},
    {"name":"lptop","value":2599},
    {"name":"monitor","value":705}
  ];

  productSalesMulti = [
    {
      "name": "book",
      "series": [
        {
          "name": "January",
          "value": 125
        }, {
          "name": "February",
          "value": 197
        }, {
          "name": "March",
          "value": 209
        }
      ]
    }, {
      "name": "graphic card",
      "series": [
        {
          "name": "January",
          "value": 210
        }, {
          "name": "February",
          "value": 255
        }, {
          "name": "March",
          "value": 203
        }
      ]
    }, {
      "name": "desk",
      "series": [
        {
          "name": "January",
          "value": 89
        }, {
          "name": "February",
          "value": 105
        }, {
          "name": "March",
          "value": 66
        }
      ]
    }, {
      "name": "laptop",
      "series": [
        {
          "name": "January",
          "value": 178
        }, {
          "name": "February",
          "value": 165
        }, {
          "name": "March",
          "value": 144
        }
      ]
    }, {
      "name": "monitor",
      "series": [
        {
          "name": "January",
          "value": 144
        }, {
          "name": "February",
          "value": 250
        }, {
          "name": "March",
          "value": 133
        }
      ]
    }
  ];

  bubbleData = [
    {
      name: 'book',
      series: [
        {
          name: 'January',
          x: 'January',
          y: 80.3,
          r: 80.4
        },
        {
          name: 'February',
          x: 'February',
          y: 80.3,
          r: 78
        },
        {
          name: 'March',
          x: 'March',
          y: 75.4,
          r: 79
        }
      ]
    },
    {
      name: 'graphic card',
      series: [
        {
          name: 'January',
          x: 'January',
          y: 78.8,
          r: 144
        },
        {
          name: 'February',
          x: 'February',
          y: 76.9,
          r: 178
        },
        {
          name: 'March',
          x: 'March',
          y: 75.4,
          r: 155
        }
      ]
    },
    {
      name: 'desk',
      series: [
        {
          name: 'January',
          x: 'January',
          y: 81.4,
          r: 63
        },
        {
          name: 'February',
          x: 'February',
          y: 79.1,
          r: 59.4
        },
        {
          name: 'March',
          x: 'March',
          y: 77.2,
          r: 56.9
        }
      ]
    },
    {
      name: 'laptop',
      series: [
        {
          name: 'January',
          x: 'January',
          y: 80.2,
          r: 62.7
        },
        {
          name: 'February',
          x: 'February',
          y: 77.8,
          r: 58.9
        },
        {
          name: 'March',
          x: 'March',
          y: 75.7,
          r: 57.1
        }
      ]
    }
  ];

 
  
  constructor() { 
    
  }

  ngOnInit(): void {
  }


}
