import { TestBed } from '@angular/core/testing';

import { EmloyeeInformationService } from './emloyee-information.service';

describe('EmloyeeInformationService', () => {
  let service: EmloyeeInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmloyeeInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
