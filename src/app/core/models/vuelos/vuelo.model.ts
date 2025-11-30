export class Vuelo {
  vuelo_num: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  avion_codigo: string;
  piloto_codigo: string;
  hora_salida_real?: string;
  hora_llegada_real?: string;
  duracion_vuelo?: number;
  observaciones?: string;
  estado?: string;
  constructor(data: any) {
    this.vuelo_num = data.vuelo_num;
    this.origen = data.origen;
    this.destino = data.destino;
    this.fecha = data.fecha;
    this.hora = data.hora;
    this.avion_codigo = data.avion_codigo;
    this.piloto_codigo = data.piloto_codigo;
    this.hora_salida_real = data.hora_salida_real;
    this.hora_llegada_real = data.hora_llegada_real;
    this.duracion_vuelo = data.duracion_vuelo;
    this.observaciones = data.observaciones;
    this.estado = data.estado;
  }
}
export class VueloInput {
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  avion_codigo: string;
  piloto_codigo: string;
  hora_salida_real?: string;
  hora_llegada_real?: string;
  duracion_vuelo?: string;
  observaciones?: string;
  constructor(data: any) {
    this.origen = data.origen;
    this.destino = data.destino;
    this.fecha = data.fecha;
    this.hora = data.hora;
    this.avion_codigo = data.avion_codigo;
    this.piloto_codigo = data.piloto_codigo;
    this.hora_salida_real = data.hora_salida_real;
    this.hora_llegada_real = data.hora_llegada_real;
    this.duracion_vuelo = data.duracion_vuelo;
    this.observaciones = data.observaciones;
  }
}
