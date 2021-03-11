import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserVideoComponent } from './edituser-video.component';

describe('EdituserVideoComponent', () => {
  let component: EdituserVideoComponent;
  let fixture: ComponentFixture<EdituserVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdituserVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
