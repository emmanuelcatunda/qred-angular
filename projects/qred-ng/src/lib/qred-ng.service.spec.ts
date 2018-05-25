import { TestBed, inject } from '@angular/core/testing';

import { QredNgService } from './qred-ng.service';

describe('QredNgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QredNgService]
    });
  });

  it('should be created', inject([QredNgService], (service: QredNgService) => {
    expect(service).toBeTruthy();
  }));
});
