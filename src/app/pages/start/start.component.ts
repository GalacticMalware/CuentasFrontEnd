import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';

import NavbarComponent from '../navbar/navbar.component'

import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [NavbarComponent,MatTabsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export default class StartComponent {
  //inject()

  a(){
    console.log('asdkjhnaksjn')
  }
}
