// DTOs públicos (respuesta)
export interface MantenimientoDTO {
  id: number;
  tipo_mantenimiento_id: number;
  avion_codigo: number;
  fecha_programada: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  costo_estimado: number;
  costo_real?: number | null;
  descripcion?: string | null;
  estado: 'programado' | 'en_proceso' | 'completado' | 'cancelado';
  personal_asignado?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface MantenimientoCreateDTO {
  tipo_mantenimiento_id: number;
  avion_codigo: number;
  fecha_programada: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  costo_estimado: number;
  costo_real?: number | null;
  descripcion?: string | null;
  estado: 'programado' | 'en_proceso' | 'completado' | 'cancelado';
  personal_asignado?: string | null;
}

export interface MantenimientoUpdateDTO extends MantenimientoCreateDTO {}

// Clase/Modelo cliente
export class Mantenimiento {
  id: number;
  tipoMantenimientoId: number;
  avion_codigo: number;                  // <-- agregado (camelCase interno)
  fechaProgramada: Date;
  fechaInicio?: Date | null;
  fechaFin?: Date | null;
  costoEstimado: number;
  costoReal?: number | null;
  descripcion?: string | null;
  estado: 'programado' | 'en_proceso' | 'completado' | 'cancelado';
  personalAsignado?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(dto: MantenimientoDTO | any) {
    this.id = dto.id ?? 0;
    this.tipoMantenimientoId = dto.tipo_mantenimiento_id;
    this.avion_codigo = dto.avion_codigo;                      // map
    this.fechaProgramada = new Date(dto.fecha_programada);
    this.fechaInicio = dto.fecha_inicio ? new Date(dto.fecha_inicio) : null;
    this.fechaFin = dto.fecha_fin ? new Date(dto.fecha_fin) : null;
    this.costoEstimado = Number(dto.costo_estimado);
    this.costoReal = dto.costo_real ? Number(dto.costo_real) : null;
    this.descripcion = dto.descripcion ?? null;
    this.estado = dto.estado;
    this.personalAsignado = dto.personal_asignado ?? null;
    this.createdAt = dto.createdAt ? new Date(dto.createdAt) : undefined;
    this.updatedAt = dto.updatedAt ? new Date(dto.updatedAt) : undefined;
  }

  toCreateDTO(): MantenimientoCreateDTO {
    return {
      tipo_mantenimiento_id: this.tipoMantenimientoId,
      avion_codigo: this.avion_codigo,                         // <-- incluido
      fecha_programada: this.fechaProgramada.toISOString().split('T')[0],
      fecha_inicio: this.fechaInicio?.toISOString().split('T')[0] ?? null,
      fecha_fin: this.fechaFin?.toISOString().split('T')[0] ?? null,
      costo_estimado: this.costoEstimado,
      costo_real: this.costoReal,
      descripcion: this.descripcion,
      estado: this.estado,
      personal_asignado: this.personalAsignado
    };
  }

  toUpdateDTO(): MantenimientoUpdateDTO {
    return this.toCreateDTO();
  }
}
