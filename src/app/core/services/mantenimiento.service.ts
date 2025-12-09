// src/app/core/services/mantenimiento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Mantenimiento, MantenimientoDTO} from '../models/mantenimiento/mantenimiento.models';


interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private readonly apiUrl = `${environment.apiUrl}/mantenimiento`;

  constructor(private http: HttpClient) {}

  create(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const dto = mantenimiento.toCreateDTO();
    return this.http.post<ApiResponse<MantenimientoDTO>>(this.apiUrl, dto).pipe(
      map(response => new Mantenimiento(response.data)),
      catchError(this.handleError)
    );
  }

  update(id: number, mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const dto = mantenimiento.toUpdateDTO();
    return this.http.put<ApiResponse<MantenimientoDTO>>(`${this.apiUrl}/${id}`, dto).pipe(
      map(response => new Mantenimiento(response.data)),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<Mantenimiento[]> {
    return this.http.get<ApiResponse<MantenimientoDTO[]>>(this.apiUrl).pipe(
      map(response => response.data.map(dto => new Mantenimiento(dto))),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Mantenimiento> {
    return this.http.get<ApiResponse<MantenimientoDTO>>(`${this.apiUrl}/${id}`).pipe(
      map(response => new Mantenimiento(response.data)),
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
    console.error('Error en MantenimientoService:', error);
    return throwError(() => error);
  }
}
