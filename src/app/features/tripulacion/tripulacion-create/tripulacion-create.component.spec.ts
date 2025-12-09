import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulacionCreateComponent } from './tripulacion-create.component';

describe('TripulacionCreateComponent', () => {
  let component: TripulacionCreateComponent;
  let fixture: ComponentFixture<TripulacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripulacionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripulacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
