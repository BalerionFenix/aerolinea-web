import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Base} from '../../../core/models/base_avion/base.model';
import {BaseService} from '../../../core/services/base.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-bases-aereas',
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './bases-aereas.component.html',
  styleUrl: './bases-aereas.component.css'
})
export class BasesAereasComponent {

  bases: Base[] = [];
  basesFiltradas: Base[] = [];

  filtroGeneral: string = '';
  filtroPais: string = '';
  filtroCiudad: string = '';
  filtroEstado: string = '';

  baseSeleccionada: Base | null = null;

  constructor(private baseService: BaseService, private router: Router) {}

  ngOnInit(): void {
    this.cargarBases();
  }

  cargarBases(): void {
    this.baseService.getBases().subscribe({
      next: (data) => {
        this.bases = data;
        this.basesFiltradas = [...this.bases];
      },
      error: (err) => console.error('Error cargando bases:', err)
    });
  }

  filtrarBases(): void {
    const texto = this.filtroGeneral.toLowerCase().trim();
    const pais = this.filtroPais.toLowerCase().trim();
    const ciudad = this.filtroCiudad.toLowerCase().trim();
    const estadoFiltro = this.filtroEstado; // "Activo", "Inactivo" o ""

    this.basesFiltradas = this.bases.filter(b => {
      const matchesTexto =
        b.nombre.toLowerCase().includes(texto) ||
        b.ciudad.toLowerCase().includes(texto) ||
        b.pais.toLowerCase().includes(texto) ||
        b.estado.toLowerCase().includes(texto);

      const matchesPais = !pais || b.pais.toLowerCase().includes(pais);
      const matchesCiudad = !ciudad || b.ciudad.toLowerCase().includes(ciudad);
      const matchesEstado = !estadoFiltro || b.estado === estadoFiltro;

      return matchesTexto && matchesPais && matchesCiudad && matchesEstado;
    });
  }

  seleccionarBase(base: Base): void {
    this.baseSeleccionada = { ...base };
  }

  editarBase(): void {
    if (!this.baseSeleccionada) return;
    this.router.navigate(['/dashboard/bases-aereas/editar', this.baseSeleccionada.base_codigo]);
  }

  eliminarBase(base: Base) {
    if (!base) return;

    this.baseService.deleteBase(base.base_codigo).subscribe(() => {
      this.bases = this.bases.filter(b => b.base_codigo !== base.base_codigo);
      this.filtrarBases();
      this.baseSeleccionada = this.bases.length > 0 ? { ...this.bases[0] } : null;
    });
  }
}
