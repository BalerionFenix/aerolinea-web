import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionesEditComponent } from './aviones-edit.component';

describe('AvionesEditComponent', () => {
  let component: AvionesEditComponent;
  let fixture: ComponentFixture<AvionesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvionesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
