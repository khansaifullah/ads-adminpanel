import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussesLocComponent } from './busses-loc.component';

describe('BussesLocComponent', () => {
  let component: BussesLocComponent;
  let fixture: ComponentFixture<BussesLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussesLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussesLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
