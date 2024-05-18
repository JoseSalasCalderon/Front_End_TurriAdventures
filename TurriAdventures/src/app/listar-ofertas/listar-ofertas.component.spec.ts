import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOfertasComponent } from './listar-ofertas.component';

describe('ListarOfertasComponent', () => {
  let component: ListarOfertasComponent;
  let fixture: ComponentFixture<ListarOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarOfertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
