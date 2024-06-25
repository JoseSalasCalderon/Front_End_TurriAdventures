import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarContactComponent } from './modificar-contact.component';

describe('ModificarContactComponent', () => {
  let component: ModificarContactComponent;
  let fixture: ComponentFixture<ModificarContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
