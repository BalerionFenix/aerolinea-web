import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Base} from '../../../core/models/base_avion/base.model';
import {BaseService} from '../../../core/services/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AvionService} from '../../../core/services/avion.service';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {NgForOf, NgIf} from '@angular/common';



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

  loadBases() {
    this.baseService.getBases().subscribe({
      next: (bases) => this.bases = bases,
      error: (err) => console.error('Error cargando bases', err)
    });
  }

  loadAvion() {
    this.avionService.getAvionById(this.avionId).subscribe({
      next: (avion: Avion | null) => {
        if (!avion) return;
        this.avionForm.patchValue({
          tipo: avion.tipo,
          modelo: avion.modelo,
          fabricante: avion.fabricante,
          capacidad: avion.capacidad,
          anio_fabricacion: avion.anio_fabricacion,
          base_codigo: avion.base_codigo,
          horas_vuelo_totales: avion.horas_vuelo_totales
        });
      },
      error: (err) => console.error('Error cargando avión', err)
    });
  }


  submitForm() {
    if (this.avionForm.invalid) {
      this.avionForm.markAllAsTouched();
      return;
    }
    const avion: Avion = this.avionForm.getRawValue();
    this.avionService.updateAvion(avion, this.avionId).subscribe({
      next: () => this.router.navigate(['/dashboard/aviones']),
      error: (err) => console.error('Error actualizando avión', err)
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/aviones']);
  }

}
