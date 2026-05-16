import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrl: './punto2.css'
})
export class Punto2 {

  // 1. La fuente de datos (Nuestros productos)
  productos = [
    {
      id: 1,
      nombre: 'Consola Allen & Heath Qu-16',
      descripcion: 'Consola digital de 16 canales ideal para sonido en vivo y grabación profesional en estudio.',
      precio: 2450,
      img: 'punto2/qu16.jpg'  
    },
    {
      id: 2,
      nombre: 'Micrófono Shure SM58',
      descripcion: 'El estándar de la industria para voces en vivo. Cardioide, dinámico y extremadamente resistente.',
      precio: 120,
      img: 'punto2/shure-sm-58.webp'
    },
    {
      id: 3,
      nombre: 'Interfaz de Audio Behringer UMC22',
      descripcion: 'Interfaz USB de 2 canales con preamplificador MIDAS para grabaciones limpias en DAWs como Reaper.',
      precio: 95,
      img: 'punto2/interfaz_sonido.jpg'
    },
    {
      id: 4,
      nombre: 'Pedal de Overdrive para Guitarra',
      descripcion: 'Saturación clásica y cálida tipo valvular, ideal para destacar solos de guitarra en cualquier mezcla.',
      precio: 85,
      img: 'punto2/pedal_guitarra.webp'
    }
  ];

  // 2. El estado del Carrito (Empieza vacío)
  carrito: any[] = [];

  // 3. Función para agregar productos (Event Binding en el HTML)
  agregarAlCarrito(producto: any) {
    this.carrito.push(producto);
  }

  // 4. Función para calcular el total acumulado usando expresiones
  calcularTotal(): number {
    let total = 0; // crea una variable temporal que aranca en cero
    for (let item of this.carrito) {
      total += item.precio;
    }
    return total;
  }

  // 5. Función extra para limpiar el carrito cuando finalicen la compra
  vaciarCarrito() {
    this.carrito = [];
  }
}