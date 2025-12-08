export class Mantenimiento {

  id: number;
  tipo_mantenimiento_id: number;
  aeronave_id: string  | null;
  fecha_programada: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  costo_estimado: number;
  costo_real?: number | null;

  descripcion?: string | null;
  estado: 'programado' | 'en_proceso' | 'completado' | 'cancelado';

  personal_asignado?: string | null;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    this.id = data.id;
    this.tipo_mantenimiento_id = data.tipo_mantenimiento_id;
    this.aeronave_id=data.aeronave_id;
    this.fecha_programada = data.fecha_programada;
    this.fecha_inicio = data.fecha_inicio ?? null;
    this.fecha_fin = data.fecha_fin ?? null;

    this.costo_estimado = Number(data.costo_estimado);
    this.costo_real = data.costo_real !== undefined ? Number(data.costo_real) : null;

    this.descripcion = data.descripcion ?? null;
    this.estado = data.estado ?? 'programado';

    this.personal_asignado = data.personal_asignado ?? null;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class MantenimientoInputDTO {

  tipo_mantenimiento_id: number;
  aeronave_id: string  | null;
  fecha_programada: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;

  costo_estimado: number;
  costo_real?: number | null;

  descripcion?: string | null;
  estado: 'programado' | 'en_proceso' | 'completado' | 'cancelado';

  personal_asignado?: string | null;

  constructor(data: any) {
    this.tipo_mantenimiento_id = data.tipo_mantenimiento_id;
    this.aeronave_id=data.aeronave_id;
    this.fecha_programada = data.fecha_programada;
    this.fecha_inicio = data.fecha_inicio ?? null;
    this.fecha_fin = data.fecha_fin ?? null;

    this.costo_estimado = Number(data.costo_estimado);
    this.costo_real = data.costo_real !== undefined ? Number(data.costo_real) : null;

    this.descripcion = data.descripcion ?? null;
    this.estado = data.estado ?? 'programado';

    this.personal_asignado = data.personal_asignado ?? null;
  }
}
