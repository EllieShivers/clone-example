import { TestBed } from '@angular/core/testing';

import { SimpleCourseCoreService } from './simple-course-core.service';

describe('SimpleCourseCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimpleCourseCoreService = TestBed.get(SimpleCourseCoreService);
    expect(service).toBeTruthy();
  });
});
