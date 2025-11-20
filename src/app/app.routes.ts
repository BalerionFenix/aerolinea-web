import { Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {RegistrarUsuarioComponent} from './features/usuarios/registrar-usuario/registrar-usuario.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {DashboardComponent} from './features/dashboard/dashboard/dashboard.component';
import {PanelControlComponent} from './features/dashboard/panel-control/panel-control.component';
import {ResetPasswordComponent} from './features/reset-password/reset-password.component';
import {PilotsComponent} from './features/pilots/pilots.component';
import {TripulacionComponent} from './features/tripulacion/tripulacion.component';
import {VuelosComponent} from './features/vuelos/vuelos.component';
import {BasesAereasComponent} from './features/base/bases-aereas/bases-aereas.component';
import {UsersManagementComponent} from './features/usuarios/users-management/users-management.component';
import {UsersCreateComponent} from './features/usuarios/users-create/users-create.component';
import {UsersEditComponent} from './features/usuarios/users-edit/users-edit.component';
import {BasesCreateComponent} from './features/base/bases-create/bases-create.component';
import {BasesEditComponent} from './features/base/bases-edit/bases-edit.component';
import {AvionesManagementComponent} from './features/aviones/aviones-management/aviones-management.component';
import {AvionesCreateComponent} from './features/aviones/aviones-create/aviones-create.component';
import {AvionesEditComponent} from './features/aviones/aviones-edit/aviones-edit.component';


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
        path: 'panel-control',
        component: PanelControlComponent
      },
      {
        path: 'pilotos',
        component: PilotsComponent
      },
      {
        path: 'tripulacion',
        component: TripulacionComponent
      },
      {
        path: 'vuelos',
        component: VuelosComponent
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

      { path: '', redirectTo: 'panel-control', pathMatch: 'full' }
    ]
  }

];
