import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Base} from '../../../core/models/base_avion/base.model';
import {BaseService} from '../../../core/services/base.service';
import {Rol} from '../../../core/models/Usuarios/rol.model';
import {Router} from '@angular/router';
import {RolService} from '../../../core/services/rol.service';
import {AuthService} from '../../../core/services/auth.service';
import {UsuarioInputDTO} from '../../../core/models/Usuarios/usuario.model';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-users-create',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    NgStyle,
    NgForOf
  ],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.css'
})
export class UsersCreateComponent {

  userForm!: FormGroup;
  showPassword = false;

  bases: Base[] = [];
  roles: Rol[] = [];

  passwordStrength = 0;
  passwordStrengthLabel = 'Débil';
  passwordStrengthColor = '#ffc107';
  passwordStrengthClass: string = 'text-warning';

  constructor(private fb: FormBuilder, private baseService: BaseService,
              private rolService: RolService, private router: Router,
              private authService: AuthService, private userService: UserService,) {}

  ngOnInit(): void {
    // Inicializar formulario
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      base_codigo: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      activo: [true],
    });

    // Suscribirse a cambios de password
    this.userForm.get('password')?.valueChanges.subscribe(value => {
      this.evaluatePasswordStrength(value);
    });

    // Validar confirmPassword
    this.userForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      const password = this.userForm.get('password')?.value;
      const confirm = this.userForm.get('confirmPassword')?.value;
      this.userForm.get('confirmPassword')?.setErrors(password !== confirm ? { mismatch: true } : null);
    });

    // Cargar bases desde el servicio
    this.loadBases();
    this.loadRoles();
  }

  loadBases(): void {
    this.baseService.getBases().subscribe({
      next: (bases) => {
        this.bases = bases;
        console.log('Bases cargadas:', this.bases);
      },
      error: (err) => {
        console.error('Error al cargar las bases', err);
      }
    });
  }

  loadRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Roles cargados:', this.roles);
      },
      error: (err) => console.error('Error al cargar roles', err)
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  evaluatePasswordStrength(password: string) {
    let score = 0;
    if (!password) { score = 0; }
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

    const formValue = this.userForm.value;

    // Crear usuario en Firebase DESDE EL BACKEND via createUser()
    this.authService.createUser({
      email: formValue.email,
      password: formValue.password
    }).subscribe({
      next: (firebaseResp: any) => {
        console.log('Usuario creado en Firebase (vía backend):', firebaseResp);

        // Ahora guardarlo en tu backend principal
        const dto = new UsuarioInputDTO(formValue);

        this.userService.createUser(dto).subscribe({
          next: (resp: any) => {
            console.log('Usuario guardado correctamente en backend:', resp);
            this.router.navigate(['/dashboard/usuarios']);
          },
          error: (err: any) => {
            console.error('Error guardando usuario en backend:', err);
            alert('Error guardando usuario en el sistema.');
          }
        });
      },

      error: (firebaseErr: any) => {
        console.error('Error creando usuario en Firebase:', firebaseErr);
        alert('No se pudo crear en Firebase.');
      }
    });
  }


  cancel() {
    // Regresa a la vista de usuarios
     this.router.navigate(['/dashboard/usuarios']);
  }

}
