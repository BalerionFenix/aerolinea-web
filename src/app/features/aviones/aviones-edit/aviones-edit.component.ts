import { Component } from '@angular/core';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Base} from '../../../core/models/base_avion/base.model';
import {BaseService} from '../../../core/services/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AvionService} from '../../../core/services/avion.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-aviones-edit',
  imports: [
    ReactiveFormsModule, NgForOf
  ],
  templateUrl: './aviones-edit.component.html',
  styleUrl: './aviones-edit.component.css'
})
export class AvionesEditComponent {
  avionForm!: FormGroup;
  bases: Base[] = [];
  avionId!: number;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private avionService: AvionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.avionId = Number(this.route.snapshot.paramMap.get('id'));

    this.avionForm = this.fb.group({
      tipo: ['', Validators.required],
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      capacidad: [null],
      anio_fabricacion: [null],
      base_codigo: ['', Validators.required],
      horas_vuelo_totales: [0, Validators.required]
    });

    this.loadBases();
    this.loadAvion();
  }

  loadBases(): void {
    this.baseService.getBases().subscribe({
      next: (bases) => this.bases = bases,
      error: (err) => console.error('Error cargando bases', err)
    });
  }

  loadAvion(): void {
    this.avionService.getAvionById(this.avionId).subscribe({
      next: (avion: Avion | null) => {
        if (!avion) {
          console.warn('No se encontró el avión.');
          return;
        }
        this.avionForm.patchValue(avion);
      },
      error: (err) => console.error('Error cargando avión', err)
    });
  }

  submitForm(): void {
    this.avionForm.markAllAsTouched();
    if (this.avionForm.invalid) return;

    const dto: Avion = this.avionForm.getRawValue();
    this.avionService.updateAvion(dto, this.avionId).subscribe({
      next: () => this.router.navigate(['/dashboard/aviones']),
      error: (err) => console.error('Error actualizando avión', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/aviones']);
  }
}
