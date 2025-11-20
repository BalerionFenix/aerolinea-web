import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {GoogleAuthService} from '../../core/services/google-auth.service';
import {UserService} from '../../core/services/user.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private Auth: AuthService,private googleAuth: GoogleAuthService,private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async onSubmit(): Promise<void> {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    console.log('Datos del login:', this.loginForm.value);

    try {
      const result = await this.Auth.login(this.loginForm.value);
      const email = result?.user?.email;

      if (!email) {
        alert('No se pudo obtener el correo del usuario.');
        return;
      }

      const user = await firstValueFrom(this.userService.getUsuarioByEmail(email));

      if (user && user.email === email) {
        console.log('Usuario permitido:', user);
        alert('Inicio de sesión exitoso.');
        await this.router.navigate(['/dashboard']);
      } else {
        console.error('Email no permitido:', email);
        alert('Tu correo no tiene acceso.');
        await this.googleAuth.logoutWithGoogle();
      }

    } catch (error: any) {
      console.error('Error en login:', error);
      alert('No se pudo iniciar sesión. Verifica tus credenciales.');
    }
  }


  async loginWithGoogle(): Promise<void> {
    try {
      const result = await this.googleAuth.loginWithGoogle();
      const email = result.user.email;

      if (!email) {
        alert('No se pudo obtener el correo de Google.');
        return;
      }

      const user = await firstValueFrom(this.userService.getUsuarioByEmail(email));

      if (user && user.email === email) {
        console.log('Usuario permitido:', user);
        alert('Inicio de sesión con Google exitoso.');
        await this.router.navigate(['/dashboard']);
      } else {
        console.error('Email no permitido:', email);
        alert('Tu correo no tiene acceso.');
        await this.googleAuth.logoutWithGoogle();
      }
    } catch (error) {
      console.error('Error en login con Google:', error);
      alert('Ocurrió un error al iniciar sesión con Google. Intenta nuevamente.');
    }
  }




  /*
    loginWithGoogle() {
        this.googleAuth.loginWithGoogle().then(result => {
          if (result) {
            console.log(result);
            this.router.navigate(['/dashboard']);
          }
        });
    }*/
}
