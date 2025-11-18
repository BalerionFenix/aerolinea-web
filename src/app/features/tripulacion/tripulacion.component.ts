import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';


interface MiembroTripulacion {
  id: string;
  nombre: string;
  rol: string;
  base: string;
  telefono: string;
  estado: 'Activo' | 'Inactivo' | 'En espera';
}

@Component({
  selector: 'app-tripulacion',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './tripulacion.component.html',
  styleUrl: './tripulacion.component.css'
})
export class TripulacionComponent {
  tripulacion: MiembroTripulacion[] = [
    { id: 'EMP-001', nombre: 'Juan Pérez', rol: 'Capitán', base: 'MAD - Madrid Barajas', telefono: '+34 600 123 456', estado: 'Activo' },
    { id: 'EMP-002', nombre: 'Ana García', rol: 'Primer Oficial', base: 'BCN - Barcelona El Prat', telefono: '+34 600 234 567', estado: 'Activo' },
    { id: 'EMP-003', nombre: 'Carlos Rodríguez', rol: 'Jefe de Cabina', base: 'MAD - Madrid Barajas', telefono: '+34 600 345 678', estado: 'Inactivo' },
    { id: 'EMP-004', nombre: 'Lucía Martínez', rol: 'TCP', base: 'LIS - Lisboa', telefono: '+351 912 345 678', estado: 'Activo' },
    { id: 'EMP-005', nombre: 'Miguel Sánchez', rol: 'TCP', base: 'BCN - Barcelona El Prat', telefono: '+34 600 456 789', estado: 'En espera' },
  ];


}
