import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulacionEditComponent } from './tripulacion-edit.component';

describe('TripulacionEditComponent', () => {
  let component: TripulacionEditComponent;
  let fixture: ComponentFixture<TripulacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripulacionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripulacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
