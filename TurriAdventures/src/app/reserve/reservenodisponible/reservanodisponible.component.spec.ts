import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservanodisponibleComponent } from './reservanodisponible.component';

describe('ReservanodisponibleComponent', () => {
  let component: ReservanodisponibleComponent;
  let fixture: ComponentFixture<ReservanodisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservanodisponibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservanodisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
