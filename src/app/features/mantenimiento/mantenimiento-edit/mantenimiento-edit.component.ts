import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MantenimientoService } from '../../../core/services/mantenimiento.service';
import { MantenimientoInputDTO } from '../../../core/models/mantenimiento/mantenimiento.models';
import { TipoMantenimientoService } from '../../../core/services/tipo-mantenimiento.service';
import { AvionService } from '../../../core/services/avion.service'; // ← IMPORTADO

@Component({
  selector: 'app-mantenimiento-edit',
  templateUrl: './mantenimiento-edit.component.html',
  styleUrls: ['./mantenimiento-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MantenimientoEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  tiposMantenimiento: any[] = [];
  aeronaves: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mantenimientoService: MantenimientoService,
    private tipoService: TipoMantenimientoService,
    private avionService: AvionService,     // ← INYECTADO
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.crearFormulario();
    this.cargarTipos();
    this.cargarAeronaves();   // ← FALTABA
    this.cargarMantenimiento();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      tipo_mantenimiento_id: ['', Validators.required],
      aeronave_id: ['', Validators.required],

      fecha_programada: ['', Validators.required],
      fecha_inicio: [''],
      fecha_fin: [''],

      costo_estimado: ['', Validators.required],
      costo_real: [''],

      descripcion: [''],
      estado: ['', Validators.required],

      personal_asignado: ['']
    });
  }

  cargarTipos() {
    this.tipoService.getTiposMantenimiento().subscribe({
      next: data => this.tiposMantenimiento = data
    });
  }

  cargarAeronaves() {
    this.avionService.getAviones().subscribe({
      next: data => {
        console.log("Aeronaves cargadas:", data);
        this.aeronaves = data;
      }
    });
  }

  cargarMantenimiento(): void {
    this.mantenimientoService.getMantenimientoById(this.id).subscribe({
      next: (data) => {

        this.form.patchValue({
          tipo_mantenimiento_id: data.tipo_mantenimiento_id,
          aeronave_id: data.aeronave_id,

          fecha_programada: data.fecha_programada?.substring(0, 10),
          fecha_inicio: data.fecha_inicio?.substring(0, 10),
          fecha_fin: data.fecha_fin?.substring(0, 10),

          costo_estimado: Number(data.costo_estimado),
          costo_real: data.costo_real ? Number(data.costo_real) : null,

          descripcion: data.descripcion,
          estado: data.estado,
          personal_asignado: data.personal_asignado
        });
      }
    });
  }

  guardar(): void {
  if (this.form.invalid) {
    console.warn("❌ FORM INVALIDO, no se envía");
    console.log(this.form.value);
    return;
  }

  const raw = this.form.value;
  console.log("FORM VALUE RAW:", raw);

  const dto = new MantenimientoInputDTO({
    tipo_mantenimiento_id: Number(raw.tipo_mantenimiento_id),
    aeronave_id: Number(raw.aeronave_id),

    fecha_programada: new Date(raw.fecha_programada).toISOString(),
    fecha_inicio: raw.fecha_inicio ? new Date(raw.fecha_inicio).toISOString() : null,
    fecha_fin: raw.fecha_fin ? new Date(raw.fecha_fin).toISOString() : null,

    costo_estimado: Number(raw.costo_estimado),
    costo_real: raw.costo_real ? Number(raw.costo_real) : null,

    descripcion: raw.descripcion,
    estado: raw.estado,
    personal_asignado: raw.personal_asignado
  });

  console.log("DTO QUE SE ENVIA:", dto);

  this.mantenimientoService.updateMantenimiento(this.id, dto).subscribe({
    next: () => {
      alert("Mantenimiento actualizado");
      this.router.navigate(['/dashboard/mantenimiento']);
    },
    error: (err) => {
        console.error("❌ RESPUESTA DEL BACKEND:", err.error);

        if (err.error?.message) console.error("MENSAJE:", err.error.message);
        if (err.error?.errors) console.table(err.error.errors);

        alert('Error al Actualizar');
      }
    
  });
}


  volver(): void {
    this.router.navigate(['/dashboard/mantenimiento']);
  }
}
