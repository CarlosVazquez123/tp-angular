import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para directivas básicas

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.html',
  styleUrl: './punto1.css',
})
export class Punto1 {

  // Fuente de datos: Array de objetos para los eventos
  eventos = [
    { 
      nombre: 'Masterclass de Mezcla y Sonido en Vivo', 
      descripcion: 'Aprendé a calibrar crossovers, ecualizar monitores y optimizar el flujo de señal en consolas analógicas y digitales.', 
      img: 'imagenes/punto1/sonido_vivo.jpg' 
    },
    { 
      nombre: 'Taller de Producción Musical en Reaper', 
      descripcion: 'Técnicas de grabación casera, edición de pistas, uso de plugins y automatizaciones para maquetar tus canciones.', 
      img: 'imagenes/punto1/produccion_reaper.jpg' 
    },
    { 
      nombre: 'Clínica de Afinación y Calibración de Instrumentos', 
      descripcion: 'Conceptos esenciales para el mantenimiento de guitarras y baterías, tensión de parches, octavación y cuidado del hardware.', 
      img: 'imagenes/punto1/calibracion.jpg' 
    },
    { 
    nombre: 'Taller de Fundamentos de Audio y Acústica', 
    descripcion: 'Un espacio educativo diseñado para comprender cómo se propaga el sonido, el uso correcto de diferentes tipos de micrófonos y cómo evitar acoples (feedback) en salas cerradas.', 
    img: 'imagenes/punto1/acustica_sonido.jpg' 
    }
  ];

  // Variable de estado para controlar qué evento se muestra (arranca en el   primero)
  indiceActivo: number = 0;

  // Botón para adelantar
  siguiente() {
    if (this.indiceActivo < this.eventos.length - 1) {
      this.indiceActivo++;
    } else {
      this.indiceActivo = 0; // Vuelve al principio (efecto carrusel)
    }
  }

  // Botón para retrasar
  anterior() {
    if (this.indiceActivo > 0) {
      this.indiceActivo--;
    } else {
      this.indiceActivo = this.eventos.length - 1; // Va al último elemento
    }
  }
}