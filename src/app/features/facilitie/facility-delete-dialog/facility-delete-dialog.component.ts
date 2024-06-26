import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface Facility {
  id: string;
  name: string;
  budget: bigint;
  creation: string;
  period: string;
  status: string;
}

@Component({
  selector: 'app-facility-delete-dialog',
  templateUrl: './facility-delete-dialog.component.html',
  styleUrls: ['./facility-delete-dialog.component.css']
})
export class FacilityDeleteDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<FacilityDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Facility
  ) { }

  ngOnInit(): void {
    console.log("Delete dialogo de equipo")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
