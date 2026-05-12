import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Obligatorio para usar [(ngModel)]
import { InscripcionService, Inscripcion } from '../../services/inscripcion';

@Component({
  selector: 'app-punto4',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Registramos los módulos básicos
  templateUrl: './punto4.html',
  styleUrl: './punto4.css'
})
export class Punto4 implements OnInit {

  // Inyectamos nuestro servicio global usando la sintaxis moderna de Angular
  private inscripcionService = inject(InscripcionService);

  // Array local que se conectará con el servicio para pintar la tabla
  listaInscripciones: Inscripcion[] = [];

  // Objeto "molde" conectado directamente a los campos del formulario HTML
  nuevaInscripcion: Inscripcion = {
    dni: '',
    precio: 0,
    categoriaAlumno: '',
    fechaInscripcion: '',
    email: '',
    curso: '',
    totalConDescuento: 0
  };

  ngOnInit(): void {
    // Al arrancar, traemos lo que tenga el servicio guardado
    this.listaInscripciones = this.inscripcionService.obtenerTodos();
  }

  // FUNCIÓN EVENTO (cambio): Calcula el precio final aplicando los descuentos de la consigna
  calcularPrecioFinal(): void {
    const precioBase = this.nuevaInscripcion.precio;
    const categoria = this.nuevaInscripcion.categoriaAlumno;

    // Si todavía no ingresó alguno de los dos valores, el total vuelve a 0
    if (!precioBase || !categoria) {
      this.nuevaInscripcion.totalConDescuento = 0;
      return;
    }

    // Evaluamos según los códigos del enunciado
    if (categoria === '1') {
      // Estudiante: 35% de descuento (Paga el 65%)
      this.nuevaInscripcion.totalConDescuento = precioBase * 0.65;
    } else if (categoria === '2') {
      // Egresado: 50% de descuento (Paga el 50%)
      this.nuevaInscripcion.totalConDescuento = precioBase * 0.50;
    } else {
      // Particular: Sin descuento
      this.nuevaInscripcion.totalConDescuento = precioBase;
    }
  }

  // FUNCIÓN REGISTRAR: Valida, envía al servicio y limpia el formulario
  registrarInscripcion(): void {
    // Validamos que los campos esenciales no estén vacíos
    if (!this.nuevaInscripcion.dni || !this.nuevaInscripcion.email || this.nuevaInscripcion.totalConDescuento === 0) {
      alert('Por favor, complete todos los campos del formulario antes de registrar.');
      return;
    }

    // Enviamos el objeto al servicio para que lo guarde en el Array global
    this.inscripcionService.agregar(this.nuevaInscripcion);

    // Actualizamos nuestra lista local para que la tabla de abajo se entere del cambio
    this.listaInscripciones = this.inscripcionService.obtenerTodos();

    // Reseteamos el molde del formulario para permitir una nueva carga limpia
    this.nuevaInscripcion = {
      dni: '',
      precio: 0,
      categoriaAlumno: '',
      fechaInscripcion: '',
      email: '',
      curso: '',
      totalConDescuento: 0
    };
  }

  // ================= SECCIÓN DE RESUMEN (Cálculos matemáticos en vivo) =================

  // Cuenta cuántos alumnos hay registrados por cada código de categoría
  obtenerCantidadPorCategoria(cat: string): number {
    return this.listaInscripciones.filter(ins => ins.categoriaAlumno === cat).length;
  }

  // Suma el total general facturado de todas las inscripciones combinadas
  obtenerTotalGeneral(): number {
    return this.listaInscripciones.reduce((suma, ins) => suma + ins.totalConDescuento, 0);
  }

  // Función CRUD opcional por si querés borrar una fila desde la tabla
  borrarFila(dni: string): void {
    this.inscripcionService.eliminar(dni);
    this.listaInscripciones = this.inscripcionService.obtenerTodos();
  }
}