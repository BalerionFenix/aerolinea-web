import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MantenimientoInputDTO } from '../../../core/models/mantenimiento/mantenimiento.models';
import { MantenimientoService } from '../../../core/services/mantenimiento.service';
import { TipoMantenimientoService } from '../../../core/services/tipo-mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {

  form!: FormGroup;
  tiposMantenimiento: any[] = [];

  constructor(
    private fb: FormBuilder,
    private mantenimientoService: MantenimientoService,
    private tipoService: TipoMantenimientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarTipos();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      tipo_mantenimiento_id: [null, Validators.required],

      // Nuevo: aeronave es requerida por el backend
      aeronave_id: [null, Validators.required],

      fecha_programada: ['', Validators.required],
      fecha_inicio: [''],
      fecha_fin: [''],

      costo_estimado: [0, [Validators.required, Validators.min(0)]],
      costo_real: [''],

      descripcion: [''],
      estado: ['programado', Validators.required],

      personal_asignado: ['']
    });
  }

  cargarTipos() {
    this.tipoService.getTiposMantenimiento().subscribe({
      next: (data) => {
        this.tiposMantenimiento = data;
        console.log('Tipos cargados:', data);
      },
      error: (err: any) => console.error('Error al cargar los tipos:', err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/mantenimiento']);
  }

  crear(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    // --- CORRECCIONES IMPORTANTES ---

    const nuevo: MantenimientoInputDTO = {
      tipo_mantenimiento_id: raw.tipo_mantenimiento_id,
      aeronave_id: raw.aeronave_id,

      fecha_programada: raw.fecha_programada ? new Date(raw.fecha_programada).toISOString() : null,
      fecha_inicio: raw.fecha_inicio ? new Date(raw.fecha_inicio).toISOString() : null,
      fecha_fin: raw.fecha_fin ? new Date(raw.fecha_fin).toISOString() : null,

      costo_estimado: Number(raw.costo_estimado),
      costo_real: raw.costo_real ? Number(raw.costo_real) : null,

      descripcion: raw.descripcion,
      estado: raw.estado,
      personal_asignado: raw.personal_asignado
    };

    console.log("📤 Enviando al backend:", nuevo);

    this.mantenimientoService.createMantenimiento(nuevo).subscribe({
      next: () => {
        alert('Mantenimiento creado con éxito');
        this.router.navigate(['/dashboard/mantenimiento']);
      },
      error: (err) => {
        console.error("❌ RESPUESTA DEL BACKEND:", err.error);

        if (err.error?.message) console.error("MENSAJE:", err.error.message);
        if (err.error?.errors) console.table(err.error.errors);

        alert('Error al crear mantenimiento');
      }
    });
  }
}
