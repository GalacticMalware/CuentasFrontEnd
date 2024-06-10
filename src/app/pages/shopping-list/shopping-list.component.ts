import { Component, inject,OnInit } from '@angular/core';
import {PurchaseService} from '../../services/purchase.service';

import { OrderListModule } from 'primeng/orderlist';
import { SpeedDialModule } from 'primeng/speeddial';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ScrollPanelModule,CardModule,OrderListModule,SpeedDialModule,DataViewModule,TagModule,CommonModule,TableModule,RatingModule,ScrollerModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export default class ShoppingListComponent implements OnInit {

  private pruchaseService = inject(PurchaseService);
  lazyLoading: boolean = true;
  constructor(){
    //this.getPurchaseList();
  }
  cols!: any[];
  virtualCars!: any[];
  ngOnInit() {
    console.log("sjkldnakjsndkjanskdjn")
    this.getPurchaseList();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  this.virtualCars = Array.from({ length: 10000 });
  }
    isSorted: any = null;
  items: any[] =[{
    
      icon: 'pi pi-pencil',
      command: () => {
        console.log('asdasd')
          //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
      }
  
  }];
  products:any[] = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}];
loadLazyTimeout: any;

onLazyLoad(event: any) {
  this.lazyLoading = true;

  if (this.loadLazyTimeout) {
      clearTimeout(this.loadLazyTimeout);
  }

  //imitate delay of a backend call
  this.loadLazyTimeout = setTimeout(() => {
      const { first, last } = event;
      const lazyItems = [...this.items];

      for (let i = first; i < last; i++) {
          lazyItems[i] = `Item #${i}`;
      }

      this.items = lazyItems;
      this.lazyLoading = false;
  }, Math.random() * 1000 + 250);
}

  public p:any;

  async getPurchaseList(){
    try{
      return this.pruchaseService.get().subscribe(
        {
          next:(data) =>{
            
            this.p = data.data;
            console.log(data.data)
          }
        }
      );
      //this.products =
      return null; 
    }catch(e){
      return null;
    }
  }
}
