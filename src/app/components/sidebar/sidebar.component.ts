import { Component } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(public auth: AuthService, public router: Router) { }



  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    })

  }
}
