import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenaPalabraPageComponent } from './ordena-palabra-page.component';

describe('OrdenaPalabraPageComponent', () => {
  let component: OrdenaPalabraPageComponent;
  let fixture: ComponentFixture<OrdenaPalabraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenaPalabraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenaPalabraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
