import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstadoHotelComponent } from './ver-estado-hotel.component';

describe('VerEstadoHotelComponent', () => {
  let component: VerEstadoHotelComponent;
  let fixture: ComponentFixture<VerEstadoHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEstadoHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerEstadoHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
