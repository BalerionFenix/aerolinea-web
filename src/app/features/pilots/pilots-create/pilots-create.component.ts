import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BaseService } from '../../../core/services/base.service';
import { PilotoService } from '../../../core/services/piloto.service';
import { Base } from '../../../core/models/base_avion/base.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pilots-create',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './pilots-create.component.html',
  standalone: true,
})
export class PilotsCreateComponent implements OnInit, OnDestroy {
  pilotoForm: FormGroup;
  bases: Base[] = [];
  isLoading: boolean = false;
  isLoadingBases: boolean = true;
  private subscriptions: Subscription[] = [];

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
    private router: Router
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
    // Limpiar certificaciones al iniciar
    this.selectedCertificaciones = [];
    this.cargarBases();
  }

  ngOnDestroy(): void {
    // Limpiar todas las suscripciones
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  cargarBases(): void {
    this.isLoadingBases = true;
    const sub = this.baseService.getBases().subscribe({
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
    this.subscriptions.push(sub);
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
    console.log('Certificaciones seleccionadas:', this.selectedCertificaciones);
  }

  crearPiloto(): void {
    if (this.pilotoForm.valid) {
      this.isLoading = true;

      // Construir el objeto con los datos exactos necesarios
      const pilotoData = {
        nombre: this.pilotoForm.value.nombre.trim(),
        base_codigo: Number(this.pilotoForm.value.base_codigo),
        horas_vuelo: Number(this.pilotoForm.value.horas_vuelo),
        licencia: this.pilotoForm.value.licencia.trim(),
        fecha_vencimiento_licencia: this.pilotoForm.value.fecha_vencimiento_licencia,
        certificaciones: [...this.selectedCertificaciones], // Crear copia del array
        activo: Boolean(this.pilotoForm.value.activo)
      };

      console.log('Datos del piloto a crear:', pilotoData);

      const sub = this.pilotoService.createPiloto(pilotoData).subscribe({
        next: (response) => {
          console.log('Piloto creado exitosamente:', response);
          this.isLoading = false;
          alert('Piloto creado exitosamente');

          // Limpiar el formulario
          this.pilotoForm.reset({
            nombre: '',
            base_codigo: '',
            horas_vuelo: '',
            licencia: '',
            fecha_vencimiento_licencia: '',
            certificaciones: [],
            activo: true
          });
          this.selectedCertificaciones = [];

          // Navegar a la lista de pilotos
          this.router.navigate(['/dashboard/pilotos']);
        },
        error: (error) => {
          console.error('Error al crear piloto:', error);
          this.isLoading = false;
          alert('Error al crear el piloto. Por favor, intente nuevamente.');
        }
      });
      this.subscriptions.push(sub);
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
    if (confirm('¿Está seguro de cancelar? Los datos no guardados se perderán.')) {
      // Limpiar el formulario antes de salir
      this.pilotoForm.reset();
      this.selectedCertificaciones = [];
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
