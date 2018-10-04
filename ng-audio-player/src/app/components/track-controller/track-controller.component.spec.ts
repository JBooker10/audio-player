import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackControllerComponent } from './track-controller.component';

describe('TrackControllerComponent', () => {
  let component: TrackControllerComponent;
  let fixture: ComponentFixture<TrackControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
