import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Equipment {
  id: string;
  name: string;
  quantity: bigint;
  budget: bigint;
  creation: string;
  period: string;
  state: string;
}

@Component({
  selector: 'app-equipment-edit-dialog',
  templateUrl: './equipment-edit-dialog.component.html',
  styleUrls: ['./equipment-edit-dialog.component.css']
})
export class EquipmentEditDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EquipmentEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Equipment
  ) { }

  ngOnInit(): void {
    console.log("Edito dialogo de equipo")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
