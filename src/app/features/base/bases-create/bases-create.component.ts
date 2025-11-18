import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseService} from '../../../core/services/base.service';
import {BaseInputDTO} from '../../../core/models/base_avion/base.model';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bases-create',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './bases-create.component.html',
  styleUrl: './bases-create.component.css'
})
export class BasesCreateComponent {

  baseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.baseForm = this.fb.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['Activo', Validators.required]
    });
  }

  crearBase(): void {
    // Marca todos los campos como "touched" para que Angular muestre los errores
    this.baseForm.markAllAsTouched();

    if (this.baseForm.invalid) {
      // Si el formulario es inválido, se detiene aquí y los campos vacíos se mostrarán
      return;
    }

    const nuevaBase: BaseInputDTO = this.baseForm.value;
    this.baseService.createBase(nuevaBase).subscribe({
      next: () => {
        alert('Base creada correctamente!');
        this.baseForm.reset({ estado: 'Activo' });
        this.router.navigate(['/dashboard/bases-aereas']);
      },
      error: (err) => {
        console.error('Error al crear la base:', err);
        alert('No se pudo crear la base, revisa la consola.');
      }
    });
  }

  cancelar(): void {
    this.baseForm.reset({ estado: 'Activo' });
    this.router.navigate(['/dashboard/bases-aereas']);
  }

}
