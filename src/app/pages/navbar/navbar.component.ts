import { Component, OnInit, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export default class NavbarComponent implements OnInit {
  @Input() changeTitle: string | undefined;

  ngOnInit(): void {
    // this.listTitle.map(x=>)
  }
}
