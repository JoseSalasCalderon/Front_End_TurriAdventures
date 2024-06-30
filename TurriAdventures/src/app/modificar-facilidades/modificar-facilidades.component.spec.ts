import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFacilidadesComponent } from './modificar-facilidades.component';

describe('ModificarFacilidadesComponent', () => {
  let component: ModificarFacilidadesComponent;
  let fixture: ComponentFixture<ModificarFacilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarFacilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarFacilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
