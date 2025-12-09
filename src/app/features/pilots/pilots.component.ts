import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Piloto } from '../../core/models/Personal/piloto.model';
import { PilotoService } from '../../core/services/piloto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pilots',
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.css'
})
export class PilotsComponent implements OnInit, OnDestroy {
  pilotos: Piloto[] = [];
  isLoading: boolean = true;
  private subscription?: Subscription;

  constructor(
    public router: Router,
    private pilotoService: PilotoService
  ) {}

  ngOnInit(): void {
    this.loadPilotos();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPilotos(): void {
    this.isLoading = true;
    this.pilotos = [];

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.pilotoService.getPilotos().subscribe({
      next: (data) => {
        this.pilotos = data || [];
        this.isLoading = false;
        console.log('Pilotos cargados:', this.pilotos);
      },
      error: (error) => {
        console.error('Error al cargar los pilotos:', error);
        this.pilotos = [];
        this.isLoading = false;
        alert('Error al cargar los pilotos. Por favor, intente nuevamente.');
      }
    });
  }

  addPilot(): void {
    this.router.navigate(['/dashboard/pilotos/crear']);
  }

  editPilot(piloto: Piloto): void {
    if (piloto?.piloto_codigo) {
      this.router.navigate(['/dashboard/pilotos/editar', piloto.piloto_codigo]);
    }
  }

  deletePilot(piloto: Piloto): void {
    if (!piloto?.piloto_codigo) {
      console.error('Piloto sin código válido');
      return;
    }

    if (confirm(`¿Está seguro de eliminar al piloto ${piloto.nombre}?`)) {
      this.pilotoService.deletePiloto(piloto.piloto_codigo).subscribe({
        next: (response) => {
          console.log('Piloto eliminado exitosamente');
          this.loadPilotos();
        },
        error: (error) => {
          console.error('Error al eliminar piloto:', error);
          alert('Error al eliminar el piloto. Por favor, intente nuevamente.');
        }
      });
    }
  }

  getPilotosActivos(): number {
    return this.pilotos.filter(p => p.activo).length;
  }
}
