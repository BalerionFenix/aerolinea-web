import { Component } from '@angular/core';
import {Avion} from '../../../core/models/base_avion/avion.model';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvionService} from '../../../core/services/avion.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-aviones-management',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './aviones-management.component.html',
  styleUrl: './aviones-management.component.css'
})
export class AvionesManagementComponent {

  aviones: Avion[] = [];
  cargando = false;
  selectedAviones: number[] = [];
  filtroGeneral: string = '';
  filteredAviones: Avion[] = [];
  showFilterDropdown = false;
  filtroTipo: string[] = [];
  filtroFabricante: string[] = [];
  filtroBase = '';
  filtroAnio = '';

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private avionService: AvionService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAviones();
  }

  cargarAviones(): void {
    this.cargando = true;

    this.avionService.getAviones().subscribe({
      next: (data) => {
        this.aviones = data.map(a => new Avion(a));
        this.filteredAviones = [...this.aviones];
        this.updatePagination();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar aviones', err);
        this.cargando = false;
        alert('No se pudieron cargar los aviones. Intenta nuevamente.');
        this.router.navigate(['/dashboard']);
      }
    });
  }



  updatePagination() {
    this.totalPages = Math.ceil(this.filteredAviones.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;
  }

  toggleFiltroTipo(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.filtroTipo.push(value);
    } else {
      this.filtroTipo = this.filtroTipo.filter(v => v !== value);
    }
    this.aplicarFiltros();
  }

  toggleFiltroFabricante(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.filtroFabricante.push(value);
    } else {
      this.filtroFabricante = this.filtroFabricante.filter(v => v !== value);
    }
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const term = this.filtroGeneral.toLowerCase();
    this.filteredAviones = this.aviones.filter(avion => {
      const matchesSearch =
        avion.avion_codigo?.toString().toLowerCase().includes(term) ||
        avion.tipo.toLowerCase().includes(term) ||
        avion.modelo.toLowerCase().includes(term);

      const tipoOk = this.filtroTipo.length === 0 || this.filtroTipo.includes(avion.tipo);
      const fabricanteOk = this.filtroFabricante.length === 0 || this.filtroFabricante.includes(avion.fabricante);

      return matchesSearch && tipoOk && fabricanteOk;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  limpiarFiltros(): void {
    this.filtroGeneral = '';
    this.filtroTipo = [];
    this.filtroFabricante = [];
    this.filteredAviones = [...this.aviones];
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get avionesPaginados(): Avion[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAviones.slice(start, start + this.pageSize);
  }

  editAvion(avion_codigo: number) {
    console.log('Editar avión:', avion_codigo);
    this.router.navigate(['/dashboard/aviones/editar/', avion_codigo]);
  }

  deleteAvion(avion_codigo: number) {
    if (!confirm('¿Estás seguro de eliminar este avión?')) return;

    this.avionService.deleteAvion(avion_codigo).subscribe({
      next: () => {
        this.aviones = this.aviones.filter(a => a.avion_codigo !== avion_codigo);
        this.aplicarFiltros();
      },
      error: (err) => console.error('Error al eliminar avión:', err)
    });
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  protected readonly Math = Math;

}
