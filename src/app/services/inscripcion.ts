import { Injectable } from '@angular/core';

// Definimos la interfaz estricta que pide el enunciado para el objeto Inscripcion
export interface Inscripcion {
  dni: string;
  precio: number;
  categoriaAlumno: string; // '1' = Estudiante, '2' = Egresado, '3' = Particular
  fechaInscripcion: string; // Se guardará en formato YYYY-MM-DD desde el input
  email: string;
  curso: string;
  totalConDescuento: number; // Campo calculado que guardaremos para el resumen
}

@Injectable({
  providedIn: 'root' // Esto significa que el servicio es global y único para toda la app (Singleton)
})
export class InscripcionService {

  // Nuestra "Base de Datos" temporal en memoria (El Array pedido)
  private listaInscripciones: Inscripcion[] = [];

  constructor() { }

  // [ READ ] - Retorna todas las inscripciones registradas
  obtenerTodos(): Inscripcion[] {
    return this.listaInscripciones;
  }

  // [ CREATE ] - Guarda una nueva inscripción en el Array
  agregar(inscripcion: Inscripcion): void {
    // Usamos el operador spread (...) para clonar el objeto y evitar problemas de referencia en memoria
    this.listaInscripciones.push({ ...inscripcion });
  }

  // [ DELETE ] - Elimina una inscripción por su DNI (Opcional para completar el concepto CRUD)
  eliminar(dni: string): void {
    this.listaInscripciones = this.listaInscripciones.filter(ins => ins.dni !== dni);
  }
}