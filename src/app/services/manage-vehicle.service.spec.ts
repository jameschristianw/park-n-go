import { TestBed } from '@angular/core/testing';

import { ManageVehicleService } from './manage-vehicle.service';

describe('ManageVehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageVehicleService = TestBed.get(ManageVehicleService);
    expect(service).toBeTruthy();
  });
});
