import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Base} from '../../../core/models/base_avion/base.model';
import {BaseService} from '../../../core/services/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AvionService} from '../../../core/services/avion.service';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {NgForOf, NgIf} from '@angular/common';
import {Rol} from '../../../core/models/Usuarios/rol.model';
import {UserService} from '../../../core/services/user.service';
import {Usuario, UsuarioInputDTO} from '../../../core/models/Usuarios/usuario.model';
import {RolService} from '../../../core/services/rol.service';



@Component({
  selector: 'app-users-edit',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,

  ],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
  userForm!: FormGroup;
  roles: Rol[] = [];
  bases: Base[] = [];
  usuarioId!: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private rolService: RolService,
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));

    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      base_codigo: ['', Validators.required],
      persona_codigo: [{ value: '', disabled: true }],
      activo: [true]
    });

    this.loadRoles();
    this.loadBases();
    this.loadUsuario();
  }

  loadRoles() {
    this.rolService.getRoles().subscribe(roles => this.roles = roles);
  }

  loadBases() {
    this.baseService.getBases().subscribe(bases => this.bases = bases);
  }

  loadUsuario() {
    this.usuarioService.getUserById(this.usuarioId).subscribe((user: Usuario) => {
      this.userForm.patchValue({
        nombre: user.nombre,
        email: user.email,
        rol_id: user.rol?.rol_id,
        base_codigo: user.base_codigo,
        persona_codigo: user.persona_codigo,
        activo: user.activo
      });
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const dto = new UsuarioInputDTO(this.userForm.getRawValue());

    this.usuarioService.updateUser(dto, this.usuarioId).subscribe({
      next: () => this.router.navigate(['/dashboard/usuarios']),
      error: err => console.error('Error actualizando usuario', err)
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
