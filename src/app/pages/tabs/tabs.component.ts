import { Component,OnInit  } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu'; 
import { TabViewModule } from "primeng/tabview"; 
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule,MatButtonModule,TabMenuModule,CardModule,ButtonModule,ToolbarModule,AvatarModule,MenuModule,TabViewModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export default class TabsComponent implements OnInit{
  items: any;

  ngOnInit() {
      this.items = [
          { label: 'Dashboard', icon: 'pi pi-home' },
          { label: 'Transactions', icon: 'pi pi-chart-line' },
          { label: 'Products', icon: 'pi pi-list' }
      ]
  }
  
}
