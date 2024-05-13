import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTipoHabitacionComponent } from './ver-tipo-habitacion.component';

describe('VerTipoHabitacionComponent', () => {
  let component: VerTipoHabitacionComponent;
  let fixture: ComponentFixture<VerTipoHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTipoHabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerTipoHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
