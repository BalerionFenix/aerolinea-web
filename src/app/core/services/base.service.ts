import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Base, BaseInputDTO} from '../models/base_avion/base.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseUrl = 'http://192.168.0.6:4000/api/base';


  constructor(private http: HttpClient) { }


  createBase(Base: BaseInputDTO): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, Base);
  }

  updateBase(Base: BaseInputDTO, id: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`, Base);
  }


  getBases(): Observable<Base[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(response => {
        const basesMapeadas = response.map(item => new Base(item));
        console.log('Bases recibidas:', basesMapeadas);
        return basesMapeadas;
      }),
      catchError(error => {
        console.error('Error al cargar las bases', error);
        return of([]);
      })
    );
  }

  getBaseById(base_codigo: number): Observable<any>{
    const url = `${this.baseUrl}/${base_codigo}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Usuario recibido:', response);
        return response;
      }),
      catchError(error =>{
          console.error('Error al obtener usuario:', error);
          return of(null);
        }
      )
    )
  }

  deleteBase(base_codigo: number): Observable<any> {
    const url = `${this.baseUrl}/${base_codigo}`;
    return this.http.delete(url).pipe(
      map(response => {
        console.log('Base deleted from server:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error deleting base', error);
        return of(null);
      })
    );
  }




}
