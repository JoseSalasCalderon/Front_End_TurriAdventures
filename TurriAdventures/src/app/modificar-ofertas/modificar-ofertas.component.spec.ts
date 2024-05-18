import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOfertasComponent } from './modificar-ofertas.component';

describe('ModificarOfertasComponent', () => {
  let component: ModificarOfertasComponent;
  let fixture: ComponentFixture<ModificarOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarOfertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
