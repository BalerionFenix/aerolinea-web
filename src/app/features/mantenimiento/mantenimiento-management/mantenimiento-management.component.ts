import { Component } from '@angular/core';
import { NgForOf, NgClass, DatePipe, CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Mantenimiento } from '../../../core/models/mantenimiento/mantenimiento.models';
import { MantenimientoService } from '../../../core/services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-management',
  standalone: true,
  imports: [CommonModule, NgForOf, NgClass, DatePipe, NgIf],
  templateUrl: './mantenimiento-management.component.html',
  styleUrls: ['./mantenimiento-management.component.css']
})
export class DetalleTipoMantenimientoComponent {

  constructor(
    public router: Router,
    private mantenimientoService: MantenimientoService
  ) {}

  /** Lista real desde el backend */
  mantenimientos: Mantenimiento[] = [];

  /** Mock para cuando no haya datos */
  mantenimientosMock = [
    {
      id: 1,
      tipo_mantenimiento_id: 101,
      fecha: '2025-01-10',
      estado: 'programado'
    },
    {
      id: 2,
      tipo_mantenimiento_id: 205,
      fecha: '2025-01-15',
      estado: 'completado'
    },
    {
      id: 3,
      tipo_mantenimiento_id: 300,
      fecha: '2025-02-20',
      estado: 'en_proceso'
    }
  ];

  ngOnInit() {
    this.cargarMantenimientos();
  }

  cargarMantenimientos() {
    this.mantenimientoService.getMantenimientos().subscribe(
      data => {
        this.mantenimientos = data;
        console.log("Mantenimientos cargados:", data);
      },
      error => {
        console.error("Error cargando mantenimientos:", error);
      }
    );
  }

  verDetalle(id: number) {
    this.router.navigate(['/dashboard/mantenimiento/detalle', id]);
  }

  editar(id: number) {
    this.router.navigate(['/dashboard/mantenimiento/editar', id]);
  }

  crearNuevo() {
    this.router.navigate(['/dashboard/mantenimiento/crear']);
  }

  // Datos de prueba para la tarjeta superior
  tipoMantenimiento = {
    id: 'MT-001',
    nombre: 'Inspección de Motor tipo A',
    estado: 'Activo',
    frecuencia: 'Cada 500 horas de vuelo',
    descripcion:
      'Revisión completa de los componentes principales del motor, incluyendo turbinas y sistema de combustible.',
    duracion: '8 horas',
    creadoEl: '2023-10-26 10:00:00',
    ultimaActualizacion: '2023-10-27 14:30:00',
  };
}
