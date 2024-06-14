import { Component, inject, OnInit } from '@angular/core';

import { PurchaseService } from '../../services/purchase.service';
import NavbarComponent from '../navbar/navbar.component';
import { ShoppingData } from './shopping-data';

import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NavbarComponent,
    ScrollPanelModule,
    CommonModule,
    ScrollerModule,
    ButtonModule,
    MatButtonModule
  ],
  providers:[ShoppingData],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export default class ShoppingListComponent implements OnInit {
  private pruchaseService = inject(PurchaseService);
  private purchaseDataFormat = inject(ShoppingData);
  public dataPurchase: any = [];

  ngOnInit() {
    this.getPurchaseList();
  }

  getPurchaseList() {
    try {
      this.pruchaseService.get().subscribe({
        next: (data: any) => {
          if(data.data){
            console.log("data")
            this.dataPurchase = this.purchaseDataFormat.formatData(data.data);
          }
        },
      });
    } catch (e) {
      console.log(e)
    }
  }
}
