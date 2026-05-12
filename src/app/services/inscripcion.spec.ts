import { TestBed } from '@angular/core/testing';
import { InscripcionService } from './inscripcion'; // <-- Corregimos para que importe el Servicio

describe('InscripcionService', () => {
  let service: InscripcionService; // <-- Cambiamos a InscripcionService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionService); // <-- Cambiamos a InscripcionService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});