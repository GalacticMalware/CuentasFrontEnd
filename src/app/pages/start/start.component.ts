import { Component } from '@angular/core';

import NavbarComponent from '../navbar/navbar.component';
import ShoppingListComponent from '../shopping-list/shopping-list.component';
import RegisterPurchasesComponent from '../register-purchases/register-purchases.component';

import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    NavbarComponent,
    ShoppingListComponent,
    RegisterPurchasesComponent,
    MatTabsModule,
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export default class StartComponent {
  public titleTab: string = 'Bienvenido';
  selectedTab = 0;

  openContentOne() {
    this.selectedTab = 3;
  }

  changeState($event: any): void {
    let title: string = $event.tab.textLabel;
    title === 'Inicio' ? (title = 'Bienvenido') : null;
    title === 'Registrar' ? (title = 'Registrar compra') : null;
    this.titleTab = title;
  }
}
