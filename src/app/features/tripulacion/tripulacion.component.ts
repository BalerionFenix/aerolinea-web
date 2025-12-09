<<<<<<< Updated upstream
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
=======
import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Tripulacion } from '../../core/models/Personal/tripulacion.model';
import { Router, RouterLink } from '@angular/router';
import { TripulacionService } from '../../core/services/tripulacion.service';

@Component({
  selector: 'app-tripulacion',
  imports: [NgClass, NgForOf, NgIf, RouterLink],
>>>>>>> Stashed changes
  templateUrl: './tripulacion.component.html',
  styleUrl: './tripulacion.component.css'
})
<<<<<<< Updated upstream
export class TripulacionComponent {
  tripulacion: MiembroTripulacion[] = [
    { id: 'EMP-001', nombre: 'Juan Pérez', rol: 'Capitán', base: 'MAD - Madrid Barajas', telefono: '+34 600 123 456', estado: 'Activo' },
    { id: 'EMP-002', nombre: 'Ana García', rol: 'Primer Oficial', base: 'BCN - Barcelona El Prat', telefono: '+34 600 234 567', estado: 'Activo' },
    { id: 'EMP-003', nombre: 'Carlos Rodríguez', rol: 'Jefe de Cabina', base: 'MAD - Madrid Barajas', telefono: '+34 600 345 678', estado: 'Inactivo' },
    { id: 'EMP-004', nombre: 'Lucía Martínez', rol: 'TCP', base: 'LIS - Lisboa', telefono: '+351 912 345 678', estado: 'Activo' },
    { id: 'EMP-005', nombre: 'Miguel Sánchez', rol: 'TCP', base: 'BCN - Barcelona El Prat', telefono: '+34 600 456 789', estado: 'En espera' },
  ];


}
=======
export class TripulacionComponent implements OnInit {
  tripulacion: Tripulacion[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private tripulacionService: TripulacionService
  ) {}

  ngOnInit() {
    this.loadTripulacion();
  }

  loadTripulacion() {
    this.isLoading = true;
    this.tripulacion = []; // Limpiar el array antes de cargar
    
    this.tripulacionService.getTripulacion().subscribe({
      next: (data) => {
        this.tripulacion = data;
        this.isLoading = false;
        console.log('Tripulación cargada:', this.tripulacion);
      },
      error: (error) => {
        console.error('Error al cargar la tripulación:', error);
        this.tripulacion = []; // Asegurar array vacío en caso de error
        this.isLoading = false;
      }
    });
  }

  editMember(miembro: Tripulacion) {
    this.router.navigate(['/dashboard/tripulacion/editar', miembro.miembro_codigo]);
  }

  deleteMember(miembro: Tripulacion) {
    if (confirm(`¿Está seguro de eliminar a ${miembro.nombre}?`)) {
      this.tripulacionService.deleteMiembro(miembro.miembro_codigo).subscribe({
        next: (response) => {
          if (response) {
            console.log('Miembro eliminado exitosamente');
            // Recargar la lista después de eliminar
            this.loadTripulacion();
            window.location.reload();
          }
        },
        error: (error) => {
          console.error('Error al eliminar miembro:', error);
          alert('Error al eliminar el miembro');
        }
      });
    }
  }
}
>>>>>>> Stashed changes
