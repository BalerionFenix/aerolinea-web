export class Piloto {
  piloto_codigo: number;
  horas_vuelo: number;
  licencia: string;
  fecha_vencimiento_licencia: string;
  certificaciones: string[];
  activo: boolean;
  // Datos de la persona
  persona_codigo: number;
  nombre: string;
  base_codigo: number;

  constructor(data: any) {
    this.piloto_codigo = data.piloto_codigo;
    this.horas_vuelo = data.horas_vuelo;
    this.licencia = data.licencia;
    this.fecha_vencimiento_licencia = data.fecha_vencimiento_licencia;
    this.certificaciones = data.certificaciones || [];
    this.activo = data.activo;
    
    // Extraer datos de la persona anidada
    if (data.persona) {
      this.persona_codigo = data.persona.persona_codigo;
      this.nombre = data.persona.nombre;
      this.base_codigo = data.persona.base_codigo;
    } else {
      // Mantener compatibilidad con estructura antigua si existe
      this.persona_codigo = data.persona_codigo || 0;
      this.nombre = data.nombre || '';
      this.base_codigo = data.base_codigo || 0;
    }
  }
}

export class PilotoInputDTO {
  nombre: string;
  base_codigo: number;
  horas_vuelo: number;
  licencia: string;
  fecha_vencimiento_licencia: string;
  certificaciones: string[];
  activo: boolean;

  constructor(data: any) {
    this.nombre = data.nombre;
    this.base_codigo = data.base_codigo;
    this.horas_vuelo = data.horas_vuelo;
    this.licencia = data.licencia;
    this.fecha_vencimiento_licencia = data.fecha_vencimiento_licencia;
    this.certificaciones = data.certificaciones;
    this.activo = data.activo;
  }
}