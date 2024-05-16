import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTemporadasComponent } from './modificar-temporadas.component';

describe('ModificarTemporadasComponent', () => {
  let component: ModificarTemporadasComponent;
  let fixture: ComponentFixture<ModificarTemporadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarTemporadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarTemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
