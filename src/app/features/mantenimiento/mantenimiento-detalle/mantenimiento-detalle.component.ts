import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientoService } from '../../../core/services/mantenimiento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mantenimiento-detalle',
  templateUrl: './mantenimiento-detalle.component.html',
  styleUrls: ['./mantenimiento-detalle.component.css'],
  imports: [CommonModule, RouterModule],
})
export class MantenimientoDetalleComponent implements OnInit {

  id!: string;
  loading: boolean = true;
  error: string = '';

  mantenimiento: any = {
    id: '',
    tipo_mantenimiento_id: '',
    tipo: '',
    aeronave: '',
    estado: '',
    fecha_programada: '',
    fecha_inicio: '',
    fecha_fin: '',
    costo_estimado: 0,
    descripcion: '',
    creadoEl: '',
    ultimaActualizacion: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mantenimientoService: MantenimientoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    
    if (this.id) {
      this.cargarMantenimiento();
    } else {
      this.error = 'No se proporcionó un ID de mantenimiento válido';
      this.loading = false;
    }
  }

  cargarMantenimiento(): void {
    this.loading = true;
    const idNumber = parseInt(this.id, 10);

    this.mantenimientoService.getMantenimientoById(idNumber).subscribe({
      next: (response) => {
        if (response && response.data) {
          const data = response.data;
          this.mantenimiento = {
            id: data.id,
            tipo_mantenimiento_id: data.tipo_mantenimiento?.id ?? '',
            tipo: data.tipo_mantenimiento?.nombre ?? 'No especificado',
            aeronave: data.aeronave?.matricula ?? 'Sin información',
            estado: data.estado ?? 'Desconocido',
            fecha_programada: data.fecha_programada ?? '',
            fecha_inicio: data.fecha_inicio ?? '',
            fecha_fin: data.fecha_fin ?? '',
            costo_estimado: data.costo_estimado ?? 0,
            descripcion: data.descripcion ?? 'Sin descripción',
            // Cambios importantes
            creadoEl: this.formatearFecha(data.fecha_programada),
            ultimaActualizacion: this.formatearFecha(data.fecha_fin)
          };
        } else {
          this.error = 'No se encontró información para este mantenimiento';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mantenimiento:', err);
        this.error = 'Error al cargar los datos del mantenimiento';
        this.loading = false;
      }
    });
  }

  formatearFecha(fecha: string | Date | undefined): string {
    if (!fecha) return 'No disponible';
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return fecha.toString();
    }
  }

  formatearCosto(costo: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(costo);
  }

  irAEditar(): void {
    this.router.navigate([`/dashboard/mantenimiento/edit/${this.id}`]);
  }

  volver(): void {
    this.router.navigate(['/dashboard/mantenimiento']);
  }

  recargar(): void {
    this.cargarMantenimiento();
  }
}
