import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMantenimientoManagementComponent } from './tipo-mantenimiento-management.component';

describe('TipoMantenimientoManagementComponent', () => {
  let component: TipoMantenimientoManagementComponent;
  let fixture: ComponentFixture<TipoMantenimientoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoMantenimientoManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMantenimientoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
