import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {GoogleAuthService} from '../../core/service/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private Auth: AuthService,private googleAuth: GoogleAuthService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      console.log('Datos del login:', this.loginForm.value);
      try {
        await this.Auth.login(this.loginForm.value);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Error en login:', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  loginWithGoogle() {
      this.googleAuth.loginWithGoogle().then(result => {
        if (result) {
          console.log(result);
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
