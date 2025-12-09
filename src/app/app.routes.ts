import { Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {RegistrarUsuarioComponent} from './features/usuarios/registrar-usuario/registrar-usuario.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {DashboardComponent} from './features/dashboard/dashboard/dashboard.component';
import {PanelControlComponent} from './features/dashboard/panel-control/panel-control.component';
import {ResetPasswordComponent} from './features/reset-password/reset-password.component';
import {PilotsComponent} from './features/pilots/pilots.component';
import {MantenimientoDetalleComponent} from './features/mantenimiento/mantenimiento-detalle/mantenimiento-detalle.component';
import {MantenimientoCrearComponent} from './features/mantenimiento/mantenimiento-crear/mantenimiento-crear.component';
import {TripulacionComponent} from './features/tripulacion/tripulacion.component';
import {BasesAereasComponent} from './features/base/bases-aereas/bases-aereas.component';
import {UsersManagementComponent} from './features/usuarios/users-management/users-management.component';
import {UsersCreateComponent} from './features/usuarios/users-create/users-create.component';
import {UsersEditComponent} from './features/usuarios/users-edit/users-edit.component';
import {BasesCreateComponent} from './features/base/bases-create/bases-create.component';
import {BasesEditComponent} from './features/base/bases-edit/bases-edit.component';
import {AvionesManagementComponent} from './features/aviones/aviones-management/aviones-management.component';
import {AvionesCreateComponent} from './features/aviones/aviones-create/aviones-create.component';
import {AvionesEditComponent} from './features/aviones/aviones-edit/aviones-edit.component';
import {FlightManagementComponent} from './features/vuelos/flight-management/flight-management.component';
import {FlightCreateComponent} from './features/vuelos/flight-create/flight-create.component';
import {FlightEditComponent} from './features/vuelos/flight-edit/flight-edit.component';
import {
  MantenimientoManagementComponent
} from './features/mantenimiento/mantenimiento-management/mantenimiento-management.component';
import {
  TipoMantenimientoManagementComponent
} from './features/tipo_mantenimiento/tipo-mantenimiento-management/tipo-mantenimiento-management.component';
import {
  TipoMantenimientoDetalleComponent
} from './features/tipo_mantenimiento/tipo-mantenimiento-detalle/tipo-mantenimiento-detalle.component';
import {
  TipoMantenimientoCreateComponent
} from './features/tipo_mantenimiento/tipo-mantenimiento-create/tipo-mantenimiento-create.component';
import {
  TipoMantenimientoEditComponent
} from './features/tipo_mantenimiento/tipo-mantenimiento-edit/tipo-mantenimiento-edit.component';
import {
  MantenimientoEditarComponent
} from './features/mantenimiento/mantenimiento-editar/mantenimiento-editar.component';
import {PanelUsuariosComponent} from './features/dashboard/panel-usuarios/panel-usuarios.component';
import {PanelCentralComponent} from './features/dashboard/panel-central/panel-central.component';
import {ProfileComponent} from './features/dashboard/profile/profile.component';
import {PilotsCreateComponent} from './features/pilots/pilots-create/pilots-create.component';
import {PilotsEditComponent} from './features/pilots/pilots-edit/pilots-edit.component';
import {TripulacionCreateComponent} from './features/tripulacion/tripulacion-create/tripulacion-create.component';
import {TripulacionEditComponent} from './features/tripulacion/tripulacion-edit/tripulacion-edit.component';


export const routes: Routes = [

  {path: '', component: LoginComponent, },
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['dashboard'])) },
  { path: 'reset-password', component: ResetPasswordComponent, ...canActivate(() => redirectLoggedInTo(['dashboard'])) },


  {
    path: 'register',
    component: RegistrarUsuarioComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
    children: [
      {
        path: 'panel-central',
        component: PanelCentralComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: 'panel-usuario',
        component: PanelUsuariosComponent
      },
      {
        path: 'panel-control',
        component: PanelControlComponent
      },
      {
        path: 'pilotos',
        component: PilotsComponent
      },
      {
        path: 'pilotos/crear',
        component: PilotsCreateComponent
      },
      {
        path: 'pilotos/editar/:id',
        component: PilotsEditComponent
      },

      {
        path: 'tripulacion',
        component: TripulacionComponent
      },
      {
        path: 'tripulacion/crear',
        component: TripulacionCreateComponent
      },
      {
        path: 'tripulacion/editar/:id',
        component: TripulacionEditComponent
      },

      {
        path: 'vuelos',
        component: FlightManagementComponent
      },
      {
        path: 'vuelos/crear',
        component: FlightCreateComponent
      },
      {
        path: 'vuelos/editar/:id',
        component: FlightEditComponent
      },

      {
        path: 'bases-aereas',
        component: BasesAereasComponent,
      },
      {
        path: 'bases-aereas/crear',
        component: BasesCreateComponent,
      },
      {
        path: 'bases-aereas/editar/:id',
        component: BasesEditComponent,
      },
      {
        path: 'mantenimiento',
        component: MantenimientoManagementComponent,
      },
      {
        path: 'mantenimiento/detalle/:id',
        component: MantenimientoDetalleComponent,
      },
      {
        path: 'mantenimiento/edit/:id',
        component: MantenimientoEditarComponent,
      },
      {
        path: 'mantenimiento/crear',
        component: MantenimientoCrearComponent,
      },


      {
        path: 'tipo_mantenimiento',
        component: TipoMantenimientoManagementComponent,
      },

      {
        path: 'tipo_mantenimiento/detalle/:id',
        component: TipoMantenimientoDetalleComponent,
      },
      {
        path: 'tipo_mantenimiento/editar/:id',
        component: TipoMantenimientoEditComponent,
      },
      {
        path: 'tipo_mantenimiento/create',
        component: TipoMantenimientoCreateComponent,
      },


      {
        path: 'usuarios',
        component: UsersManagementComponent,
      },
      {
        path: 'usuarios/crear',
        component: UsersCreateComponent,
      },
      {
        path: 'usuarios/editar/:id',
        component: UsersEditComponent,
      },

      {
        path: 'aviones',
        component: AvionesManagementComponent,
      },
      {
        path: 'aviones/crear',
        component: AvionesCreateComponent,
      },
      {
        path: 'aviones/editar/:id',
        component: AvionesEditComponent,
      },

      { path: '', redirectTo: 'panel-central', pathMatch: 'full' }
    ]
  }

];
