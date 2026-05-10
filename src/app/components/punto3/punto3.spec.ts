import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto3 } from './punto3';

describe('Punto3', () => {
  let component: Punto3;
  let fixture: ComponentFixture<Punto3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto3],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
