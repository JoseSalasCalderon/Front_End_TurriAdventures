import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarreservaComponent } from './confirmarreserva.component';

describe('ConfirmarreservaComponent', () => {
  let component: ConfirmarreservaComponent;
  let fixture: ComponentFixture<ConfirmarreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarreservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
