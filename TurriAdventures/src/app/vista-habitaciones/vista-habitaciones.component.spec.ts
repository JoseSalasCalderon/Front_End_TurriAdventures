import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHabitacionesComponent } from './vista-habitaciones.component';

describe('VistaHabitacionesComponent', () => {
  let component: VistaHabitacionesComponent;
  let fixture: ComponentFixture<VistaHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHabitacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
