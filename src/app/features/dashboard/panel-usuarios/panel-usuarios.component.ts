import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Vuelo} from '../../../core/models/vuelos/vuelo.model';
import {Base} from '../../../core/models/base_avion/base.model';
import {Subject, takeUntil} from 'rxjs';
import {VueloService} from '../../../core/services/vuelo.service';
import {BaseService} from '../../../core/services/base.service';

@Component({
  selector: 'app-panel-usuarios',
  imports: [
    FormsModule,
    NgClass,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './panel-usuarios.component.html',
  styleUrl: './panel-usuarios.component.css'
})
export class PanelUsuariosComponent {

  vuelos: Vuelo[] = [];
  vuelosFiltrados: Vuelo[] = [];
  bases: Base[] = [];

  // Filtros
  filtros = {
    numeroVuelo: '',
    base: '',
    origen: '',
    destino: ''
  };

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 5;
  totalItems = 0;

  // Ordenamiento
  ordenColumna: string = '';
  ordenDireccion: 'asc' | 'desc' = 'asc';

  // Control de filtros expandidos
  filtrosAbiertos = true;

  private destroy$ = new Subject<void>();

  constructor(
    private vueloService: VueloService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDatos(): void {
    // Cargar vuelos
    this.vueloService.refreshVuelos();
    this.vueloService.vuelos$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (vuelos) => {
          this.vuelos = vuelos;
          this.aplicarFiltros();
        },
        error: (err) => console.error('Error al cargar vuelos', err)
      });

    // Cargar bases
    this.baseService.getBases()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (bases) => {
          this.bases = bases.filter(b => b.estado === 'Activo');
        },
        error: (err) => console.error('Error al cargar bases', err)
      });
  }

  aplicarFiltros(): void {
    let resultados = [...this.vuelos];

    // Filtrar por número de vuelo
    if (this.filtros.numeroVuelo) {
      const busqueda = this.filtros.numeroVuelo.toLowerCase();
      resultados = resultados.filter(v =>
        v.vuelo_num.toLowerCase().includes(busqueda)
      );
    }

    // Filtrar por base (origen)
    if (this.filtros.base) {
      resultados = resultados.filter(v =>
        v.origen.toLowerCase().includes(this.filtros.base.toLowerCase())
      );
    }

    // Filtrar por origen
    if (this.filtros.origen) {
      const busqueda = this.filtros.origen.toLowerCase();
      resultados = resultados.filter(v =>
        v.origen.toLowerCase().includes(busqueda)
      );
    }

    // Filtrar por destino
    if (this.filtros.destino) {
      const busqueda = this.filtros.destino.toLowerCase();
      resultados = resultados.filter(v =>
        v.destino.toLowerCase().includes(busqueda)
      );
    }

    this.vuelosFiltrados = resultados;
    this.totalItems = resultados.length;
    this.paginaActual = 1;
  }

  limpiarFiltros(): void {
    this.filtros = {
      numeroVuelo: '',
      base: '',
      origen: '',
      destino: ''
    };
    this.aplicarFiltros();
  }

  ordenarPor(columna: string): void {
    if (this.ordenColumna === columna) {
      this.ordenDireccion = this.ordenDireccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenColumna = columna;
      this.ordenDireccion = 'asc';
    }

    this.vuelosFiltrados.sort((a, b) => {
      let valorA: any;
      let valorB: any;

      switch (columna) {
        case 'vuelo_num':
          valorA = a.vuelo_num;
          valorB = b.vuelo_num;
          break;
        case 'fecha':
          valorA = new Date(a.fecha + ' ' + a.hora);
          valorB = new Date(b.fecha + ' ' + b.hora);
          break;
        case 'hora':
          valorA = a.hora;
          valorB = b.hora;
          break;
        default:
          return 0;
      }

      if (valorA < valorB) {
        return this.ordenDireccion === 'asc' ? -1 : 1;
      }
      if (valorA > valorB) {
        return this.ordenDireccion === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  get vuelosPaginados(): Vuelo[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.vuelosFiltrados.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalItems / this.itemsPorPagina);
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  getEstadoClase(estado?: string): string {
    const estadoLower = estado?.toLowerCase() || '';

    if (estadoLower.includes('hora') || estadoLower.includes('programado')) {
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
    }
    if (estadoLower.includes('embarc')) {
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
    }
    if (estadoLower.includes('retras') || estadoLower.includes('demor')) {
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
    }
    if (estadoLower.includes('cancel')) {
      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
    }
    if (estadoLower.includes('aterr') || estadoLower.includes('complet')) {
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }

    return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
  }

  getEstadoTexto(estado?: string): string {
    return estado || 'Sin estado';
  }

  toggleFiltros(): void {
    this.filtrosAbiertos = !this.filtrosAbiertos;
  }


  protected readonly Math = Math;
}
