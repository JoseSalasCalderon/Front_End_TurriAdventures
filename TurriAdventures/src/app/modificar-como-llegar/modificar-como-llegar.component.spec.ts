import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarComoLlegarComponent } from './modificar-como-llegar.component';

describe('ModificarComoLlegarComponent', () => {
  let component: ModificarComoLlegarComponent;
  let fixture: ComponentFixture<ModificarComoLlegarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarComoLlegarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarComoLlegarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
