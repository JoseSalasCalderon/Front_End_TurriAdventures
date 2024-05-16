import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTemporadasComponent } from './listar-temporadas.component';

describe('ListarTemporadasComponent', () => {
  let component: ListarTemporadasComponent;
  let fixture: ComponentFixture<ListarTemporadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTemporadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
