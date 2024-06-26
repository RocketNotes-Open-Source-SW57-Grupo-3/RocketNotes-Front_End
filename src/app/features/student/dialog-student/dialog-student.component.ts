import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
export interface Student{
  id: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  dni: string;
  isEdit?: boolean;
}

@Component({
  selector: 'app-dialog-student',
  templateUrl: './dialog-student.component.html',
  styleUrls: ['./dialog-student.component.css']
})

export class DialogStudentComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
      this.form = this.fb.group({
        firstName: [this.data.firstName, Validators.required],
        paternalLastName: [this.data.paternalLastName, Validators.required],
        maternalLastName: [this.data.maternalLastName, Validators.required],
        dni: [this.data.dni, [Validators.required, Validators.pattern(/^\d{8}$/)]]
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("")
  }

}