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

      fecha_programada: ['', Validators.required],
      fecha_inicio: [''],
      fecha_fin: [''],

      costo_estimado: [0, Validators.required],
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
              error: (err: any) => console.error('Error al cargar los tiposS', err)

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

    const nuevo: MantenimientoInputDTO = this.form.value;

    this.mantenimientoService.createMantenimiento(nuevo).subscribe({
      next: () => {
        alert('Mantenimiento creado con éxito');
        this.router.navigate(['/dashboard/mantenimiento']);
      },
      error: () => {
        alert('Error al crear mantenimiento');
      }
    });
  }
}
