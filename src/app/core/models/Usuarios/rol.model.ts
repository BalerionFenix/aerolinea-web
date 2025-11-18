export class Rol {
  rol_id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;

  constructor(data: any) {
    this.rol_id = data.rol_id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.activo = data.activo;
  }
}
