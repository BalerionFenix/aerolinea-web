import {Component, Input} from '@angular/core';
import {Usuario} from '../../../core/models/Usuarios/usuario.model';
import {Subject, takeUntil} from 'rxjs';
import {Auth, user} from '@angular/fire/auth';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() titulo: string = 'Panel de Control';


  currentUser: any = null;
  usuario: Usuario | null = null;
  cargando = true;

  private destroy$ = new Subject<void>();

  constructor(
    private auth: Auth,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarUsuario(): void {
    user(this.auth)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (firebaseUser) => {
          if (firebaseUser && firebaseUser.email) {
            this.currentUser = firebaseUser;
            this.cargarDatosUsuario(firebaseUser.email);
          } else {
            this.cargando = false;
          }
        },
        error: (err) => {
          console.error('Error al obtener usuario de Firebase:', err);
          this.cargando = false;
        }
      });
  }

  cargarDatosUsuario(email: string): void {
    this.userService.getUsuarioByEmail(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuario = new Usuario(usuario);
          }
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar datos del usuario:', err);
          this.cargando = false;
        }
      });
  }

  irAlPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  get fotoUrl(): string {
    return this.currentUser?.photoURL || '';
  }

  get nombreUsuario(): string {
    return this.usuario?.nombre || this.currentUser?.displayName || 'Usuario';
  }

  get rolUsuario(): string {
    return this.usuario?.rol?.nombre || 'Sin rol';
  }

  get iniciales(): string {
    if (!this.nombreUsuario) return 'U';
    const nombres = this.nombreUsuario.trim().split(' ');
    if (nombres.length >= 2) {
      return `${nombres[0][0]}${nombres[1][0]}`.toUpperCase();
    }
    return this.nombreUsuario.substring(0, 2).toUpperCase();
  }

}
