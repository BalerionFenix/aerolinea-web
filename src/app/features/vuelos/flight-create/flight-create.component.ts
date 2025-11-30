import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {AvionService} from '../../../core/services/avion.service';
import { VueloService } from '../../../core/services/vuelo.service';
import { Router } from '@angular/router';
import {VueloInput} from '../../../core/models/vuelos/vuelo.model';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class FlightCreateComponent implements OnInit {

  vueloForm!: FormGroup;
  aviones: any[] = [];

  pilotos = [
    { codigo: 'P1', nombre: 'Juan Pérez' },
    { codigo: 'P2', nombre: 'Carlos Ruiz' }
  ];

  constructor(
    private fb: FormBuilder,
    private avionService: AvionService,
    private vueloService: VueloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vueloForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      avion_codigo: ['', Validators.required],
      piloto_codigo: ['', Validators.required],
      estado: ['PROGRAMADO'],
      duracion_vuelo: [''],
      hora_salida_real: [''],
      hora_llegada_real: [''],
      observaciones: ['']
    });

    this.cargarAviones();
  }

  cargarAviones() {
    this.avionService.getAviones().subscribe({
      next: (data) => {
        this.aviones = data;
        console.log("[Aviones recibidos]", data);
      },
      error: (err) => {
        console.error("Error cargando aviones", err);
      }
    });
  }

  crearVuelo() {
    if (this.vueloForm.invalid) {
      this.vueloForm.markAllAsTouched();
      return;
    }

    // Copia del valor del form
    const vueloDataRaw = { ...this.vueloForm.value };

    // Asegurarnos de enviar el tipo que espera el backend (número si es entero)
    // Si avion_codigo viene como string, convertirlo:
    if (vueloDataRaw.avion_codigo !== undefined && vueloDataRaw.avion_codigo !== null && vueloDataRaw.avion_codigo !== '') {
      vueloDataRaw.avion_codigo = String(vueloDataRaw.avion_codigo);
    }

    // El backend NO espera vuelo_num (se genera automático) => eliminar si existe
    delete vueloDataRaw.vuelo_num;
    delete vueloDataRaw.duracion_vuelo;
    console.log('JSON enviado al backend:', vueloDataRaw);

    this.vueloService.createVuelo(vueloDataRaw).subscribe({
      next: (resp) => {
        console.log('Vuelo creado', resp);
        alert('Vuelo registrado correctamente');
        this.router.navigate(['/dashboard/vuelos']);
      },
      error: (err) => {
        console.error('Error cargando el vuelo', err);
        // Si el backend devuelve body.errors, muéstralo
        const backendErrors = err?.error?.errors;
        if (Array.isArray(backendErrors)) {
          console.warn('Errores backend:', backendErrors);
          alert('Error al crear vuelo:\n' + backendErrors.map(e => JSON.stringify(e)).join('\n'));
        } else {
          alert('Ocurrió un error al registrar el vuelo');
        }
      }
    });
  }

}
