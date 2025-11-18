import { Component } from '@angular/core';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {HeaderComponent} from '../../../shared/components/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
