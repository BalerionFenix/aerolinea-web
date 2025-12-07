import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mantenimiento-edit',
  templateUrl: './mantenimiento-edit.component.html',
  styleUrls: ['./mantenimiento-edit.component.css']
})
export class MantenimientoEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 1️⃣ Captura del ID
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.modoEdicion = true;
    }

    // 2️⃣ Crear formulario
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha: ['', Validators.required],
      estado: ['', Validators.required]
    });

    // 3️⃣ Si viene ID cargamos datos simulados o desde servicio
    if (this.modoEdicion) {
      this.cargarDatos();
    }
  }

  cargarDatos(): void {
    // 🔧 Aquí iría el servicio que busca el mantenimiento por ID.
    // Por ahora simulo datos.
    const datos = {
      nombre: 'Mantenimiento preventivo',
      descripcion: 'Revisión general',
      fecha: '2025-01-01',
      estado: 'Activo'
    };

    this.form.patchValue(datos);
  }
  volver(): void {
    this.router.navigate(['/dashboard/mantenimiento']);
  }

  guardar(): void {
    if (this.form.invalid) return;

    const mantenimiento = this.form.value;

    if (this.modoEdicion) {
      console.log('Actualizando mantenimiento ID:', this.id, mantenimiento);
    } else {
      console.log('Creando mantenimiento nuevo:', mantenimiento);
    }

    // Redirige al listado
    this.router.navigate(['/dashboard/mantenimiento']);
  }
}
