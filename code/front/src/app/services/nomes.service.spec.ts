import { TestBed } from '@angular/core/testing';

import { NomesService } from './nomes.service';

describe('NomesService', () => {
  let service: NomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
