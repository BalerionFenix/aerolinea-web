import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import { environment } from '../../../environments/environment';

import {Base} from '../models/base_avion/base.model';
import {HttpClient} from '@angular/common/http';
import {Rol} from '../models/Usuarios/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {


  private baseUrl = `${environment.apiUrl}/rol`;


  constructor(private http: HttpClient) { }


  getRoles(): Observable<Rol[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(response => {
        const rolesMapeados = response.map(item => new Rol(item));
        console.log('Roles recibidos:', rolesMapeados);
        return rolesMapeados;
      }),
      catchError(error => {
        console.error('Error al cargar los roles', error);
        return of([]);
      })
    );
  }

}
