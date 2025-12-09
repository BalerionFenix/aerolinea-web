import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMantenimientoDetalleComponent } from './tipo-mantenimiento-detalle.component';

describe('TipoMantenimientoDetalleComponent', () => {
  let component: TipoMantenimientoDetalleComponent;
  let fixture: ComponentFixture<TipoMantenimientoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoMantenimientoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMantenimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
