import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { TrackUtilsComponent } from './track-utils.component';

describe('TrackUtilsComponent', () => {
  let component: TrackUtilsComponent;
  let fixture: ComponentFixture<TrackUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
