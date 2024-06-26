import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityEditDialogComponent } from './facility-edit-dialog.component';

describe('FacilityEditDialogComponent', () => {
  let component: FacilityEditDialogComponent;
  let fixture: ComponentFixture<FacilityEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
