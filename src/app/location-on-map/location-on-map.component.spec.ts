import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOnMapComponent } from './location-on-map.component';

describe('LocationOnMapComponent', () => {
  let component: LocationOnMapComponent;
  let fixture: ComponentFixture<LocationOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
