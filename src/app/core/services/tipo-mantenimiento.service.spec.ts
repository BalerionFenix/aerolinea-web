import { TestBed } from '@angular/core/testing';

import { TipoMantenimientoService } from './tipo-mantenimiento.service';

describe('TipoMantenimientoService', () => {
  let service: TipoMantenimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMantenimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
