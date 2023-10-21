import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSessionDialogComponent } from './live-session-dialog.component';

describe('LiveSessionDialogComponent', () => {
  let component: LiveSessionDialogComponent;
  let fixture: ComponentFixture<LiveSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveSessionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
