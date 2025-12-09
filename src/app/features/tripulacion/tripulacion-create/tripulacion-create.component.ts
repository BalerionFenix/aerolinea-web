import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from '../../../core/services/base.service';
import { Base } from '../../../core/models/base_avion/base.model';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TripulacionService } from '../../../core/services/tripulacion.service';

@Component({
  selector: 'app-tripulacion-create',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './tripulacion-create.component.html',
  styleUrls: ['./tripulacion-create.component.css'],
  standalone: true,
})
export class TripulacionCreateComponent implements OnInit {
  tripulacionForm: FormGroup;
  bases: Base[] = [];

  constructor(private fb: FormBuilder, private baseService: BaseService, private tripulacionService: TripulacionService) {
    this.tripulacionForm = this.fb.group({
      nombre: ['', Validators.required],
      base_codigo: ['', Validators.required],
      cargo: ['', Validators.required],
      activo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarBases();
  }

  cargarBases(): void {
    this.baseService.getBases().subscribe(
      (bases: Base[]) => {
        this.bases = bases;
      },
      (error: any) => {
        console.error('Error al cargar las bases aéreas:', error);
      }
    );
  }

  crearTripulante(): void {
    if (this.tripulacionForm.valid) {
      const tripulanteData = this.tripulacionForm.value;
      this.tripulacionService.createMiembro(tripulanteData).subscribe(
        (response) => {
          console.log('Tripulante creado exitosamente:', response);
        },
        (error) => {
          console.error('Error al crear el tripulante:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
    history.back();
  }

  cancelar(): void {
    console.log('Acción de cancelar');
    // Navegar a la página anterior
    history.back();
  }
}
