import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleTipoMantenimientoComponent } from './mantenimiento-management.component';

describe('DetalleTipoMantenimientoComponent', () => {
  let component: DetalleTipoMantenimientoComponent;
  let fixture: ComponentFixture<DetalleTipoMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTipoMantenimientoComponent] // porque es standalone
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleTipoMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
