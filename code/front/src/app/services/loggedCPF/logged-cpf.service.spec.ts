import { TestBed } from '@angular/core/testing';

import { LoggedCPFService } from './logged-cpf.service';

describe('LoggedCPFService', () => {
  let service: LoggedCPFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedCPFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
