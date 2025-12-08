import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { 
  Mantenimiento, 
  MantenimientoInputDTO 
} from '../../core/models/mantenimiento/mantenimiento.models';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private baseUrl = `${environment.apiUrl}/mantenimiento`;

  constructor(private http: HttpClient) {}

  // CREATE
  createMantenimiento(mantenimiento: MantenimientoInputDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, mantenimiento);
  }

  // UPDATE
  updateMantenimiento(id: number, mantenimiento: MantenimientoInputDTO): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/${id}`, mantenimiento);
}

  // GET ALL - Versión simplificada
  getMantenimientos(page: number = 1, limit: number = 10): Observable<Mantenimiento[]> {
  return this.http.get<any>(`${this.baseUrl}?pagina=${page}&limite=${limit}`).pipe(
    map(response => {
      const lista = response?.data?.mantenimientos ?? [];
      return lista.map((item: any) => new Mantenimiento(item));
    }),
    catchError(error => {
      console.error('Error al cargar mantenimientos:', error);
      return of([]);
    })
  );
}


  // GET BY ID
  getMantenimientoById(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Mantenimiento recibido:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al obtener mantenimiento:', error);
        return of(null);
      })
    );
  }

  // DELETE
  deleteMantenimiento(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url).pipe(
      map(response => {
        console.log('Mantenimiento eliminado del servidor:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al eliminar mantenimiento:', error);
        return of(null);
      })
    );
  }
}