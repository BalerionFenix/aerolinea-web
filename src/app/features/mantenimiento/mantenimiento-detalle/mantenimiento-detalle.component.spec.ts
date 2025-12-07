import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MantenimientoDetalleComponent } from './mantenimiento-detalle.component';

describe('MantenimientoDetalleComponent', () => {
  let component: MantenimientoDetalleComponent;
  let fixture: ComponentFixture<MantenimientoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MantenimientoDetalleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe obtener el ID desde la ruta', () => {
    expect(component.id).toBe('123');
  });

});
