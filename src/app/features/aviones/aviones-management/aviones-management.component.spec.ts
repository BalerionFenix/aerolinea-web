import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionesManagementComponent } from './aviones-management.component';

describe('AvionesManagementComponent', () => {
  let component: AvionesManagementComponent;
  let fixture: ComponentFixture<AvionesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvionesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvionesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
