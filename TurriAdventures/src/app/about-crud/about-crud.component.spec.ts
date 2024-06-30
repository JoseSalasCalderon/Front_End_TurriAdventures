import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCrudComponent } from './about-crud.component';

describe('AboutCrudComponent', () => {
  let component: AboutCrudComponent;
  let fixture: ComponentFixture<AboutCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
