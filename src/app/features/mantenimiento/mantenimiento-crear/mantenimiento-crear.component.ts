import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MantenimientoService} from '../../../core/services/mantenimiento.service';
import {TipoMantenimientoService} from '../../../core/services/tipo-mantenimiento.service';
import {Mantenimiento} from '../../../core/models/mantenimiento/mantenimiento.models';
import {TipoMantenimiento} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {AvionService} from '../../../core/services/avion.service';


@Component({
  selector: 'app-mantenimiento-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {

  mantenimientoForm!: FormGroup;
  tiposMantenimiento: TipoMantenimiento[] = [];
  aviones: Avion[] = [];
  loading = false;
  error: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private mantenimientoService: MantenimientoService,
    private tipoMantenimientoService: TipoMantenimientoService,
    private avionService: AvionService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.initForm();
    this.loadTiposMantenimiento();
    this.loadAviones();

    this.mantenimientoForm.get('fecha_programada')?.valueChanges.subscribe(() => {
      this.onFechaProgramadaChange();
    });

    this.mantenimientoForm.get('tipo_mantenimiento_id')?.valueChanges.subscribe(() => {
      this.onFechaProgramadaChange();
    });
  }


  initForm(): void {
    this.mantenimientoForm = this.fb.group({
      tipo_mantenimiento_id: ['', Validators.required],
      avion_codigo: ['', Validators.required],
      fecha_programada: ['', Validators.required],
      fecha_inicio: [''],  // Se llenará automáticamente
      fecha_fin: [''],     // Se llenará automáticamente
      costo_estimado: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      personal_asignado: ['', Validators.required],
      estado: ['programado']
    });
  }

  loadTiposMantenimiento(): void {
    this.tipoMantenimientoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposMantenimiento = tipos.filter(tipo => tipo.estado);
        console.log('Tipos de mantenimiento cargados:', this.tiposMantenimiento);
      },
      error: (error) => {
        console.error('Error al cargar tipos de mantenimiento:', error);
        this.error = 'Error al cargar los tipos de mantenimiento';
      }
    });
  }

  loadAviones(): void {
    this.avionService.getAviones().subscribe({
      next: (aviones) => {
        this.aviones = aviones.filter(avion => avion.activo);
        console.log('Aviones cargados:', this.aviones);
      },
      error: (error) => {
        console.error('Error al cargar aviones:', error);
        this.error = 'Error al cargar las aeronaves';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.mantenimientoForm.invalid) {
      this.markFormGroupTouched(this.mantenimientoForm);
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.mantenimientoForm.value;

    const mantenimiento = new Mantenimiento({
      id: 0,
      tipo_mantenimiento_id: Number(formValue.tipo_mantenimiento_id),
      avion_codigo: formValue.avion_codigo,
      fecha_programada: formValue.fecha_programada,
      fecha_inicio: formValue.fecha_inicio,
      fecha_fin: formValue.fecha_fin,
      costo_estimado: Number(formValue.costo_estimado),
      costo_real: null,
      descripcion: formValue.descripcion,
      estado: formValue.estado,
      personal_asignado: formValue.personal_asignado
    });

    this.mantenimientoService.create(mantenimiento).subscribe({
      next: (response) => {
        console.log('Mantenimiento creado exitosamente:', response);
        this.router.navigate(['dashboard/mantenimiento']);
      },
      error: (error) => {
        console.error('Error al crear mantenimiento:', error);
        this.error = 'Error al crear el mantenimiento. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['dashboard/mantenimiento']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.mantenimientoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.mantenimientoForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field?.hasError('min')) {
      return 'El valor debe ser mayor o igual a 0';
    }
    return '';
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getAvionDisplayName(avion: Avion): string {
    return `${avion.tipo} - ${avion.modelo} (${avion.fabricante})`;
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Sumamos 1 día
    return tomorrow.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }


  onFechaProgramadaChange(): void {
    const fechaProgramada = this.mantenimientoForm.get('fecha_programada')?.value;
    const tipoId = this.mantenimientoForm.get('tipo_mantenimiento_id')?.value;
    const tipo = this.tiposMantenimiento.find(t => t.id == tipoId);

    if (fechaProgramada) {
      const inicio = new Date(fechaProgramada);
      let fin = new Date(fechaProgramada);

      if (tipo) {
        // Sumar duración estimada en días
        fin.setDate(fin.getDate() + tipo.duracionEstimada);
      }

      this.mantenimientoForm.patchValue({
        fecha_inicio: inicio.toISOString().split('T')[0],
        fecha_fin: fin.toISOString().split('T')[0]
      });
    }
  }



}
