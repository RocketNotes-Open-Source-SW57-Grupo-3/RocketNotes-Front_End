import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Equipment {
  id: string;
  name: string;
  quantity: bigint;
  budget: bigint;
  creation: string;
  period: string;
  status: string;
}

@Component({
  selector: 'app-equipment-delete-dialog',
  templateUrl: './equipment-delete-dialog.component.html',
  styleUrls: ['./equipment-delete-dialog.component.css']
})
export class EquipmentDeleteDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EquipmentDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Equipment
  ) { }

  ngOnInit(): void {
    console.log("Delete dialogo de equipo")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
