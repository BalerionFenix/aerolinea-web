import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Base} from '../../../core/models/base_avion/base.model';
import {BaseService} from '../../../core/services/base.service';
import {AvionService} from '../../../core/services/avion.service';
import {Router} from '@angular/router';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-aviones-create',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './aviones-create.component.html',
  styleUrl: './aviones-create.component.css'
})
export class AvionesCreateComponent {
  avionForm!: FormGroup;
  bases: Base[] = [];

  constructor(private fb: FormBuilder, private baseService: BaseService,
              private avionService: AvionService, private router: Router) {}

  ngOnInit(): void {
    this.avionForm = this.fb.group({
      tipo: ['', Validators.required],
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      capacidad: [null],
      anio_fabricacion: [null],
      base_codigo: ['', Validators.required],
      horas_vuelo_totales: [0, Validators.required],
    });

    this.loadBases();
  }

  loadBases() {
    this.baseService.getBases().subscribe({
      next: (bases) => this.bases = bases,
      error: (err) => console.error('Error cargando bases', err)
    });
  }

  submitForm() {
    if (this.avionForm.invalid) {
      this.avionForm.markAllAsTouched();
      return;
    }

    const avion = new Avion(this.avionForm.value);

    this.avionService.createAvion(avion).subscribe({
      next: () => this.router.navigate(['/dashboard/aviones']),
      error: (err) => console.error('Error creando avión', err)
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/aviones']);
  }

}
