import { Component, inject,OnInit } from '@angular/core';
import {PurchaseService} from '../../services/purchase.service';

import { SpeedDialModule } from 'primeng/speeddial';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import TabsComponent from '../tabs/tabs.component';
import NavbarComponent from '../navbar/navbar.component'
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [MatTabsModule,MatButtonModule,NavbarComponent,ScrollPanelModule,CardModule,SpeedDialModule,CommonModule,ScrollerModule,TabsComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export default class ShoppingListComponent implements OnInit {

  private pruchaseService = inject(PurchaseService);
  public p:any;
  
  ngOnInit() {
    this.getPurchaseList();
  }

  async getPurchaseList(){
    try{
      return this.pruchaseService.get().subscribe(
        {
          next:(data:any) =>{
            console.log(data)
            this.p = data.data;
            
          }
        }
      );
    }catch(e){
      return null;
    }
  }
}
