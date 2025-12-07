import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-mantenimiento-detalle',
  templateUrl: './mantenimiento-detalle.component.html',
  imports: [RouterModule], 
  styleUrls: ['./mantenimiento-detalle.component.css'] 
})
export class MantenimientoDetalleComponent implements OnInit {

  id!: string;

  mantenimiento = {
    id: 'MNT-00123',
    aeronave: 'LV-FUA (Boeing 737-800)',
    tipo: 'Revisión tipo C',
    estado: 'En Progreso',
    costo: 150000,
    descripcion:
      'Revisión estructural completa del fuselaje y motores. Verificación de sistemas hidráulicos y tren de aterrizaje según manual. Se han detectado y corregido fisuras menores en el ala de estribor. Continúa la inspección de aviónica y sistemas de comunicación.',
    fechaCreacion: '20/09/2024 10:30',
    ultimaActualizacion: '26/10/2024 14:00'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Obtiene el ID desde la ruta: /mantenimiento/123
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    // Más adelante aquí llamarás al servicio:
    // this.mantenimientoService.getById(this.id).subscribe(...)
  }

  irAEditar(): void {
    this.router.navigate([`/dashboard/mantenimiento/edit/${this.id}`]);
  }

  volver(): void {
    this.router.navigate(['/dashboard/mantenimiento']);
  }
}
