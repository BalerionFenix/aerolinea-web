import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../../core/services/base.service';
import {BaseInputDTO} from '../../../core/models/base_avion/base.model';

@Component({
  selector: 'app-bases-edit',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './bases-edit.component.html',
  styleUrl: './bases-edit.component.css'
})
export class BasesEditComponent {
  baseForm!: FormGroup;
  baseId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private baseService: BaseService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.baseId = Number(this.route.snapshot.paramMap.get('id'));

    this.baseForm = this.fb.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['Activo', Validators.required]
    });

    this.cargarBase();
  }

  cargarBase(): void {
    this.baseService.getBaseById(this.baseId).subscribe({
      next: (base) => {
        this.baseForm.patchValue(base);
      },
      error: () => {
        alert('No se pudo cargar la base.');
        this.router.navigate(['/dashboard/bases-aereas']);
      }
    });
  }

  actualizarBase(): void {
    this.baseForm.markAllAsTouched();

    if (this.baseForm.invalid) return;

    const dto = new BaseInputDTO(this.baseForm.value);

    this.baseService.updateBase(dto, this.baseId).subscribe({
      next: () => {
        alert('Base actualizada correctamente!');
        this.router.navigate(['/dashboard/bases-aereas']);
      },
      error: () => {
        alert('No se pudo actualizar la base.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/bases-aereas']);
  }

}
