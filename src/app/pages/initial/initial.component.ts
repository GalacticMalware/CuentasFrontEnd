import { Component, OnInit, Input, inject } from '@angular/core';

import { Initial, Purchase } from '../../interfaces/initial';
import { InitialData } from './inital-data';
import { ShoppingData } from '../shopping-list/shopping-data';

import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [SplitterModule, PanelModule, CardModule, ButtonModule, ChartModule,MatIconModule],
  providers: [InitialData,ShoppingData],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss',
})
export default class InitialComponent implements OnInit {
  private initialData = inject(InitialData);
  private purchaseDataFormat = inject(ShoppingData);
  public lastPurchase:Purchase | null = null;
  public dataProfile: Initial | null = null;
  public remainingBudget:number = 0;
  //Variables
  graphData: any;
  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  mes: string = this.meses[new Date().getMonth()];
  options: any;
  //funciones
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          display: false,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          display: false,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getData(data: Initial) {
    console.log(data)
    const format = this.initialData.formatData(data);
    this.graphData = format.graph[1];
    this.lastPurchase = this.purchaseDataFormat.formatData(format.graph[0].lastPurchase)[0];
    this.remainingBudget = data.goalMonth - data.totalAmountMonth;
    this.dataProfile = data;
  }
}
