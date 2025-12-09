import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoMantenimientoService } from '../../../core/services/tipo-mantenimiento.service';
import {TipoMantenimiento} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {MantenimientoService} from '../../../core/services/mantenimiento.service';
import {Mantenimiento} from '../../../core/models/mantenimiento/mantenimiento.models';

@Component({
  selector: 'app-mantenimiento-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mantenimiento-management.component.html',
  styleUrls: ['./mantenimiento-management.component.css']
})
export class MantenimientoManagementComponent implements OnInit {

  mantenimientos: Mantenimiento[] = [];
  mantenimientosFiltrados: Mantenimiento[] = [];
  tiposMantenimiento: TipoMantenimiento[] = [];

  // Filtros
  busquedaId: string = '';
  filtroEstado: string = 'todos';
  filtroTipo: number | string = 'todos';

  // Paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 8;

  cargando: boolean = true;

  constructor(
    public router: Router,
    private mantenimientoService: MantenimientoService,
    private tipoMantenimientoService: TipoMantenimientoService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar mantenimientos y tipos en paralelo
    Promise.all([
      this.cargarMantenimientos(),
      this.cargarTiposMantenimiento()
    ]).then(() => {
      this.cargando = false;
    });
  }

  cargarMantenimientos(): Promise<void> {
    return new Promise((resolve) => {
      this.mantenimientoService.getAll().subscribe({
        next: (data) => {
          this.mantenimientos = data;
          this.mantenimientosFiltrados = data;
          console.log('Mantenimientos cargados:', data);
          resolve();
        },
        error: (error) => {
          console.error('Error cargando mantenimientos:', error);
          this.mantenimientos = [];
          this.mantenimientosFiltrados = [];
          resolve();
        }
      });
    });
  }

  cargarTiposMantenimiento(): Promise<void> {
    return new Promise((resolve) => {
      this.tipoMantenimientoService.getAll().subscribe({
        next: (data) => {
          this.tiposMantenimiento = data;
          resolve();
        },
        error: (error) => {
          console.error('Error cargando tipos de mantenimiento:', error);
          this.tiposMantenimiento = [];
          resolve();
        }
      });
    });
  }

  aplicarFiltros() {
    this.mantenimientosFiltrados = this.mantenimientos.filter(mant => {
      // Filtro por ID
      const cumpleBusqueda = !this.busquedaId ||
        this.getIdFormateado(mant.id).toLowerCase().includes(this.busquedaId.toLowerCase());

      // Filtro por estado
      const cumpleEstado = this.filtroEstado === 'todos' ||
        mant.estado === this.filtroEstado;

      // Filtro por tipo
      const cumpleTipo = this.filtroTipo === 'todos' ||
        mant.tipoMantenimientoId === Number(this.filtroTipo);

      return cumpleBusqueda && cumpleEstado && cumpleTipo;
    });

    // Resetear a la primera página después de filtrar
    this.paginaActual = 1;
  }

  nuevoMantenimiento() {
    this.router.navigate(['/dashboard/mantenimiento/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/dashboard/mantenimiento/detalle', id]);
  }

  editarMantenimiento(id: number) {
    this.router.navigate(['/dashboard/mantenimiento/editar', id]);
  }

  eliminarMantenimiento(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este mantenimiento?')) {
      this.mantenimientoService.delete(id).subscribe({
        next: () => {
          alert('Mantenimiento eliminado exitosamente');
          this.cargarMantenimientos();
        },
        error: (error) => {
          console.error('Error eliminando mantenimiento:', error);
          alert('No se pudo eliminar el mantenimiento.');
        }
      });
    }
  }

  // Métodos de formato
  getIdFormateado(id: number): string {
    return `MNT-${id.toString().padStart(3, '0')}`;
  }

  getNombreTipo(tipoId: number): string {
    const tipo = this.tiposMantenimiento.find(t => t.id === tipoId);
    return tipo?.nombre || `Tipo ${tipoId}`;
  }

  getEstadoBadgeClass(estado: string): string {
    const estados: { [key: string]: string } = {
      'programado': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'en_proceso': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'completado': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'cancelado': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return estados[estado] || 'bg-gray-100 text-gray-800';
  }

  getEstadoTexto(estado: string): string {
    const textos: { [key: string]: string } = {
      'programado': 'Pendiente',
      'en_proceso': 'En Progreso',
      'completado': 'Completado',
      'cancelado': 'Cancelado'
    };
    return textos[estado] || estado;
  }

  formatearFecha(fecha: Date | string | undefined): string {
    if (!fecha) return 'N/A';
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  formatearCosto(costo: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(costo);
  }

  // Paginación
  get mantenimientosPaginados(): Mantenimiento[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.mantenimientosFiltrados.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.mantenimientosFiltrados.length / this.itemsPorPagina);
  }

  get rangoInicio(): number {
    return this.mantenimientosFiltrados.length === 0 ? 0 : (this.paginaActual - 1) * this.itemsPorPagina + 1;
  }

  get rangoFin(): number {
    const fin = this.paginaActual * this.itemsPorPagina;
    return Math.min(fin, this.mantenimientosFiltrados.length);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  get paginasVisibles(): number[] {
    const paginas: number[] = [];
    const maxPaginas = 5;
    let inicio = Math.max(1, this.paginaActual - Math.floor(maxPaginas / 2));
    let fin = Math.min(this.totalPaginas, inicio + maxPaginas - 1);

    if (fin - inicio < maxPaginas - 1) {
      inicio = Math.max(1, fin - maxPaginas + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }
}
