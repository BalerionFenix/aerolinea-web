import { Component } from '@angular/core';
import {TipoMantenimiento} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {Mantenimiento} from '../../../core/models/mantenimiento/mantenimiento.models';
import {ActivatedRoute, Router} from '@angular/router';
import {TipoMantenimientoService} from '../../../core/services/tipo-mantenimiento.service';
import {MantenimientoService} from '../../../core/services/mantenimiento.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-tipo-mantenimiento-detalle',
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './tipo-mantenimiento-detalle.component.html',
  styleUrl: './tipo-mantenimiento-detalle.component.css'
})
export class TipoMantenimientoDetalleComponent {

  tipoMantenimientoId: number = 0;
  tipoMantenimiento: TipoMantenimiento | null = null;
  mantenimientos: Mantenimiento[] = [];
  cargando: boolean = true;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private tipoMantenimientoService: TipoMantenimientoService,
    private mantenimientoService: MantenimientoService
  ) {}

  ngOnInit() {
    this.tipoMantenimientoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.tipoMantenimientoId) {
      this.cargarTipoMantenimiento();
      this.cargarMantenimientos();
    } else {
      this.router.navigate(['/dashboard/tipo_mantenimiento']);
    }
  }

  cargarTipoMantenimiento(): void {
    this.tipoMantenimientoService.getById(this.tipoMantenimientoId).subscribe({
      next: (tipo) => {
        this.tipoMantenimiento = tipo;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error cargando tipo de mantenimiento:', error);
        alert('No se pudo cargar el tipo de mantenimiento.');
        this.router.navigate(['/dashboard/tipo_mantenimiento']);
      }
    });
  }

  cargarMantenimientos(): void {
    this.mantenimientoService.getAll().subscribe({
      next: (data) => {
        // Filtrar mantenimientos que coincidan con este tipo
        this.mantenimientos = data.filter(
          m => m.tipoMantenimientoId === this.tipoMantenimientoId
        );
      },
      error: (error) => {
        console.error('Error cargando mantenimientos:', error);
        this.mantenimientos = [];
      }
    });
  }

  editar(): void {
    this.router.navigate(['/dashboard/tipo_mantenimiento/editar', this.tipoMantenimientoId]);
  }

  eliminar(): void {
    if (confirm('¿Está seguro de que desea eliminar este tipo de mantenimiento?')) {
      this.tipoMantenimientoService.delete(this.tipoMantenimientoId).subscribe({
        next: () => {
          alert('Tipo de mantenimiento eliminado exitosamente');
          this.router.navigate(['/dashboard/tipo_mantenimiento']);
        },
        error: (error) => {
          console.error('Error eliminando tipo de mantenimiento:', error);
          alert('No se pudo eliminar el tipo de mantenimiento.');
        }
      });
    }
  }

  verDetalleMantenimiento(id: number): void {
    this.router.navigate(['/dashboard/tipo_mantenimiento/detalle', id]);
  }

  volver(): void {
    this.router.navigate(['/dashboard/tipo_mantenimiento']);
  }

  getEstadoBadgeClass(estado: boolean): string {
    return estado
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }

  getEstadoTexto(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  getEstadoMantenimientoBadgeClass(estado: string): string {
    const estados: { [key: string]: string } = {
      'programado': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'en_proceso': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'completado': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'cancelado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return estados[estado] || 'bg-gray-100 text-gray-800';
  }

  getEstadoMantenimientoTexto(estado: string): string {
    const textos: { [key: string]: string } = {
      'programado': 'Programado',
      'en_proceso': 'En Proceso',
      'completado': 'Completado',
      'cancelado': 'Cancelado'
    };
    return textos[estado] || estado;
  }

  getFrecuenciaTexto(frecuencia: number): string {
    if (frecuencia < 24) {
      return `Cada ${frecuencia} horas de vuelo`;
    } else if (frecuencia < 168) {
      const dias = Math.round(frecuencia / 24);
      return `Cada ${dias} días`;
    } else if (frecuencia < 730) {
      const semanas = Math.round(frecuencia / 168);
      return `Cada ${semanas} semanas`;
    } else if (frecuencia < 8760) {
      const meses = Math.round(frecuencia / 730);
      return `Cada ${meses} meses`;
    } else {
      const años = Math.round(frecuencia / 8760);
      return `Cada ${años} años`;
    }
  }

  formatearFecha(fecha: Date | string | undefined): string {
    if (!fecha) return 'N/A';
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearFechaCorta(fecha: Date | string | undefined): string {
    if (!fecha) return 'N/A';
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  getIdFormateado(id: number): string {
    return `MT-${id.toString().padStart(3, '0')}`;
  }

  getMantenimientoIdFormateado(id: number): string {
    return `M-${id.toString().padStart(4, '0')}`;
  }

}
