import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface Teacher{
  id: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  dni: string;
  phone: string;
  email: string;
}
@Component({
  selector: 'app-dialog-teacher',
  templateUrl: './dialog-teacher.component.html',
  styleUrls: ['./dialog-teacher.component.css']
})
export class DialogTeacherComponent implements OnInit {

constructor(
  public dialogRef: MatDialogRef<DialogTeacherComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Teacher
) { }
  onNoClick():void{
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log("")
  }

}
