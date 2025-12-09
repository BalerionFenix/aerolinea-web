import { Component } from '@angular/core';
import {Usuario, UsuarioInputDTO} from '../../../core/models/Usuarios/usuario.model';
import {Base} from '../../../core/models/base_avion/base.model';
import {Subject, takeUntil} from 'rxjs';
import {Auth, user} from '@angular/fire/auth';
import {UserService} from '../../../core/services/user.service';
import {BaseService} from '../../../core/services/base.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgIf,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  currentUser: any = null;
  usuario: Usuario | null = null;
  base: Base | null = null;

  // Formulario de edición
  formulario = {
    nombre: '',
    email: '',
    base_codigo: 0,
    baseNombre: ''
  };

  // Estados de carga
  cargando = true;
  guardando = false;
  errorCarga = false;
  mensajeExito = '';
  mensajeError = '';

  // Modal de cambio de contraseña
  mostrarModalPassword = false;

  private destroy$ = new Subject<void>();

  constructor(
    private auth: Auth,
    private userService: UserService,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDatosUsuario(): void {
    this.cargando = true;
    this.errorCarga = false;

    // Obtener usuario actual de Firebase
    user(this.auth)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (firebaseUser) => {
          if (firebaseUser && firebaseUser.email) {
            this.currentUser = firebaseUser;
            this.cargarDatosDesdeAPI(firebaseUser.email);
          } else {
            this.errorCarga = true;
            this.cargando = false;
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Error al obtener usuario de Firebase:', err);
          this.errorCarga = true;
          this.cargando = false;
        }
      });
  }

  cargarDatosDesdeAPI(email: string): void {
    this.userService.getUsuarioByEmail(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuario = new Usuario(usuario);
            this.formulario.nombre = this.usuario.nombre;
            this.formulario.email = this.usuario.email;
            this.formulario.base_codigo = this.usuario.base_codigo;

            // Cargar información de la base
            if (this.usuario.base_codigo) {
              this.cargarBase(this.usuario.base_codigo);
            } else {
              this.cargando = false;
            }
          } else {
            this.errorCarga = true;
            this.cargando = false;
          }
        },
        error: (err) => {
          console.error('Error al cargar usuario desde API:', err);
          this.errorCarga = true;
          this.cargando = false;
          this.mensajeError = 'No se pudo cargar la información del usuario';
        }
      });
  }

  cargarBase(baseCodigo: number): void {
    this.baseService.getBaseById(baseCodigo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (base) => {
          if (base) {
            this.base = new Base(base);
            this.formulario.baseNombre = `${this.base.nombre} - ${this.base.ciudad}`;
          }
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar base:', err);
          this.cargando = false;
        }
      });
  }

  get fotoUrl(): string {
    return this.currentUser?.photoURL || '';
  }

  get nombreUsuario(): string {
    return this.usuario?.nombre || this.currentUser?.displayName || 'Usuario';
  }

  get iniciales(): string {
    if (!this.nombreUsuario) return 'U';
    const nombres = this.nombreUsuario.trim().split(' ');
    if (nombres.length >= 2) {
      return `${nombres[0][0]}${nombres[1][0]}`.toUpperCase();
    }
    return this.nombreUsuario.substring(0, 2).toUpperCase();
  }

  get rolNombre(): string {
    return this.usuario?.rol?.nombre || 'Sin rol asignado';
  }

  get rolIcono(): string {
    const nombreRol = this.rolNombre.toLowerCase();
    if (nombreRol.includes('piloto')) return 'flight_takeoff';
    if (nombreRol.includes('admin')) return 'admin_panel_settings';
    if (nombreRol.includes('tripulante') || nombreRol.includes('tripulación')) return 'airline_seat_recline_normal';
    if (nombreRol.includes('gerente') || nombreRol.includes('supervisor')) return 'engineering';
    return 'person';
  }

}
