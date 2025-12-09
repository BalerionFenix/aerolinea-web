import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BaseService } from '../../../core/services/base.service';
import { PilotoService } from '../../../core/services/piloto.service';
import { Base } from '../../../core/models/base_avion/base.model';
import { Piloto } from '../../../core/models/Personal/piloto.model';

@Component({
  selector: 'app-pilots-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './pilots-edit.component.html',
  standalone: true,
})
export class PilotsEditComponent implements OnInit {
  pilotoForm: FormGroup;
  bases: Base[] = [];
  pilotoId: number = 0;
  piloto: Piloto | null = null;
  isLoading: boolean = false;
  isLoadingBases: boolean = true;
  isLoadingPiloto: boolean = true;

  certificaciones = [
    'Boeing 737 (B737)',
    'Boeing 747 (B747)',
    'Boeing 757/767',
    'Boeing 777',
    'Boeing 787',
    'Airbus A320',
    'Airbus A330',
    'Airbus A350',
    'Airbus A380',
    'ATR 42/72',
    'Embraer E170/E190',
    'Cessna Citation',
    'Gulfstream G650'
  ];

  selectedCertificaciones: string[] = [];

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private pilotoService: PilotoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pilotoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      base_codigo: ['', Validators.required],
      horas_vuelo: ['', [Validators.required, Validators.min(0)]],
      licencia: ['', Validators.required],
      fecha_vencimiento_licencia: ['', Validators.required],
      certificaciones: [[], Validators.required],
      activo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pilotoId = Number(params['id']);
      if (this.pilotoId) {
        this.cargarBases();
        this.cargarPiloto();
      }
    });
  }

  cargarBases(): void {
    this.isLoadingBases = true;
    this.baseService.getBases().subscribe({
      next: (bases: Base[]) => {
        this.bases = bases;
        this.isLoadingBases = false;
        console.log('Bases cargadas:', bases);
      },
      error: (error) => {
        console.error('Error al cargar las bases aéreas:', error);
        this.isLoadingBases = false;
        alert('Error al cargar las bases aéreas');
      }
    });
  }

  cargarPiloto(): void {
    this.isLoadingPiloto = true;
    this.pilotoService.getPilotoById(this.pilotoId).subscribe({
      next: (piloto: Piloto | null) => {
        if (piloto) {
          this.piloto = piloto;
          // Cargar las certificaciones guardadas PRIMERO
          this.selectedCertificaciones = Array.isArray(piloto.certificaciones)
            ? [...piloto.certificaciones]
            : [];

          // Cargar el formulario con los datos
          this.pilotoForm.patchValue({
            nombre: piloto.nombre,
            base_codigo: piloto.base_codigo,
            horas_vuelo: piloto.horas_vuelo,
            licencia: piloto.licencia,
            fecha_vencimiento_licencia: piloto.fecha_vencimiento_licencia,
            certificaciones: this.selectedCertificaciones,
            activo: piloto.activo
          });

          // Quitar el loading DESPUÉS para que Angular renderice con los datos
          setTimeout(() => {
            this.isLoadingPiloto = false;
          }, 100);

          console.log('Piloto cargado:', piloto);
          console.log('Certificaciones cargadas:', this.selectedCertificaciones);
        } else {
          alert('Piloto no encontrado');
          this.router.navigate(['/dashboard/pilotos']);
        }
      },
      error: (error) => {
        console.error('Error al cargar el piloto:', error);
        this.isLoadingPiloto = false;
        alert('Error al cargar el piloto');
        this.router.navigate(['/dashboard/pilotos']);
      }
    });
  }

  isCertificacionSelected(certificacion: string): boolean {
    return this.selectedCertificaciones.includes(certificacion);
  }

  onCertificacionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (input.checked) {
      if (!this.selectedCertificaciones.includes(value)) {
        this.selectedCertificaciones.push(value);
      }
    } else {
      this.selectedCertificaciones = this.selectedCertificaciones.filter(cert => cert !== value);
    }
    this.pilotoForm.get('certificaciones')?.setValue(this.selectedCertificaciones);
  }

  actualizarPiloto(): void {
    if (this.pilotoForm.valid) {
      this.isLoading = true;
      const pilotoData = {
        ...this.pilotoForm.value,
        base_codigo: Number(this.pilotoForm.value.base_codigo),
        horas_vuelo: Number(this.pilotoForm.value.horas_vuelo),
        activo: this.pilotoForm.value.activo === true || this.pilotoForm.value.activo === 'true'
      };

      console.log('Datos del piloto a actualizar:', pilotoData);

      this.pilotoService.updatePiloto(this.pilotoId, pilotoData).subscribe({
        next: (response) => {
          console.log('Piloto actualizado exitosamente:', response);
          this.isLoading = false;
          alert('Piloto actualizado exitosamente');
          this.router.navigate(['/dashboard/pilotos']);
        },
        error: (error) => {
          console.error('Error al actualizar piloto:', error);
          this.isLoading = false;
          alert('Error al actualizar el piloto. Por favor, intente nuevamente.');
        }
      });
    } else {
      console.log('Formulario inválido');
      this.marcarCamposComoTocados();
      alert('Por favor, complete todos los campos requeridos');
    }
  }

  marcarCamposComoTocados(): void {
    Object.keys(this.pilotoForm.controls).forEach(key => {
      this.pilotoForm.get(key)?.markAsTouched();
    });
  }

  cancelar(): void {
    if (confirm('¿Está seguro de cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/dashboard/pilotos']);
    }
  }

  hasError(field: string, error: string): boolean {
    const control = this.pilotoForm.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched));
  }

  isFieldInvalid(field: string): boolean {
    const control = this.pilotoForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
