import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piloto} from '../models/Personal/piloto.model';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {
  private baseUrl = 'https://aerolinea-backend-1l6r.onrender.com/api/piloto';

  constructor(private http: HttpClient) {
  }

  getPilotos(): Observable<Piloto[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(response => {
        const pilotosMapeados = response.map(item => new Piloto(item));
        console.log('Pilotos recibidos:', pilotosMapeados);
        return pilotosMapeados;
      }),
      catchError(error => {
        console.error('Error al cargar los pilotos', error);
        return of([]);
      })
    );
  }

  getPilotoById(id: number): Observable<Piloto | null> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        console.log('Piloto recibido:', response);
        return new Piloto(response);
      }),
      catchError(error => {
        console.error('Error al obtener piloto', error);
        return of(null);
      })
    );
  }

  createPiloto(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map(response => {
        console.log('Piloto creado:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al crear piloto', error);
        return of(null);
      })
    );
  }

  updatePiloto(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      map(response => {
        console.log('Piloto actualizado:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al actualizar piloto', error);
        return of(null);
      })
    );
  }

  deletePiloto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        console.log('Piloto eliminado:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al eliminar piloto', error);
        return of(null);
      }));
  }
}
