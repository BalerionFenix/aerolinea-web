import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEditarComponent } from './mantenimiento-editar.component';

describe('MantenimientoEditarComponent', () => {
  let component: MantenimientoEditarComponent;
  let fixture: ComponentFixture<MantenimientoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
