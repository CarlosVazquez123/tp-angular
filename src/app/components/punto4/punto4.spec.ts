import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto4 } from './punto4';

describe('Punto4', () => {
  let component: Punto4;
  let fixture: ComponentFixture<Punto4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto4],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto4);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
