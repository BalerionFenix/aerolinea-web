import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Tripulacion } from '../models/Personal/tripulacion.model';

@Injectable({
  providedIn: 'root'
})
export class TripulacionService {

  private baseUrl = 'https://aerolinea-backend-1l6r.onrender.com/api/miembro';

  constructor(private http: HttpClient) {}

  getTripulacion(): Observable<Tripulacion[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(response => {
        const tripulacionMapeada = response.map(item => new Tripulacion(item));
        console.log('Tripulación recibida:', tripulacionMapeada);
        return tripulacionMapeada;
      }),
      catchError(error => {
        console.error('Error al cargar la tripulación', error);
        return of([]);
      })
    );
  }

  getMiembroById(id: number): Observable<Tripulacion | null> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        console.log('Miembro de tripulación recibido:', response);
        return new Tripulacion(response);
      }),
      catchError(error => {
        console.error('Error al obtener miembro de la tripulación', error);
        return of(null);
      })
    );
  }

  createMiembro(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map(response => {
        console.log('Miembro de tripulación creado:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al crear miembro de la tripulación', error);
        return of(null);
      })
    );
  }

  updateMiembro(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      map(response => {
        console.log('Miembro de tripulación actualizado:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al actualizar miembro de la tripulación', error);
        return of(null);
      })
    );
  }

  deleteMiembro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        console.log('Miembro de tripulación eliminado:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al eliminar miembro de la tripulación', error);
        return of(null);
      })
    );
  }

  getBases(): Observable<any[]> {
    const url = `${this.baseUrl}/bases`;
    return this.http.get<any[]>(url).pipe(
      map(response => {
        console.log('Bases recibidas:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al cargar bases', error);
        return of([]);
      })
    );
  }
}
