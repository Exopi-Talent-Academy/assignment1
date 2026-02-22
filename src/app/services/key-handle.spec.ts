import { TestBed } from '@angular/core/testing';

import { KeyHandle } from './key-handle';

describe('KeyHandle', () => {
  let service: KeyHandle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyHandle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
