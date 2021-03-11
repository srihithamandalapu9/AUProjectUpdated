import { TestBed } from '@angular/core/testing';

import { GetReportedService } from './get-reported.service';

describe('GetReportedService', () => {
  let service: GetReportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
