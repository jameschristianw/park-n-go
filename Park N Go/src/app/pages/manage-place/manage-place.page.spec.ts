import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlacePage } from './manage-place.page';

describe('ManagePlacePage', () => {
  let component: ManagePlacePage;
  let fixture: ComponentFixture<ManagePlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
