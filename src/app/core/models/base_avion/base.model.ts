import {Usuario} from '../Usuarios/usuario.model';

export class Base {
  base_codigo: number;
  nombre: string;
  ciudad: string;
  pais: string;
  direccion: string;
  estado: String;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this.base_codigo = data.base_codigo;
    this.nombre = data.nombre;
    this.ciudad = data.ciudad;
    this.pais = data.pais;
    this.direccion = data.direccion;
    this.estado = data.estado ?? '';
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class BaseInputDTO {
  nombre: string;
  ciudad: string;
  pais: string;
  direccion: string;
  estado: String;

  constructor(data: any) {
    this.nombre = data.nombre;
    this.ciudad = data.ciudad;
    this.pais = data.pais;
    this.direccion = data.direccion;
    this.estado = data.estado || "Activo";
  }
}
