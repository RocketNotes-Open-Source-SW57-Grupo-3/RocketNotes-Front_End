import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesDialogComponent } from './facilities-dialog.component';

describe('FacilitiesDialogComponent', () => {
  let component: FacilitiesDialogComponent;
  let fixture: ComponentFixture<FacilitiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
