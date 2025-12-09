// src/app/core/models/tipo-mantenimiento.model.ts

export interface TipoMantenimientoDTO {
  id: number;
  nombre: string;
  descripcion?: string | null;
  duracion_estimada: number;
  frecuencia: number;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string;
  mantenimientos?: {
    id: number;
    aeronave_id: number;
    fecha_programada: string;
    estado: boolean;
  }[];
}

export interface TipoMantenimientoCreateDTO {
  nombre: string;
  descripcion?: string | null;
  duracion_estimada: number;
  frecuencia: number;
  estado?: boolean;
}

export interface TipoMantenimientoUpdateDTO extends TipoMantenimientoCreateDTO {}

export class TipoMantenimiento {
  id: number;
  nombre: string;
  descripcion?: string | null;
  duracionEstimada: number;
  frecuencia: number;
  estado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  mantenimientos?: {
    id: number;
    aeronaveId: number;
    fechaProgramada: Date;
    estado: boolean;
  }[];

  constructor(dto: TipoMantenimientoDTO) {
    this.id = dto.id;
    this.nombre = dto.nombre;
    this.descripcion = dto.descripcion ?? null;
    this.duracionEstimada = Number(dto.duracion_estimada);
    this.frecuencia = Number(dto.frecuencia);
    this.estado = dto.estado;
    this.createdAt = dto.createdAt ? new Date(dto.createdAt) : undefined;
    this.updatedAt = dto.updatedAt ? new Date(dto.updatedAt) : undefined;

    if (dto.mantenimientos) {
      this.mantenimientos = dto.mantenimientos.map(m => ({
        id: m.id,
        aeronaveId: m.aeronave_id,
        fechaProgramada: new Date(m.fecha_programada),
        estado: m.estado
      }));
    }
  }

  toCreateDTO(): TipoMantenimientoCreateDTO {
    return {
      nombre: this.nombre,
      descripcion: this.descripcion ?? null,
      duracion_estimada: this.duracionEstimada,
      frecuencia: this.frecuencia,
      estado: this.estado
    };
  }

  toUpdateDTO(): TipoMantenimientoUpdateDTO {
    return this.toCreateDTO();
  }
}
