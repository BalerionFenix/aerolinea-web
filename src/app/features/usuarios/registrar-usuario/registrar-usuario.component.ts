import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-registrar-usuario',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  userForm!: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  mostrarHorasVuelo = false;

  constructor(private fb: FormBuilder, private authService: AuthService ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      horasVuelo: [{ value: '', disabled: true }],
      base: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onTipoChange(event: Event): void {
    const tipo = (event.target as HTMLSelectElement).value;
    const horasVueloControl = this.userForm.get('horasVuelo');

    if (tipo === 'PILOTO') {
      horasVueloControl?.enable(); // 👈 habilitar control
    } else {
      horasVueloControl?.disable(); // 👈 deshabilitar control
      horasVueloControl?.reset();  // opcional: limpia el valor
    }
  }


  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPassword(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(' Usuario registrado:', this.userForm.value);
      // Aquí puedes integrar Firebase Auth o Firestore

      this.authService.register(this.userForm.value).then(response => {
         console.log(response);
      })
    } else {
      console.log(' Formulario inválido');
    }
  }

}
