import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos la estructura de cómo es una "Carta" en nuestro juego
interface Carta {
  id: number;        // Identificador único (del 1 al 12)
  valor: string;     // Nombre del instrumento/equipo (ej: "Consola")
  img: string;       // Ruta de la imagen
  estaVolteada: boolean; // Indica si se está mostrando el dibujo
  estaEmparejada: boolean; // Indica si ya se adivinó su pareja
}

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css'
})
export class Punto3 implements OnInit {

  // Listado base de nuestras 6 imágenes (parejas)
  // Las imágenes se guardan en public/punto3/
  imagenesBase = [
    { valor: 'Consola', img: 'punto3/consola.jpg' },
    { valor: 'Micrófono', img: 'punto3/microfono.jpg' },
    { valor: 'Auriculares', img: 'punto3/auriculares.jpg' },
    { valor: 'Guitarra', img: 'punto3/guitarra.jpg' },
    { valor: 'Batería', img: 'punto3/bateria.jpg' },
    { valor: 'Interfaz', img: 'punto3/interfaz.jpg' }
  ];

  // El mazo de 12 cartas en juego
  cartas: Carta[] = [];

  // Variables para controlar el estado del juego
  cartasSeleccionadas: Carta[] = []; // Guarda las (máximo 2) cartas volteadas en el turno
  bloquearTablero: boolean = false;   // Evita que el usuario haga clics rápidos mientras se voltean las cartas
  intentos: number = 0;              // Contador de movimientos
  aciertos: number = 0;              // Contador de parejas encontradas
  juegoIniciado: boolean = false;    // Controla si la partida está activa

  // Constructor / Inicializador de Angular
  ngOnInit() {
    // Al arrancar, preparamos un tablero por defecto
    this.inicializarJuego();
  }

  // Crea el mazo de 12 cartas duplicando nuestras 6 imágenes
  inicializarJuego() {
    this.cartas = [];
    this.cartasSeleccionadas = [];
    this.intentos = 0;
    this.aciertos = 0;
    this.bloquearTablero = false;

    // Duplicamos las 6 imágenes para tener 12 elementos (6 parejas)
    let idAutoIncrement = 1;
    for (let img of this.imagenesBase) {
      // Agregamos la primera carta del par
      this.cartas.push({
        id: idAutoIncrement++,
        valor: img.valor,
        img: img.img,
        estaVolteada: false,
        estaEmparejada: false
      });
      // Agregamos la segunda carta del par
      this.cartas.push({
        id: idAutoIncrement++,
        valor: img.valor,
        img: img.img,
        estaVolteada: false,
        estaEmparejada: false
      });
    }

    // Mezclamos el mazo para que queden en posiciones aleatorias
    this.mezclarCartas();
  }

  // Algoritmo para mezclar elementos de un array de forma aleatoria
  mezclarCartas() {
    // Usamos el clásico ordenamiento aleatorio de JavaScript (Fisher-Yates simplificado)
    this.cartas.sort(() => Math.random() - 0.5);
  }

  // Arranca oficialmente el contador y permite jugar
  comenzarPartida() {
    this.inicializarJuego();
    this.juegoIniciado = true;
  }

  // Esta función se ejecuta CADA VEZ que el usuario hace clic en una carta
  seleccionarCarta(carta: Carta) {
    // Seguridad: No hacemos nada si...
    // 1. El juego no inició.
    // 2. El tablero está bloqueado temporalmente por una animación.
    // 3. Hacés clic sobre una carta que ya está dada vuelta o emparejada.
    if (!this.juegoIniciado || this.bloquearTablero || carta.estaVolteada || carta.estaEmparejada) {
      return;
    }

    // Volteamos la carta físicamente
    carta.estaVolteada = true;
    
    // La agregamos a nuestra lista temporal de control de turno
    this.cartasSeleccionadas.push(carta);

    // Si es la primera carta que voltea, esperamos a que elija la segunda
    if (this.cartasSeleccionadas.length === 1) {
      return;
    }

    // Si ya volteó la segunda carta, procesamos el resultado
    this.verificarCoincidencia();
  }

  // Compara las dos cartas seleccionadas
  verificarCoincidencia() {
    this.intentos++; // Sumamos un movimiento realizado
    this.bloquearTablero = true; // Bloqueamos clics extras para no romper el juego

    const carta1 = this.cartasSeleccionadas[0];
    const carta2 = this.cartasSeleccionadas[1];

    // ¿Tienen el mismo valor? (ej: "Consola" === "Consola")
    if (carta1.valor === carta2.valor) {
      // ¡Acierto! Las marcamos como emparejadas para siempre
      carta1.estaEmparejada = true;
      carta2.estaEmparejada = true;
      this.aciertos++;
      
      // Limpiamos la selección del turno y desbloqueamos
      this.cartasSeleccionadas = [];
      this.bloquearTablero = false;

      // Verificamos si ganó el juego (adivinó las 6 parejas)
      if (this.aciertos === 6) {
        // Podríamos poner un cartel de victoria aquí
      }
    } else {
      // ¡Fallo! Esperamos 1 segundo para que el usuario las memorice, y las volvemos a tapar
      setTimeout(() => {
        carta1.estaVolteada = false;
        carta2.estaVolteada = false;
        
        // Limpiamos la selección y desbloqueamos el tablero para el siguiente turno
        this.cartasSeleccionadas = [];
        this.bloquearTablero = false;
      }, 1000); // 1000 milisegundos = 1 segundo
    }
  }
}