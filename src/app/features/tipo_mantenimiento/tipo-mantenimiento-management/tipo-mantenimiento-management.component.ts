import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TipoMantenimiento} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {Router} from '@angular/router';
import {TipoMantenimientoService} from '../../../core/services/tipo-mantenimiento.service';

@Component({
  selector: 'app-tipo-mantenimiento-management',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './tipo-mantenimiento-management.component.html',
  styleUrl: './tipo-mantenimiento-management.component.css'
})
export class TipoMantenimientoManagementComponent {
  tiposMantenimiento: TipoMantenimiento[] = [];
  tiposMantenimientoFiltrados: TipoMantenimiento[] = [];
  searchTerm: string = '';
  estadoFiltro: string = 'todos';
  mostrarMenuEstado: boolean = false;

  constructor(
    public router: Router,
    private tipoMantenimientoService: TipoMantenimientoService
  ) {}

  ngOnInit() {
    this.cargarTiposMantenimiento();
  }

  cargarTiposMantenimiento() {
    this.tipoMantenimientoService.getAll().subscribe({
      next: (data) => {
        this.tiposMantenimiento = data;
        this.tiposMantenimientoFiltrados = data;
        console.log('Tipos de mantenimiento cargados:', data);
      },
      error: (error) => {
        console.error('Error cargando tipos de mantenimiento:', error);
        this.tiposMantenimiento = [];
        this.tiposMantenimientoFiltrados = [];
      }
    });
  }

  buscar() {
    this.aplicarFiltros();
  }

  filtrarPorEstado(estado: string) {
    this.estadoFiltro = estado;
    this.mostrarMenuEstado = false;
    this.aplicarFiltros();
  }

  toggleMenuEstado() {
    this.mostrarMenuEstado = !this.mostrarMenuEstado;
  }

  aplicarFiltros() {
    this.tiposMantenimientoFiltrados = this.tiposMantenimiento.filter(tipo => {
      const cumpleBusqueda = tipo.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());

      let cumpleEstado = true;
      if (this.estadoFiltro === 'activo') {
        cumpleEstado = tipo.estado === true;
      } else if (this.estadoFiltro === 'inactivo') {
        cumpleEstado = tipo.estado === false;
      }

      return cumpleBusqueda && cumpleEstado;
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/dashboard/tipo_mantenimiento/detalle', id]);
  }

  crearNuevo() {
    this.router.navigate(['/dashboard/tipo_mantenimiento/create']);
  }

  getEstadoBadgeClass(estado: boolean): string {
    return estado
      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300';
  }

  getEstadoTexto(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  getFrecuenciaTexto(frecuencia: number): string {
    if (frecuencia < 24) {
      return `Cada ${frecuencia} horas`;
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

  getEstadoFiltroTexto(): string {
    switch(this.estadoFiltro) {
      case 'activo': return 'Estado: Activo';
      case 'inactivo': return 'Estado: Inactivo';
      default: return 'Estado: Todos';
    }
  }

}
