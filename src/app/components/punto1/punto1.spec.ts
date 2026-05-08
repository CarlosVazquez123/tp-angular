import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto1 } from './punto1';

describe('Punto1', () => {
  let component: Punto1;
  let fixture: ComponentFixture<Punto1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto1],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
