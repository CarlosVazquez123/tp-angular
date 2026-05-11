import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carta {
  id: number;
  valor: string;
  img: string;
  estaVolteada: boolean;
  estaEmparejada: boolean;
}

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css'
})
export class Punto3 implements OnInit {

  // Inyectamos la herramienta para obligar a Angular a actualizar la vista
  private cdr = inject(ChangeDetectorRef);

  // 1. Temática nueva: Clubes del Fútbol Argentino ⚽
  imagenesBase = [
    { valor: 'Boca Juniors', img: 'punto3/boquita.png' },
    { valor: 'River Plate', img: 'punto3/riber.png' },
    { valor: 'Independiente', img: 'punto3/independiente.png' },
    { valor: 'Racing Club', img: 'punto3/racing.png' },
    { valor: 'San Lorenzo', img: 'punto3/san_lorenzo.png' },
    { valor: 'Estudiantes LP', img: 'punto3/estudiantes_lp.png' }
  ];

  cartas: Carta[] = [];
  cartasSeleccionadas: Carta[] = [];

  // Lógica de intentos y bloqueos del TP
  intentosMaximos: number = 20;     // Límite de intentos permitidos
  intentosRealizados: number = 0;   // Contador de intentos consumidos
  intentoHabilitado: boolean = false; // Controla si el botón "INTENTAR" fue presionado
  bloquearTablero: boolean = true;  // Bloquea el clic en las cartas (arranca bloqueado)
  
  aciertos: number = 0;
  juegoIniciado: boolean = false;
  mensajeResultado: string = '';    // Puede ser 'GANASTE', 'PERDISTE' o vacío

  ngOnInit() {
    this.inicializarJuego();
  }

  inicializarJuego() {
    this.cartas = [];
    this.cartasSeleccionadas = [];
    this.intentosRealizados = 0;
    this.aciertos = 0;
    this.intentoHabilitado = false;
    this.bloquearTablero = true; // Al empezar, no se pueden tocar las cartas
    this.mensajeResultado = '';

    // Duplicamos las 6 imágenes de los clubes para tener las 12 cartas
    let idAutoIncrement = 1;
    for (let img of this.imagenesBase) {
      this.cartas.push({
        id: idAutoIncrement++,
        valor: img.valor,
        img: img.img,
        estaVolteada: false,
        estaEmparejada: false
      });
      this.cartas.push({
        id: idAutoIncrement++,
        valor: img.valor,
        img: img.img,
        estaVolteada: false,
        estaEmparejada: false
      });
    }
    this.cartas.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
  }

  comenzarPartida() {
    this.inicializarJuego();
    this.juegoIniciado = true;
  }

  // BOTÓN "INTENTAR": Habilita al jugador a voltear exactamente DOS cartas
  habilitarIntento() {
    // Seguridad: No se puede intentar si el juego no empezó, si ya se llegó al límite de 20, 
    // o si el usuario ya tiene cartas volteadas sin resolver en pantalla.
    if (!this.juegoIniciado || this.intentosRealizados >= this.intentosMaximos || this.cartasSeleccionadas.length > 0 || this.mensajeResultado !== '') {
      return;
    }

    this.intentoHabilitado = true; // Habilitamos la acción
    this.bloquearTablero = false;  // Desbloqueamos el tablero físico
    this.intentosRealizados++;     // Se consume un intento al presionar el botón
  }

  seleccionarCarta(carta: Carta) {
    // Si no presionó "INTENTAR" (o el tablero está bloqueado), el clic no hace nada
    if (!this.juegoIniciado || !this.intentoHabilitado || this.bloquearTablero || carta.estaVolteada || carta.estaEmparejada) {
      return;
    }

    carta.estaVolteada = true; // Se voltea físicamente la carta
    this.cartasSeleccionadas.push(carta);

    // Cuando el jugador ya volteó las DOS cartas permitidas por su intento
    if (this.cartasSeleccionadas.length === 2) {
      this.bloquearTablero = true;   // Bloqueamos clics rápidos de inmediato
      this.intentoHabilitado = false; // Se termina la habilitación del intento actual
      this.verificarCoincidencia();
    }
  }

  verificarCoincidencia() {
    const carta1 = this.cartasSeleccionadas[0];
    const carta2 = this.cartasSeleccionadas[1];

    if (carta1.valor === carta2.valor) {
      // SI COINCIDEN: Las dejamos dadas vuelta y sumamos acierto
      carta1.estaEmparejada = true;
      carta2.estaEmparejada = true;
      this.aciertos++;
      this.cartasSeleccionadas = [];

      if (this.aciertos === 6) {
        this.mensajeResultado = 'GANASTE';
      } else {
        this.bloquearTablero = true; // Se bloquea hasta que presione "INTENTAR" de nuevo
      }

      this.cdr.detectChanges(); // Forzamos el redibujado de la victoria o el bloqueo
    } else {
      // NO COINCIDEN: Esperamos exactamente 1 segundo (1000ms) de forma asíncrona
      setTimeout(() => {
        // Volvemos a poner las cartas boca abajo
        carta1.estaVolteada = false;
        carta2.estaVolteada = false;
        
        // Limpiamos la lista de selección para habilitar el siguiente turno
        this.cartasSeleccionadas = [];

        if (this.intentosRealizados >= this.intentosMaximos && this.aciertos < 6) {
          this.mensajeResultado = 'PERDISTE';
        } else {
          this.bloquearTablero = true; // El tablero se congela hasta presionar "INTENTAR"
        }

        // ¡MÁGICO! Le ordenamos a Angular que actualice el HTML en este preciso instante
        this.cdr.detectChanges(); 

      }, 1000); // 1000 milisegundos = 1 segundo exacto
    }
  }
}