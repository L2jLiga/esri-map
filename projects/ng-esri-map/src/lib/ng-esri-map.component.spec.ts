import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgEsriMapComponent } from './ng-esri-map.component';

describe('NgEsriMapComponent', () => {
  let component: NgEsriMapComponent;
  let fixture: ComponentFixture<NgEsriMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgEsriMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgEsriMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
