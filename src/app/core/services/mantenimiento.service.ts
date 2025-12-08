import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Mantenimiento, MantenimientoInputDTO as MantenimientoInputModel } from '../../core/models/mantenimiento/mantenimiento.models';

// DTO del backend
export interface MantenimientoDTO {
  id: number;
  tipo_mantenimiento_id: number;
  fecha_programada: string;
  estado: 'programado' | 'en_proceso' | 'completado' | 'cancelado';
  costo_estimado?: number;
  costo_real?: number;
  descripcion?: string;
  personal_asignado?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Entrada para crear o actualizar (usando el DTO del modelo)
export type MantenimientoInputDTO = MantenimientoInputModel;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private baseUrl = `${environment.apiUrl}/mantenimiento`;

  constructor(private http: HttpClient) {}

  // CREATE
  createMantenimiento(data: MantenimientoInputDTO): Observable<Mantenimiento | null> {
    const payload = {
      ...data,
      fecha_programada: data.fecha_programada instanceof Date
        ? data.fecha_programada.toISOString().split('T')[0]
        : data.fecha_programada
    };

    return this.http.post<ApiResponse<MantenimientoDTO>>(this.baseUrl, payload).pipe(
      map(response => new Mantenimiento(response.data)),
      catchError(error => {
        console.error('Error al crear mantenimiento', error);
        return of(null);
      })
    );
  }

  // UPDATE
  updateMantenimiento(data: MantenimientoInputDTO, id: number): Observable<Mantenimiento | null> {
    const payload = {
      ...data,
      fecha_programada: data.fecha_programada instanceof Date
        ? data.fecha_programada.toISOString().split('T')[0]
        : data.fecha_programada
    };

    return this.http.put<ApiResponse<MantenimientoDTO>>(`${this.baseUrl}/${id}`, payload).pipe(
      map(response => new Mantenimiento(response.data)),
      catchError(error => {
        console.error('Error al actualizar mantenimiento', error);
        return of(null);
      })
    );
  }

  // GET ALL
  getMantenimientos(): Observable<Mantenimiento[]> {
    return this.http.get<ApiResponse<MantenimientoDTO[]>>(this.baseUrl).pipe(
      map(response => response.data.map(item => new Mantenimiento(item))),
      catchError(error => {
        console.error('Error al cargar mantenimientos', error);
        return of([]);
      })
    );
  }

  // GET BY ID
  getMantenimientoById(id: number): Observable<Mantenimiento | null> {
    return this.http.get<ApiResponse<MantenimientoDTO>>(`${this.baseUrl}/${id}`).pipe(
      map(response => new Mantenimiento(response.data)),
      catchError(error => {
        console.error('Error al obtener mantenimiento:', error);
        return of(null);
      })
    );
  }

  // DELETE
  deleteMantenimiento(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Error al eliminar mantenimiento', error);
        return of(false);
      })
    );
  }
}
