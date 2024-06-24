import { TestBed } from '@angular/core/testing';

import { UploadImagesServiceService } from './upload-images-service.service';

describe('UploadImagesServiceService', () => {
  let service: UploadImagesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadImagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
