import { TestBed } from '@angular/core/testing';

import { KeyHandle } from './key-handle';

describe('KeyHandle', () => {
  //Arrangement
  let service: KeyHandle;

  //Action

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyHandle);
  });

  //Assertion

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
