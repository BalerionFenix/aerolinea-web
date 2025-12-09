import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TipoMantenimiento} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {MantenimientoService} from '../../../core/services/mantenimiento.service';
import {TipoMantenimientoService} from '../../../core/services/tipo-mantenimiento.service';
import {AvionService} from '../../../core/services/avion.service';
import {Mantenimiento} from '../../../core/models/mantenimiento/mantenimiento.models';

@Component({
  selector: 'app-mantenimiento-editar',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './mantenimiento-editar.component.html',
  styleUrl: './mantenimiento-editar.component.css'
})
export class MantenimientoEditarComponent {


  mantenimientoForm!: FormGroup;
  tiposMantenimiento: TipoMantenimiento[] = [];
  aviones: Avion[] = [];
  mantenimientoId!: number;
  loading = true;
  error: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mantenimientoService: MantenimientoService,
    private tipoMantenimientoService: TipoMantenimientoService,
    private avionService: AvionService
  ) {}

  ngOnInit(): void {
    this.mantenimientoId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();

    // Primero cargar los datos necesarios para los selects
    Promise.all([
      this.loadTiposMantenimientoPromise(),
      this.loadAvionesPromise()
    ]).then(() => {
      // Después de cargar los datos de los selects, cargar el mantenimiento
      this.loadMantenimiento();
    });

    // Suscribirse a cambios en fecha_programada y tipo_mantenimiento_id
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
      fecha_inicio: [''],
      fecha_fin: [''],
      costo_estimado: ['', [Validators.required, Validators.min(0)]],
      costo_real: ['', [Validators.min(0)]],
      descripcion: ['', Validators.required],
      personal_asignado: ['', Validators.required],
      estado: ['programado', Validators.required]
    });
  }

  loadTiposMantenimiento(): void {
    this.tipoMantenimientoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposMantenimiento = tipos.filter(t => t.estado);
        console.log('Tipos de mantenimiento cargados:', this.tiposMantenimiento);
      },
      error: (error) => {
        console.error('Error al cargar tipos de mantenimiento:', error);
        this.error = 'Error al cargar los tipos de mantenimiento';
      }
    });
  }

  loadTiposMantenimientoPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tipoMantenimientoService.getAll().subscribe({
        next: (tipos) => {
          this.tiposMantenimiento = tipos.filter(t => t.estado);
          console.log('Tipos de mantenimiento cargados:', this.tiposMantenimiento);
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar tipos de mantenimiento:', error);
          this.error = 'Error al cargar los tipos de mantenimiento';
          reject(error);
        }
      });
    });
  }

  loadAviones(): void {
    this.avionService.getAviones().subscribe({
      next: (aviones) => {
        this.aviones = aviones.filter(a => a.activo);
        console.log('Aviones cargados:', this.aviones);
      },
      error: (error) => {
        console.error('Error al cargar aviones:', error);
        this.error = 'Error al cargar las aeronaves';
      }
    });
  }

  loadAvionesPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.avionService.getAviones().subscribe({
        next: (aviones) => {
          this.aviones = aviones.filter(a => a.activo);
          console.log('Aviones cargados:', this.aviones);
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar aviones:', error);
          this.error = 'Error al cargar las aeronaves';
          reject(error);
        }
      });
    });
  }

  loadMantenimiento(): void {
    this.loading = true;
    this.error = null;

    this.mantenimientoService.getById(this.mantenimientoId).subscribe({
      next: (dto) => {
        console.log('Datos recibidos del backend:', dto);
        const mantenimiento = new Mantenimiento(dto);

        // Función auxiliar para convertir fechas de forma segura
        const safeDateToInput = (date: any): string => {
          if (!date) return '';
          // Intentar crear fecha desde el string/objeto recibido
          let d: Date;
          if (typeof date === 'string') {
            // Si es string, puede venir como "2024-12-15" o "2024-12-15T00:00:00"
            d = new Date(date + 'T00:00:00');
          } else {
            d = new Date(date);
          }

          if (isNaN(d.getTime())) {
            console.error('Fecha inválida:', date);
            return '';
          }

          // Retornar en formato YYYY-MM-DD
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        console.log('Mantenimiento procesado:', mantenimiento);
        console.log('Tipo mantenimiento ID:', mantenimiento.tipoMantenimientoId);
        console.log('Avion codigo:', mantenimiento.avion_codigo);
        console.log('Costo estimado:', mantenimiento.costoEstimado);
        console.log('Personal asignado:', mantenimiento.personalAsignado);

        // Verificar que los datos existen en los arrays
        const tipoExiste = this.tiposMantenimiento.find(t => t.id === mantenimiento.tipoMantenimientoId);
        const avionExiste = this.aviones.find(a => a.avion_codigo === mantenimiento.avion_codigo);

        console.log('Tipo existe en lista?', tipoExiste);
        console.log('Avión existe en lista?', avionExiste);

        // Precargar TODOS los valores del formulario
        this.mantenimientoForm.patchValue({
          tipo_mantenimiento_id: mantenimiento.tipoMantenimientoId?.toString() || '',
          avion_codigo: mantenimiento.avion_codigo || '',
          fecha_programada: safeDateToInput(mantenimiento.fechaProgramada),
          fecha_inicio: safeDateToInput(mantenimiento.fechaInicio),
          fecha_fin: safeDateToInput(mantenimiento.fechaFin),
          costo_estimado: mantenimiento.costoEstimado || '',
          costo_real: mantenimiento.costoReal || '',
          descripcion: mantenimiento.descripcion || '',
          personal_asignado: mantenimiento.personalAsignado || '',
          estado: mantenimiento.estado || 'programado'
        }, { emitEvent: false }); // No emitir eventos para evitar cálculos automáticos en la carga inicial

        console.log('Formulario después de patchValue:', this.mantenimientoForm.value);
        console.log('Estado del formulario:', {
          valid: this.mantenimientoForm.valid,
          invalid: this.mantenimientoForm.invalid,
          errors: this.mantenimientoForm.errors
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar mantenimiento:', error);
        this.error = 'No se pudo cargar el mantenimiento. Por favor, intente nuevamente.';
        this.loading = false;
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

    const updatedMantenimiento = new Mantenimiento({
      id: this.mantenimientoId,
      tipo_mantenimiento_id: Number(formValue.tipo_mantenimiento_id),
      avion_codigo: formValue.avion_codigo,
      fecha_programada: formValue.fecha_programada,
      fecha_inicio: formValue.fecha_inicio || null,
      fecha_fin: formValue.fecha_fin || null,
      costo_estimado: Number(formValue.costo_estimado),
      costo_real: formValue.costo_real ? Number(formValue.costo_real) : null,
      descripcion: formValue.descripcion || null,
      estado: formValue.estado,
      personal_asignado: formValue.personal_asignado || null
    });

    this.mantenimientoService.update(this.mantenimientoId, updatedMantenimiento).subscribe({
      next: (response) => {
        console.log('Mantenimiento actualizado exitosamente:', response);
        this.router.navigate(['dashboard/mantenimiento']);
      },
      error: (error) => {
        console.error('Error al actualizar mantenimiento:', error);
        this.error = 'Error al actualizar el mantenimiento. Por favor, intente nuevamente.';
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
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
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
      }, { emitEvent: false }); // emitEvent: false para evitar bucles infinitos
    }
  }

}
