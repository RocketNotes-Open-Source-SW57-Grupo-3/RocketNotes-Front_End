import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../service/students.service";

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
  student: Student;

  constructor(
      public dialogRef: MatDialogRef<DialogStudentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Student,
      private studentsService: StudentsService
  ) {
    this.student = {...data};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("")
  }

  onSubmit(): void {
    if (this.data.isEdit) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  }
addStudent(): void {
  this.studentsService.create(this.data).subscribe({
    next: (response: any) => {
      console.log(response);
      // Cierra el diálogo y pasa el nuevo estudiante al componente que abrió el diálogo
      this.dialogRef.close(response);
    }
  });
}
  updateStudent(): void {
    this.studentsService.update(this.student.id, this.student).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.error('Error updating student:', err);
      }
    });
  }
}
