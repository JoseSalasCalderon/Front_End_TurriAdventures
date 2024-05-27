import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarImagenComponent } from './modificar-imagen.component';

describe('ModificarImagenComponent', () => {
  let component: ModificarImagenComponent;
  let fixture: ComponentFixture<ModificarImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarImagenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
