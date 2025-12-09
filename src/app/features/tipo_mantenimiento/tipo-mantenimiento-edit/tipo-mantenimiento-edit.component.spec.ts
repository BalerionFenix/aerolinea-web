import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMantenimientoEditComponent } from './tipo-mantenimiento-edit.component';

describe('TipoMantenimientoEditComponent', () => {
  let component: TipoMantenimientoEditComponent;
  let fixture: ComponentFixture<TipoMantenimientoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoMantenimientoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMantenimientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
