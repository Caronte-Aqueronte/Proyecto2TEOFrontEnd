import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarAhorcadoComponent } from './jugar-ahorcado.component';

describe('JugarAhorcadoComponent', () => {
  let component: JugarAhorcadoComponent;
  let fixture: ComponentFixture<JugarAhorcadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugarAhorcadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugarAhorcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
