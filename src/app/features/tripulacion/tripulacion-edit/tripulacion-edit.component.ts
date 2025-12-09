import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from '../../../core/services/base.service';
import { Base } from '../../../core/models/base_avion/base.model';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TripulacionService } from '../../../core/services/tripulacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tripulacion-edit',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './tripulacion-edit.component.html',
  styleUrls: ['./tripulacion-edit.component.css'],
  standalone: true,
})
export class TripulacionEditComponent implements OnInit {
  tripulacionForm: FormGroup;
  bases: Base[] = [];
  miembroId: number;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private tripulacionService: TripulacionService,
    private route: ActivatedRoute
  ) {
    this.tripulacionForm = this.fb.group({
      nombre: ['', Validators.required],
      base_codigo: ['', Validators.required],
      cargo: ['', Validators.required],
      activo: [true, Validators.required],
    });
    this.miembroId = 0;
  }

  ngOnInit(): void {
    this.miembroId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarBases();
    this.cargarDatosMiembro();
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

  cargarDatosMiembro(): void {
    this.tripulacionService.getMiembroById(this.miembroId).subscribe(
      (miembro) => {
        if (miembro) {
          this.tripulacionForm.patchValue(miembro);
        }
      },
      (error) => {
        console.error('Error al cargar los datos del miembro:', error);
      }
    );
  }

  editarTripulante(): void {
    if (this.tripulacionForm.valid) {
      const tripulanteData = this.tripulacionForm.value;
      this.tripulacionService.updateMiembro(this.miembroId, tripulanteData).subscribe(
        (response) => {
          console.log('Tripulante actualizado exitosamente:', response);
          history.back();
        },
        (error) => {
          console.error('Error al actualizar el tripulante:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  cancelar(): void {
    console.log('Acción de cancelar');
    history.back();
  }
}
