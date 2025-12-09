import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMantenimientoCreateComponent } from './tipo-mantenimiento-create.component';

describe('TipoMantenimientoCreateComponent', () => {
  let component: TipoMantenimientoCreateComponent;
  let fixture: ComponentFixture<TipoMantenimientoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoMantenimientoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMantenimientoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
