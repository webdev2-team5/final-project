import { TestBed } from '@angular/core/testing';

import { PosteditService } from './postedit.service';

describe('PosteditService', () => {
  let service: PosteditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosteditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
