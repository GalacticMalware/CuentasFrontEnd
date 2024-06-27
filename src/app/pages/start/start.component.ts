import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';

import NavbarComponent from '../navbar/navbar.component';
import ShoppingListComponent from '../shopping-list/shopping-list.component';
import RegisterPurchasesComponent from '../register-purchases/register-purchases.component';
import InitialComponent from '../initial/initial.component';
import InitialService from '../../services/initial.service';
import { ShoppingData } from '../shopping-list/shopping-data';
import { Purchase,Initial } from '../../interfaces/initial';

import { MatTabsModule } from '@angular/material/tabs';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    NavbarComponent,
    ShoppingListComponent,
    RegisterPurchasesComponent,
    MatTabsModule,
    ToastModule,
    InitialComponent,
  ],
  providers: [MessageService, ShoppingData],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export default class StartComponent implements OnInit {
  private messageService = inject(MessageService);
  private initialService = inject(InitialService);
  private purchaseDataFormat = inject(ShoppingData);

  @ViewChild(ShoppingListComponent) shopping: any;
  @ViewChild(InitialComponent)  inital:any;

  public titleTab: string = 'Bienvenido';
  selectedTab = 0;

  purchaseData: Array<Purchase> = [];

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData(): void {
    try {
      this.initialService.getData().subscribe({
        next: (data) => {
          if (data.data) {
            this.inital.getData(data.data)
            this.purchaseData = this.purchaseDataFormat.formatData(
              data.data.purchaseData.purchaseMonth
            );
          }
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  openContentOne() {
    this.selectedTab = 3;
  }

  returnTabWatch($event: number): void {
    this.selectedTab = $event;
    this.shopping.dataUpdateListener();
    this.show();
  }

  changeState($event: any): void {
    let title: string = $event.tab.textLabel;
    title === 'Inicio' ? (title = 'Bienvenido') : null;
    title === 'Registrar' ? (title = 'Registrar compra') : null;
    this.titleTab = title;
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Se ingreso correctamnete',
    });
  }
}
