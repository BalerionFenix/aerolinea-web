import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Usuario, UsuarioInputDTO} from '../models/Usuarios/usuario.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


     private baseUrl = `${environment.apiUrl}/usuario`;




  constructor(private http: HttpClient) {}

  createUser(Usuario: UsuarioInputDTO): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, Usuario);
  }

  updateUser(Usuario: UsuarioInputDTO, id: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`, Usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((usuarios) => {
        const usuariosMapeados = usuarios.map(item => new Usuario(item));
        console.log('Usuarios recibidos:', usuariosMapeados);
        return usuariosMapeados;
      }),
      catchError((error) => {
        console.error('Error al cargar usuarios', error);
        return of([]);
      })
    );
  }


  getUsuarioByEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/email/${email}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Usuario recibido:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al obtener usuario:', error);
        return of(null);
      })
    );
  }

  getUserById(id: number): Observable<any>{
    const url = `${this.baseUrl}/${id}`;
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

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }




}
