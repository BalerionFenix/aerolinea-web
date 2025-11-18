import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layaut',
  imports: [
    NgIf
  ],
  templateUrl: './layaut.component.html',
  styleUrl: './layaut.component.css'
})
export class LayautComponent {

  constructor(private auth: AuthService, private router: Router ) {
  }

  loading = false;

  async logout(): Promise<void> {
    if (this.loading) return;
    this.loading = true;

    try {
      this.auth.logout();
      console.log('Sesión cerrada correctamente');
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Intenta nuevamente.');
    } finally {
      this.loading = false;
    }
  }


}
