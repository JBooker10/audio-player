import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDescriptionComponent } from './track-description.component';

describe('TrackDescriptionComponent', () => {
  let component: TrackDescriptionComponent;
  let fixture: ComponentFixture<TrackDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
