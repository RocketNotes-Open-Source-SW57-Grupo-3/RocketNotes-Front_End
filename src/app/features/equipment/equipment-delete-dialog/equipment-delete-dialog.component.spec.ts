import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDeleteDialogComponent } from './equipment-delete-dialog.component';

describe('EquipmentDeleteDialogComponent', () => {
  let component: EquipmentDeleteDialogComponent;
  let fixture: ComponentFixture<EquipmentDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
