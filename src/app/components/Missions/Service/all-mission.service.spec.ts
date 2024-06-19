import { TestBed } from '@angular/core/testing';

import { AllMissionService } from './all-mission.service';

describe('AllMissionService', () => {
  let service: AllMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
