import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFacilidadesComponent } from './crud-facilidades.component';

describe('CrudFacilidadesComponent', () => {
  let component: CrudFacilidadesComponent;
  let fixture: ComponentFixture<CrudFacilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudFacilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudFacilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
