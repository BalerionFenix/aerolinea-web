import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VueloService } from '../../../core/services/vuelo.service';
import { AvionService } from '../../../core/services/avion.service';
import { Avion } from '../../../core/models/base_avion/avion.model';
import { Vuelo } from '../../../core/models/vuelos/vuelo.model';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {

  flightForm!: FormGroup;
  aviones: Avion[] = [];
  pilotos = ['Carlos Ruiz', 'Laura Gómez', 'Javier Fernández', 'Ana Torres', 'Miguel Santos'];
  vueloNum!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vuelosService: VueloService,
    private avionService: AvionService
  ) {}

  ngOnInit(): void {
    this.vueloNum = this.route.snapshot.paramMap.get('id') || '';

    this.flightForm = this.fb.group({
      numeroVuelo: [{ value: '', disabled: true }],
      estado: ['Programado', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      avion: ['', Validators.required],
      piloto: ['', Validators.required],
      horaSalidaReal: [''],
      horaLlegadaReal: [''],
      duracion_vuelo: [''],
      observaciones: ['']
    }, { validators: this.validateRoute });

    this.loadAviones();

    if (this.vueloNum) {
      this.vuelosService.getVuelo(this.vueloNum).subscribe({
        next: (vuelo: Vuelo) => {
          this.flightForm.patchValue({
            numeroVuelo: vuelo.vuelo_num,
            estado: vuelo.estado,
            origen: vuelo.origen,
            destino: vuelo.destino,
            fecha: vuelo.fecha,
            hora: vuelo.hora,
            avion: vuelo.avion_codigo,
            piloto: vuelo.piloto_codigo,
            horaSalidaReal: vuelo.hora_salida_real,
            horaLlegadaReal: vuelo.hora_llegada_real,
            duracion_vuelo: vuelo.duracion_vuelo,
            observaciones: vuelo.observaciones
          });
        },
        error: (err) => console.error('Error al cargar vuelo', err)
      });
    }
  }

  loadAviones() {
    this.avionService.getAviones().subscribe({
      next: (data: Avion[]) => this.aviones = data,
      error: (err) => console.error('Error al cargar aviones', err)
    });
  }

  validateRoute(form: FormGroup) {
    const o = form.get('origen')?.value;
    const d = form.get('destino')?.value;
    return o && d && o === d ? { sameRoute: true } : null;
  }

  save() {
    if (this.flightForm.invalid) {
      this.flightForm.markAllAsTouched();
      return;
    }

    const rawValues = this.flightForm.getRawValue();

    const flightData = {
      estado: rawValues.estado,
      origen: rawValues.origen,
      destino: rawValues.destino,
      avion_codigo: rawValues.avion ? String(rawValues.avion) : null, // ahora es string
      piloto_codigo: rawValues.piloto || null,
      hora_salida_real: rawValues.horaSalidaReal || null, // formato HH:mm
      hora_llegada_real: rawValues.horaLlegadaReal || null,
      observaciones: rawValues.observaciones || null
    };


    console.log('Datos a enviar:', flightData);

    this.vuelosService.updateVuelo(this.vueloNum, flightData).subscribe({
      next: () => this.router.navigate(['/dashboard/vuelos']),
      error: (err) => console.error('Error al actualizar vuelo', err)
    });
  }




  cancel() {
    this.router.navigate(['/dashboard/vuelos']);
  }
}
