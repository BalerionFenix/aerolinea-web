import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Usuario} from '../../../core/models/Usuarios/usuario.model';
import {NgIf} from '@angular/common';
import {GoogleAuthService} from '../../../core/services/google-auth.service';
import {firstValueFrom} from 'rxjs';
import {UserService} from '../../../core/services/user.service';
import {onAuthStateChanged} from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public usuario: Usuario | null = null;


  constructor(public auth: AuthService, public router: Router, private googleAuth: GoogleAuthService, private userService: UserService) { }

  async   ngOnInit() {
    // Escuchar cambios de estado de autenticación
    onAuthStateChanged(this.auth['auth'], async (user: any) => {
      if (user) {
        const email = user.email;
        const userData = await firstValueFrom(this.userService.getUsuarioByEmail(email));
        if (userData && userData.email === email) {
          this.usuario = new Usuario(userData);
        } else {
        /*  await this.googleAuth.logoutWithGoogle();
          await this.auth.logout();
          this.router.navigate(['/login']);*/
        }
      } else {
        //this.router.navigate(['/login']);
      }
    });
  }



  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    })

  }

  hasRole(rolesPermitidos: string[]): boolean {
    if (!this.usuario || !this.usuario.rol) return false;
    return rolesPermitidos.includes(this.usuario.rol.nombre);
  }

  protected abrirPerfil() {
    this.router.navigate(['/dashboard/profile']);
  }
}
