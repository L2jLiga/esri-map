import { TestBed, inject } from '@angular/core/testing';

import { NgEsriMapService } from './ng-esri-map.service';

describe('NgEsriMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgEsriMapService]
    });
  });

  it('should be created', inject([NgEsriMapService], (service: NgEsriMapService) => {
    expect(service).toBeTruthy();
  }));
});
