import { TestBed } from '@angular/core/testing';

import { CategoryPassingService } from './category-passing.service';

describe('CategoryPassingService', () => {
  let service: CategoryPassingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryPassingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
