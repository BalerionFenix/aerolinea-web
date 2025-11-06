import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetForm!: FormGroup;
  message: string | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.resetForm.invalid) return;

    const email = this.resetForm.value.email;

    try {
      await this.auth.resetPasswordInit(email);
      this.message = `Si el correo existe, recibirás un email de restablecimiento.`;
    } catch (error: any) {
      if (error.code === 'auth/too-many-requests') {
        this.message = 'Has enviado demasiadas solicitudes. Intenta más tarde.';
      } else {
        this.message = 'Ocurrió un error al enviar el correo.';
      }
    }
  }



  goToLogin() {
    this.router.navigate(['/login']);
  }


}
