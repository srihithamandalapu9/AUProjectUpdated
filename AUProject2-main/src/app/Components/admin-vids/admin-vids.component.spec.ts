import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVidsComponent } from './admin-vids.component';

describe('AdminVidsComponent', () => {
  let component: AdminVidsComponent;
  let fixture: ComponentFixture<AdminVidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
