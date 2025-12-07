import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

// DTO de Angular que refleja exactamente el DTO del backend
export interface TipoMantenimientoDTO {
  id: number;
  nombre: string;
  descripcion?: string;
  duracion_estimada: number;
  frecuencia: number;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string;
  mantenimientos?: {
    id: number;
    aeronave_id: number;
    fecha_programada: string;
    estado: boolean;
  }[];
}

// Entrada para crear o actualizar
export interface TipoMantenimientoInputDTO {
  nombre: string;
  descripcion?: string;
  duracion_estimada: number;
  frecuencia: number;
  estado?: boolean;
}

// Modelo Angular para usar en el front
export class TipoMantenimiento {
  id: number;
  nombre: string;
  descripcion?: string;
  duracion_estimada: number;
  frecuencia: number;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string;
  mantenimientos?: { id: number; aeronave_id: number; fecha_programada: string; estado: boolean }[];

  constructor(data: TipoMantenimientoDTO) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.duracion_estimada = data.duracion_estimada;
    this.frecuencia = data.frecuencia;
    this.estado = data.estado;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.mantenimientos = data.mantenimientos;
  }
}

// Interfaz genérica para las respuestas del backend
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoMantenimientoService {

  private baseUrl = `${environment.apiUrl}/tipoMantenimientoRouter`;

  constructor(private http: HttpClient) {}

  // CREATE
  createTipoMantenimiento(data: TipoMantenimientoInputDTO): Observable<TipoMantenimiento> {
    return this.http.post<ApiResponse<TipoMantenimientoDTO>>(this.baseUrl, data).pipe(
      map(response => new TipoMantenimiento(response.data)),
      catchError(error => {
        console.error('Error al crear tipo de mantenimiento', error);
        return of(null as any);
      })
    );
  }

  // UPDATE
  updateTipoMantenimiento(data: TipoMantenimientoInputDTO, id: number): Observable<TipoMantenimiento> {
    return this.http.put<ApiResponse<TipoMantenimientoDTO>>(`${this.baseUrl}/${id}`, data).pipe(
      map(response => new TipoMantenimiento(response.data)),
      catchError(error => {
        console.error('Error al actualizar tipo de mantenimiento', error);
        return of(null as any);
      })
    );
  }

  // GET ALL
  getTiposMantenimiento(): Observable<TipoMantenimiento[]> {
    return this.http.get<ApiResponse<TipoMantenimientoDTO[]>>(this.baseUrl).pipe(
      map(response => response.data.map(item => new TipoMantenimiento(item))),
      catchError(error => {
        console.error('Error al cargar tipos de mantenimiento', error);
        return of([]);
      })
    );
  }

  // GET BY ID
  getTipoMantenimientoById(id: number): Observable<TipoMantenimiento | null> {
    return this.http.get<ApiResponse<TipoMantenimientoDTO>>(`${this.baseUrl}/${id}`).pipe(
      map(response => new TipoMantenimiento(response.data)),
      catchError(error => {
        console.error('Error al obtener tipo de mantenimiento:', error);
        return of(null);
      })
    );
  }

  // DELETE
  deleteTipoMantenimiento(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Error al eliminar tipo de mantenimiento', error);
        return of(false);
      })
    );
  }
}
