import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalabraContainerComponent } from './palabra-container.component';

describe('PalabraContainerComponent', () => {
  let component: PalabraContainerComponent;
  let fixture: ComponentFixture<PalabraContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalabraContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalabraContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
