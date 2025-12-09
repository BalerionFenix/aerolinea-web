export class Tripulacion {
  miembro_codigo: number;
  cargo: string;
  activo: boolean;
  // Datos de la persona
  persona_codigo: number;
  nombre: string;
  base_codigo: number;

  constructor(data: any) {
    this.miembro_codigo = data.miembro_codigo;
    this.cargo = data.cargo;
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

export class TripulacionInputDTO {
  nombre: string;
  base_codigo: number;
  cargo: string;
  activo: boolean;

  constructor(data: any) {
    this.nombre = data.nombre;
    this.base_codigo = data.base_codigo;
    this.cargo = data.cargo;
    this.activo = data.activo;
  }
}