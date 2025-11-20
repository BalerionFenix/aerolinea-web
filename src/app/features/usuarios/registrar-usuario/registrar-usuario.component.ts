import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {UsuarioInputDTO} from '../../../core/models/Usuarios/usuario.model';

@Component({
  selector: 'app-registrar-usuario',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    NgIf
  ],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {


  userForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  passwordStrength = 0;
  passwordStrengthLabel = 'Débil';
  passwordStrengthColor = '#ffc107';
  passwordStrengthClass = 'text-warning';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // Evaluar fuerza de contraseña
    this.userForm.get('password')?.valueChanges.subscribe(value => this.evaluatePasswordStrength(value));

    // Validar confirmPassword
    this.userForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      const password = this.userForm.get('password')?.value;
      const confirm = this.userForm.get('confirmPassword')?.value;
      this.userForm.get('confirmPassword')?.setErrors(password !== confirm ? { mismatch: true } : null);
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  evaluatePasswordStrength(password: string) {
    let score = 0;
    if (!password) score = 0;
    else {
      if (password.length >= 6) score += 25;
      if (/[A-Z]/.test(password)) score += 25;
      if (/[0-9]/.test(password)) score += 25;
      if (/[\W]/.test(password)) score += 25;
    }
    this.passwordStrength = score;

    if (score <= 25) {
      this.passwordStrengthLabel = 'Débil';
      this.passwordStrengthColor = '#ffc107';
      this.passwordStrengthClass = 'text-warning';
    } else if (score <= 50) {
      this.passwordStrengthLabel = 'Media';
      this.passwordStrengthColor = '#0d6efd';
      this.passwordStrengthClass = 'text-primary';
    } else if (score <= 75) {
      this.passwordStrengthLabel = 'Fuerte';
      this.passwordStrengthColor = '#28a745';
      this.passwordStrengthClass = 'text-success';
    } else {
      this.passwordStrengthLabel = 'Muy Fuerte';
      this.passwordStrengthColor = '#0f5132';
      this.passwordStrengthClass = 'text-success font-bold';
    }
  }

  submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.userForm.value, rol_id: 2 };
    const dto = new UsuarioInputDTO(formValue);

    // Primero intentamos crear el usuario en el backend
    this.userService.createUser(dto).subscribe({
      next: resp => {
        console.log('Usuario guardado en backend:', resp);

        // Si backend funciona, registramos en Firebase
        this.authService.register(formValue)
          .then(firebaseUser => {
            console.log('Usuario registrado en Firebase:', firebaseUser);
            alert('Usuario creado correctamente. Por favor inicia sesión.');
            this.router.navigate(['/login']);
          })
          .catch(firebaseErr => {
            console.error('Error registrando usuario en Firebase:', firebaseErr);
            alert('Usuario creado en el sistema pero NO en Firebase. Contacta soporte.');
          });

      },
      error: err => {
        console.error('Error guardando usuario en backend:', err);
        alert('No se pudo guardar el usuario en el sistema. Intenta nuevamente.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/login']);
  }
}
