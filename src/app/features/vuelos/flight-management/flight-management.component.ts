import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VueloService } from '../../../core/services/vuelo.service';
import { Vuelo } from '../../../core/models/vuelos/vuelo.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-flight-management',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, RouterLink, FormsModule],
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css']
})
export class FlightManagementComponent implements OnInit {

  vuelos: Vuelo[] = [];
  vuelosFiltrados: Vuelo[] = [];
  cargando = true;

  // Filtros
  filtroTexto: string = '';
  filtroEstado: string = '';
  filtroFecha: string = '';

  estados: string[] = ['Programado', 'En Ruta', 'A Tiempo', 'Retrasado', 'Cancelado'];

  constructor(
    private vuelosService: VueloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vuelosService.vuelos$.subscribe({
      next: (data) => {
        this.vuelos = data;
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener vuelos', err);
        this.cargando = false;
      }
    });

    this.vuelosService.refreshVuelos();
  }

  aplicarFiltros() {
    this.vuelosFiltrados = this.vuelos.filter(vuelo => {
      const textoValido =
        !this.filtroTexto ||
        vuelo.vuelo_num.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        vuelo.origen.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        vuelo.destino.toLowerCase().includes(this.filtroTexto.toLowerCase());

      const estadoValido =
        !this.filtroEstado || (vuelo.estado && vuelo.estado.toLowerCase() === this.filtroEstado.toLowerCase());

      const fechaValida =
        !this.filtroFecha || vuelo.fecha === this.filtroFecha;

      return textoValido && estadoValido && fechaValida;
    });
  }

  editarVuelo(vuelo: Vuelo) {
    this.router.navigate(['/dashboard/vuelos/editar', vuelo.vuelo_num]);
  }

  eliminarVuelo(vuelo: Vuelo) {
    if (!confirm(`¿Eliminar vuelo ${vuelo.vuelo_num}?`)) return;

    this.vuelosService.deleteVuelo(vuelo.vuelo_num).subscribe({
      next: () => console.log('Vuelo eliminado'),
      error: (err) => console.error('Error al eliminar vuelo', err)
    });
  }
}
