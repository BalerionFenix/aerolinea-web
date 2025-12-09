import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Tripulacion } from '../../core/models/Personal/tripulacion.model';
import { Router } from '@angular/router';
import { TripulacionService } from '../../core/services/tripulacion.service';

@Component({
  selector: 'app-tripulacion',
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './tripulacion.component.html',
  styleUrl: './tripulacion.component.css'
})
export class TripulacionComponent implements OnInit {
  tripulacion: Tripulacion[] = [];
  isLoading: boolean = true;

  constructor(
    public router: Router,
    private tripulacionService: TripulacionService
  ) {}

  ngOnInit(): void {
    this.loadTripulacion();
  }

  loadTripulacion(): void {
    this.isLoading = true;
    this.tripulacion = [];

    this.tripulacionService.getTripulacion().subscribe({
      next: (data) => {
        this.tripulacion = data || [];
        this.isLoading = false;
        console.log('Tripulación cargada:', this.tripulacion);
      },
      error: (error) => {
        console.error('Error al cargar la tripulación:', error);
        this.tripulacion = [];
        this.isLoading = false;
        alert('Error al cargar la tripulación. Por favor, intente nuevamente.');
      }
    });
  }

  editMember(miembro: Tripulacion): void {
    if (miembro?.miembro_codigo) {
      this.router.navigate(['/dashboard/tripulacion/editar', miembro.miembro_codigo]);
    }
  }

  deleteMember(miembro: Tripulacion): void {
    if (!miembro?.miembro_codigo) {
      console.error('Miembro sin código válido');
      return;
    }

    if (confirm(`¿Está seguro de eliminar a ${miembro.nombre}?`)) {
      this.tripulacionService.deleteMiembro(miembro.miembro_codigo).subscribe({
        next: (response) => {
          console.log('Miembro eliminado exitosamente');
          // Recargar la lista sin refrescar toda la página
          this.loadTripulacion();
        },
        error: (error) => {
          console.error('Error al eliminar miembro:', error);
          alert('Error al eliminar el miembro. Por favor, intente nuevamente.');
        }
      });
    }
  }
}
