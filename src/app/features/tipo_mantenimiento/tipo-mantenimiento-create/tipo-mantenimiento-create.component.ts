import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TipoMantenimientoService} from '../../../core/services/tipo-mantenimiento.service';
import {
  TipoMantenimiento,
  TipoMantenimientoCreateDTO, TipoMantenimientoDTO
} from '../../../core/models/mantenimiento/tipo-mantenimiento.models';
import {Mantenimiento} from '../../../core/models/mantenimiento/mantenimiento.models';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-tipo-mantenimiento-create',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './tipo-mantenimiento-create.component.html',
  styleUrl: './tipo-mantenimiento-create.component.css'
})
export class TipoMantenimientoCreateComponent {

  tipoMantenimientoForm!: FormGroup;
  enviando: boolean = false;
  errorMensaje: string = '';

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private tipoMantenimientoService: TipoMantenimientoService
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.tipoMantenimientoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      duracion_estimada: ['', [Validators.required, Validators.min(0.5), Validators.max(1000)]],
      frecuencia: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      estado: [true, [Validators.required]]
    });
  }

  // Getters para validación
  get nombre() { return this.tipoMantenimientoForm.get('nombre'); }
  get descripcion() { return this.tipoMantenimientoForm.get('descripcion'); }
  get duracion_estimada() { return this.tipoMantenimientoForm.get('duracion_estimada'); }
  get frecuencia() { return this.tipoMantenimientoForm.get('frecuencia'); }
  get estado() { return this.tipoMantenimientoForm.get('estado'); }

  // Mensajes de error
  getMensajeError(campo: string): string {
    const control = this.tipoMantenimientoForm.get(campo);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `Este campo es obligatorio.`;
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${minLength} caracteres.`;
    }

    if (control.errors['maxlength']) {
      const maxLength = control.errors['maxlength'].requiredLength;
      return `No puede exceder ${maxLength} caracteres.`;
    }

    if (control.errors['min']) {
      const min = control.errors['min'].min;
      return `El valor mínimo es ${min}.`;
    }

    if (control.errors['max']) {
      const max = control.errors['max'].max;
      return `El valor máximo es ${max}.`;
    }

    return '';
  }

  mostrarError(campo: string): boolean {
    const control = this.tipoMantenimientoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    // Marcar todos los campos como tocados para mostrar errores
    Object.keys(this.tipoMantenimientoForm.controls).forEach(key => {
      this.tipoMantenimientoForm.get(key)?.markAsTouched();
    });

    if (this.tipoMantenimientoForm.invalid) {
      this.errorMensaje = 'Por favor, corrija los errores en el formulario.';
      return;
    }

    this.enviando = true;
    this.errorMensaje = '';

    const formValue = this.tipoMantenimientoForm.value;

    // Convertir el estado de string a boolean si es necesario
    const nuevoTipo: TipoMantenimientoCreateDTO = {
      nombre: formValue.nombre.trim(),
      descripcion: formValue.descripcion.trim(),
      duracion_estimada: Number(formValue.duracion_estimada),
      frecuencia: Number(formValue.frecuencia),
      estado: formValue.estado === true || formValue.estado === 'true' || formValue.estado === 'Activo'
    };

    this.tipoMantenimientoService.create(nuevoTipo).subscribe({
      next: (response) => {
        console.log('Tipo de mantenimiento creado:', response);
        alert('Tipo de mantenimiento creado exitosamente');
        this.router.navigate(['/dashboard/tipo_mantenimiento']);
      },
      error: (error) => {
        console.error('Error creando tipo de mantenimiento:', error);
        this.errorMensaje = error.error?.message || 'Error al crear el tipo de mantenimiento. Por favor, intente nuevamente.';
        this.enviando = false;
      }
    });
  }

  cancelar(): void {
    if (this.tipoMantenimientoForm.dirty) {
      if (confirm('¿Está seguro de que desea cancelar? Los cambios no guardados se perderán.')) {
        this.router.navigate(['/dashboard/tipo_mantenimiento']);
      }
    } else {
      this.router.navigate(['/dashboard/tipo_mantenimiento']);
    }
  }


}
