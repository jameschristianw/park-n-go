import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParkingPlacePage } from './detail-parking-place.page';

describe('DetailParkingPlacePage', () => {
  let component: DetailParkingPlacePage;
  let fixture: ComponentFixture<DetailParkingPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailParkingPlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailParkingPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
