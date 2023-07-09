import { TestBed } from '@angular/core/testing';

import { HideOrShowPasswortInInputServiceService } from './hide-or-show-passwort-in-input-service.service';

describe('HideOrShowPasswortInInputServiceService', () => {
  let service: HideOrShowPasswortInInputServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideOrShowPasswortInInputServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
