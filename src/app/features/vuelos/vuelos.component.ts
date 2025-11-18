import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';


interface Vuelo {
  id: string;
  ruta: string;
  fechaSalida: string;
  avion: string;
  piloto: string;
  estado: 'Programado' | 'En Ruta' | 'A Tiempo' | 'Retrasado' | 'Cancelado';
}

@Component({
  selector: 'app-vuelos',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './vuelos.component.html',
  styleUrl: './vuelos.component.css'
})
export class VuelosComponent {

  vuelos: Vuelo[] = [
    {
      id: 'IB345',
      ruta: 'Madrid (MAD) → Barcelona (BCN)',
      fechaSalida: '2024-10-28 08:30',
      avion: 'Airbus A320',
      piloto: 'Carlos Ruiz',
      estado: 'Programado'
    },
    {
      id: 'VY211',
      ruta: 'Sevilla (SVQ) → París (CDG)',
      fechaSalida: '2024-10-28 09:15',
      avion: 'Boeing 737',
      piloto: 'Laura Gómez',
      estado: 'En Ruta'
    },
    {
      id: 'AF113',
      ruta: 'Valencia (VLC) → Roma (FCO)',
      fechaSalida: '2024-10-28 10:00',
      avion: 'Airbus A321',
      piloto: 'Javier Fernández',
      estado: 'A Tiempo'
    },
    {
      id: 'LH180',
      ruta: 'Málaga (AGP) → Frankfurt (FRA)',
      fechaSalida: '2024-10-28 11:45',
      avion: 'Boeing 737',
      piloto: 'Ana Torres',
      estado: 'Retrasado'
    },
    {
      id: 'BA467',
      ruta: 'Bilbao (BIO) → Londres (LHR)',
      fechaSalida: '2024-10-28 12:05',
      avion: 'Airbus A319',
      piloto: 'Miguel Santos',
      estado: 'Cancelado'
    }
  ];

}
