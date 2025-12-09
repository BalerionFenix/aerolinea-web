import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MantenimientoManagementComponent
} from './mantenimiento-management.component';

describe('MantenimientoManagementComponent', () => {
  let component: MantenimientoManagementComponent;
  let fixture: ComponentFixture<MantenimientoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoManagementComponent] // porque es standalone
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
