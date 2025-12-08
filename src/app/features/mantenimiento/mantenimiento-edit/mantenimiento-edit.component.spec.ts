import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MantenimientoEditComponent } from './mantenimiento-edit.component';

describe('MantenimientoEditComponent', () => {
  let component: MantenimientoEditComponent;
  let fixture: ComponentFixture<MantenimientoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe crear el formulario con los controles necesarios', () => {
    expect(component.form.contains('nombre')).toBeTrue();
    expect(component.form.contains('descripcion')).toBeTrue();
    expect(component.form.contains('fecha')).toBeTrue();
    expect(component.form.contains('estado')).toBeTrue();
  });

  it('Formulario inválido si los campos requeridos están vacíos', () => {
    component.form.setValue({
      nombre: '',
      descripcion: '',
      fecha: '',
      estado: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

});
