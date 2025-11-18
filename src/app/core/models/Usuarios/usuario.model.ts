import { Rol } from './rol.model';

export class Usuario {
  usuario_id: number;
  nombre: string;
  email: string;
  rol: Rol | null;
  base_codigo: number;
  persona_codigo: number | null;
  activo: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(data: any) {
    this.usuario_id = Number(data.usuario_id);
    this.nombre = data.nombre;
    this.email = data.email;
    this.rol = data.rol ? new Rol(data.rol) : null;
    this.base_codigo = data.base_codigo;
    this.persona_codigo = data.persona_codigo?? null;
    this.activo = data.activo;
    this.created_at = new Date(data.created_at);
    this.updated_at = new Date(data.updated_at);
  }
}

export class UsuarioInputDTO {
  nombre: string;
  email: string;
  rol_id: number;
  base_codigo: number | null;
  persona_codigo: number | null;
  activo: boolean;

  constructor(data: any) {
    this.nombre = data.nombre;
    this.email = data.email;
    this.rol_id = Number(data.rol_id);
    this.base_codigo = data.base_codigo ? Number(data.base_codigo) : null;
    this.persona_codigo = data.persona_codigo ? Number(data.persona_codigo) : null;
    this.activo = data.activo !== undefined ? data.activo : true;
  }
}



