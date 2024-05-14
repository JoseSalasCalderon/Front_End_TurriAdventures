import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTemporadasComponent } from './crear-temporadas.component';

describe('CrearTemporadasComponent', () => {
  let component: CrearTemporadasComponent;
  let fixture: ComponentFixture<CrearTemporadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTemporadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
