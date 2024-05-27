import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadCRUDComponent } from './publicidad-crud.component';

describe('PublicidadCRUDComponent', () => {
  let component: PublicidadCRUDComponent;
  let fixture: ComponentFixture<PublicidadCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicidadCRUDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicidadCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
