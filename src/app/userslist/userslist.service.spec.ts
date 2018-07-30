import { TestBed, inject } from '@angular/core/testing';

import { UserslistService } from './userslist.service';

describe('UserslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserslistService]
    });
  });

  it('should be created', inject([UserslistService], (service: UserslistService) => {
    expect(service).toBeTruthy();
  }));
});
