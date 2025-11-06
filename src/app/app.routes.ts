import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrarUsuarioComponent} from './pages/usuarios/registrar-usuario/registrar-usuario.component';
import {AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {LayautComponent} from './components/layaut/layaut.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PanelControlComponent} from './pages/panel-control/panel-control.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

export const routes: Routes = [

  {path: '', component: LoginComponent, },
  {path: 'login', component: LoginComponent, ...canActivate(()=>redirectLoggedInTo(['main']))},
  {path: 'reset-password', component: ResetPasswordComponent, ...canActivate(()=>redirectLoggedInTo(['main']))},

  {
    path: 'register',
    component: RegistrarUsuarioComponent, ...canActivate(()=> redirectUnauthorizedTo(['']))
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

      /*{
        path: 'vuelos',
        component: FlightsComponent
      },
      {
        path: 'tripulacion',
        component: CrewComponent
      },
      {
        path: '',
        redirectTo: 'vuelos',
        pathMatch: 'full'
      }*/

      { path: '', redirectTo: 'panel-control', pathMatch: 'full' }
    ]
  }

];
