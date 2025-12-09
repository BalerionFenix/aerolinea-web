import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MantenimientoCrearComponent } from './mantenimiento-crear.component';

describe('MantenimientoCrearComponent', () => {
  let component: MantenimientoCrearComponent;
  let fixture: ComponentFixture<MantenimientoCrearComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoCrearComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe estar creado correctamente', () => {
    expect(component.form.contains('nombre')).toBeTrue();
    expect(component.form.contains('descripcion')).toBeTrue();
    expect(component.form.contains('duracion')).toBeTrue();
    expect(component.form.contains('frecuencia')).toBeTrue();
    expect(component.form.contains('estado')).toBeTrue();
  });

  it('El formulario debe ser inválido si está vacío', () => {
    component.form.setValue({
      nombre: '',
      descripcion: '',
      duracion: '',
      frecuencia: '',
      estado: ''
    });

    expect(component.form.invalid).toBeTrue();
  });

  it('Debe navegar al cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard/mantenimiento']);
  });
});
