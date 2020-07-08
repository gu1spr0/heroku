import { TestBed } from '@angular/core/testing';

import { DispositivoService } from './dispositivo.service';

describe('DispositivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispositivoService = TestBed.get(DispositivoService);
    expect(service).toBeTruthy();
  });
});
