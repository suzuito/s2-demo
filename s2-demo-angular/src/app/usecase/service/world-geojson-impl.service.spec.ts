import { TestBed } from '@angular/core/testing';

import { WorldGeojsonImplService } from './world-geojson-impl.service';

describe('WorldGeojsonImplService', () => {
  let service: WorldGeojsonImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldGeojsonImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
