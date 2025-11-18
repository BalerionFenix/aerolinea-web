import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionesCreateComponent } from './aviones-create.component';

describe('AvionesCreateComponent', () => {
  let component: AvionesCreateComponent;
  let fixture: ComponentFixture<AvionesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvionesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvionesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
