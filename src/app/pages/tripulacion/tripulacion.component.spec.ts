import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulacionComponent } from './tripulacion.component';

describe('TripulacionComponent', () => {
  let component: TripulacionComponent;
  let fixture: ComponentFixture<TripulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
