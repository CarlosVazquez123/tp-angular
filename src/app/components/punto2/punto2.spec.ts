import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto2 } from './punto2';

describe('Punto2', () => {
  let component: Punto2;
  let fixture: ComponentFixture<Punto2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto2],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
