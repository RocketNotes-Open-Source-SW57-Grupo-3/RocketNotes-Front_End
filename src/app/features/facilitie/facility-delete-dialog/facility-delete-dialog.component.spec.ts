import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDeleteDialogComponent } from './facility-delete-dialog.component';

describe('FacilityDeleteDialogComponent', () => {
  let component: FacilityDeleteDialogComponent;
  let fixture: ComponentFixture<FacilityDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
