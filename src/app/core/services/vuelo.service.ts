import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vuelo } from '../models/vuelos/vuelo.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  private baseUrl = 'http://localhost:4000/api/vuelo';

  private vuelosSubject = new BehaviorSubject<Vuelo[]>([]);
  vuelos$ = this.vuelosSubject.asObservable();

  constructor(private http: HttpClient) {}

  refreshVuelos() {
    this.http.get<Vuelo[]>(this.baseUrl).subscribe({
      next: (data) => this.vuelosSubject.next(data),
      error: (err) => console.error('Error al cargar vuelos', err)
    });
  }

  getVuelos(): Observable<Vuelo[]> {
    return this.vuelos$;
  }

  getVuelo(vueloNum: string): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${this.baseUrl}/${vueloNum}`);
  }

  createVuelo(vuelo: any): Observable<Vuelo> {
    return this.http.post<Vuelo>(this.baseUrl, vuelo).pipe(
      tap(() => this.refreshVuelos())
    );
  }

  updateVuelo(vueloNum: string, vuelo: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${vueloNum}`, vuelo).pipe(
      tap(() => this.refreshVuelos())
    );
  }

  deleteVuelo(vueloNum: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${vueloNum}`).pipe(
      tap(() => this.refreshVuelos())
    );
  }
}
