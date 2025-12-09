import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {Mantenimiento} from '../../../core/models/mantenimiento/mantenimiento.models';
import {TipoMantenimiento} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {Avion} from '../../../core/models/base_avion/avion.model';
import {MantenimientoService} from '../../../core/services/mantenimiento.service';
import {TipoMantenimientoService} from '../../../core/services/tipo-mantenimiento.service';
import {AvionService} from '../../../core/services/avion.service';


@Component({
  selector: 'app-mantenimiento-detalle',
  templateUrl: './mantenimiento-detalle.component.html',
  imports: [RouterModule, NgIf, NgClass],
  styleUrls: ['./mantenimiento-detalle.component.css']
})
export class MantenimientoDetalleComponent implements OnInit {
  mantenimiento: Mantenimiento | null = null;
  tipoMantenimiento: TipoMantenimiento | null = null;
  avion: Avion | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mantenimientoService: MantenimientoService,
    private tipoMantenimientoService: TipoMantenimientoService,
    private avionService: AvionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMantenimiento(Number(id));
    } else {
      this.error = 'ID de mantenimiento no proporcionado';
      this.loading = false;
    }
  }

  loadMantenimiento(id: number): void {
    this.loading = true;
    this.error = null;

    this.mantenimientoService.getById(id).subscribe({
      next: (mantenimiento) => {
        this.mantenimiento = mantenimiento;
        console.log('Mantenimiento cargado:', mantenimiento);

        // Cargar tipo de mantenimiento
        this.loadTipoMantenimiento(mantenimiento.tipoMantenimientoId);

        // Cargar avión
        this.loadAvion(mantenimiento.avion_codigo);

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar mantenimiento:', error);
        this.error = 'Error al cargar los detalles del mantenimiento';
        this.loading = false;
      }
    });
  }

  loadTipoMantenimiento(id: number): void {
    this.tipoMantenimientoService.getById(id).subscribe({
      next: (tipo) => {
        this.tipoMantenimiento = tipo;
        console.log('Tipo de mantenimiento cargado:', tipo);
      },
      error: (error) => {
        console.error('Error al cargar tipo de mantenimiento:', error);
      }
    });
  }

  loadAvion(codigo: number): void {
    this.avionService.getAvionById(codigo).subscribe({
      next: (avion) => {
        this.avion = avion;
        console.log('Avión cargado:', avion);
      },
      error: (error) => {
        console.error('Error al cargar avión:', error);
      }
    });
  }

  onEdit(): void {
    if (this.mantenimiento) {
      this.router.navigate(['/dashboard/mantenimiento/edit', this.mantenimiento.id]);
    }
  }

  onDelete(): void {
    if (!this.mantenimiento) return;

    if (confirm('¿Está seguro de eliminar este registro de mantenimiento?')) {
      this.mantenimientoService.delete(this.mantenimiento.id).subscribe({
        next: () => {
          console.log('Mantenimiento eliminado exitosamente');
          this.router.navigate(['/dashboard/mantenimiento']);
        },
        error: (error) => {
          console.error('Error al eliminar mantenimiento:', error);
          this.error = 'Error al eliminar el mantenimiento';
        }
      });
    }
  }

  getEstadoBadgeClass(): string {
    if (!this.mantenimiento) return '';

    switch (this.mantenimiento.estado) {
      case 'programado':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_proceso':
        return 'bg-orange-100 text-orange-700';
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getEstadoLabel(): string {
    if (!this.mantenimiento) return '';

    switch (this.mantenimiento.estado) {
      case 'programado':
        return 'Programado';
      case 'en_proceso':
        return 'En Progreso';
      case 'completado':
        return 'Completado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return this.mantenimiento.estado;
    }
  }

  formatDate(date: Date | null | undefined): string {
    if (!date) return 'N/A';

    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatDateTime(date: Date | undefined): string {
    if (!date) return 'N/A';

    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) return 'N/A';

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getAvionDisplayName(): string {
    if (!this.avion) return 'Cargando...';
    return `${this.avion.tipo} ${this.avion.modelo} (${this.avion.fabricante})`;
  }
}
