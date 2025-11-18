export class Avion {
  avion_codigo: number;
  tipo: string;
  modelo: string;
  fabricante: string;
  capacidad: number;
  anio_fabricacion: number;
  base_codigo: number;
  estado: string;
  horas_vuelo_totales: number;
  ultimo_mantenimiento: string | null;
  proximo_mantenimiento: string | null;
  activo: boolean;

  constructor(data: any) {
    this.avion_codigo = data.avion_codigo;
    this.tipo = data.tipo;
    this.modelo = data.modelo;
    this.fabricante = data.fabricante;
    this.capacidad = data.capacidad;
    this.anio_fabricacion = data.anio_fabricacion;
    this.base_codigo = data.base_codigo;
    this.estado = data.estado;
    this.horas_vuelo_totales = data.horas_vuelo_totales;
    this.ultimo_mantenimiento = data.ultimo_mantenimiento;
    this.proximo_mantenimiento = data.proximo_mantenimiento;
    this.activo = data.activo;
  }
}


export class AvionInputDTO {
  tipo: string;
  modelo: string;
  fabricante: string;
  capacidad: number;
  anio_fabricacion: number;
  base_codigo: number;
  horas_vuelo_totales: number;

  constructor(data: any) {
    this.tipo = data.tipo;
    this.modelo = data.modelo;
    this.fabricante = data.fabricante;
    this.capacidad = data.capacidad;
    this.anio_fabricacion = data.anio_fabricacion;
    this.base_codigo = data.base_codigo;
    this.horas_vuelo_totales = data.horas_vuelo_totales;
  }
}

