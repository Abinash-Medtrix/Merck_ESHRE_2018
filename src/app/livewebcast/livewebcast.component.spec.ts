import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivewebcastComponent } from './livewebcast.component';

describe('LivewebcastComponent', () => {
  let component: LivewebcastComponent;
  let fixture: ComponentFixture<LivewebcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivewebcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivewebcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
