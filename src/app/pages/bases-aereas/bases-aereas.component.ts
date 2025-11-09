import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-bases-aereas',
  imports: [
    FormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './bases-aereas.component.html',
  styleUrl: './bases-aereas.component.css'
})
export class BasesAereasComponent {

  bases = [
    {
      nombre: 'Aeropuerto Adolfo Suárez Madrid-Barajas',
      codigoIATA: 'MAD',
      codigoICAO: 'LEMD',
      ciudad: 'Madrid',
      pais: 'España',
      estado: 'Activo',
      activo: true
    },
    {
      nombre: 'Aeropuerto de Barcelona-El Prat',
      codigoIATA: 'BCN',
      codigoICAO: 'LEBL',
      ciudad: 'Barcelona',
      pais: 'España',
      estado: 'Activo',
      activo: true
    },
    {
      nombre: 'Aeropuerto de Palma de Mallorca',
      codigoIATA: 'PMI',
      codigoICAO: 'LEPA',
      ciudad: 'Palma',
      pais: 'España',
      estado: 'Inactivo',
      activo: false
    }
  ];

  baseSeleccionada = { ...this.bases[0] };

  seleccionarBase(base: any) {
    this.baseSeleccionada = { ...base };
  }

  guardarCambios() {
    console.log('Cambios guardados:', this.baseSeleccionada);
  }

  cancelarEdicion() {
    console.log('Edición cancelada');
  }



}
