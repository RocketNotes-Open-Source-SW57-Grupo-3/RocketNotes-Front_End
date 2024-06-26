import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface Facility {
  id: string;
  name: string;
  budget: bigint;
  creation: string;
  period: string;
  state: string;
}

@Component({
  selector: 'app-facility-edit-dialog',
  templateUrl: './facility-edit-dialog.component.html',
  styleUrls: ['./facility-edit-dialog.component.css']
})
export class FacilityEditDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<FacilityEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Facility
  ) { }

  ngOnInit(): void {
    console.log("Edito dialogo de equipo")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
