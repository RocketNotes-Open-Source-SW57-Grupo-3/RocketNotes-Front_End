import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(this.data.firstName, Validators.required),
      paternalLastName: new FormControl(this.data.paternalLastName, Validators.required),
      maternalLastName: new FormControl(this.data.maternalLastName, Validators.required),
      dni: new FormControl(this.data.dni, [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      phone: new FormControl(this.data.phone, [Validators.required, Validators.pattern('^[0-9]{9}$')]),      email: new FormControl(this.data.email, [Validators.required, Validators.email])
    });
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("")
  }
}