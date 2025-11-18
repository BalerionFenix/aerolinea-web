import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Avion, AvionInputDTO} from '../models/base_avion/avion.model';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  private baseUrl = 'http://192.168.0.6:4000/api/avion';

  constructor(private http: HttpClient) { }

  createAvion(avion: AvionInputDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, avion);
  }

  updateAvion(avion: AvionInputDTO, avion_codigo: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${avion_codigo}`, avion);
  }

  getAviones(): Observable<Avion[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(response => {
        const avionesMapeados = response.map(item => new Avion(item));
        console.log('Aviones recibidos:', avionesMapeados);
        return avionesMapeados;
      }),
      catchError(error => {
        console.error('Error al cargar los aviones', error);
        return of([]);
      })
    );
  }

  getAvionById(avion_codigo: number): Observable<Avion | null> {
    const url = `${this.baseUrl}/${avion_codigo}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Avión recibido:', response);
        return new Avion(response);
      }),
      catchError(error => {
        console.error('Error al obtener avión:', error);
        return of(null);
      })
    );
  }

  deleteAvion(avion_codigo: number): Observable<any> {
    const url = `${this.baseUrl}/${avion_codigo}`;
    return this.http.delete(url).pipe(
      map(response => {
        console.log('Avión eliminado del servidor:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al eliminar avión', error);
        return of(null);
      })
    );
  }


}
