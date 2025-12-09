// src/app/core/services/tipo-mantenimiento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  TipoMantenimiento,
  TipoMantenimientoCreateDTO,
  TipoMantenimientoDTO, TipoMantenimientoUpdateDTO
} from '../models/mantenimiento/tipo-mantenimiento.models';


interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoMantenimientoService {
  private readonly apiUrl = `${environment.apiUrl}/tipo-mantenimiento`;

  constructor(private http: HttpClient) {}

  create(dto: TipoMantenimientoCreateDTO): Observable<TipoMantenimiento> {
    return this.http.post<ApiResponse<TipoMantenimientoDTO>>(this.apiUrl, dto).pipe(
      map(response => new TipoMantenimiento(response.data)),
      catchError(this.handleError)
    );
  }


  update(id: number, dto: TipoMantenimientoUpdateDTO): Observable<TipoMantenimiento> {
    return this.http.put<ApiResponse<TipoMantenimientoDTO>>(`${this.apiUrl}/${id}`, dto).pipe(
      map(response => new TipoMantenimiento(response.data)),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<TipoMantenimiento[]> {
    return this.http.get<ApiResponse<TipoMantenimientoDTO[]>>(this.apiUrl).pipe(
      map(response => response.data.map(dto => new TipoMantenimiento(dto))),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<TipoMantenimiento> {
    return this.http.get<ApiResponse<TipoMantenimientoDTO>>(`${this.apiUrl}/${id}`).pipe(
      map(response => new TipoMantenimiento(response.data)),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.success),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en TipoMantenimientoService:', error);
    return throwError(() => error);
  }
}
