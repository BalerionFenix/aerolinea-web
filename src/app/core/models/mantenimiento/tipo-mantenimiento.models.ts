export class TipoMantenimiento {

  id: number;
  nombre: string;
  descripcion?: string | null;
  duracion_estimada: number;
  frecuencia: number;
  estado: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion ?? null;

    this.duracion_estimada = Number(data.duracion_estimada);
    this.frecuencia = Number(data.frecuencia);

    this.estado = data.estado ?? true;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class TipoMantenimientoInputDTO {

  nombre: string;
  descripcion?: string | null;
  duracion_estimada: number;
  frecuencia: number;
  estado: boolean;

  constructor(data: any) {
    this.nombre = data.nombre;
    this.descripcion = data.descripcion ?? null;

    this.duracion_estimada = Number(data.duracion_estimada);
    this.frecuencia = Number(data.frecuencia);

    this.estado = data.estado ?? true;
  }
}
