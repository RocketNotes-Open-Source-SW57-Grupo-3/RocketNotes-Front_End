import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {GradeDialogComponent} from "./grade-dialog.component";
@Component({
    selector: 'app-root',
    templateUrl:'./classroom-grades.component.html',
    styleUrls:['./classroom-grades.component.css']
})

export class ClassroomGradesComponent  {


    isEditing = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        // ...
    ) {}


    openDialog(): void {
        const dialogRef = this.dialog.open(GradeDialogComponent);

        dialogRef.componentInstance.accept.subscribe((grades) => {
            this.students.forEach((student, index) => {
                student.grades = grades[index];
            });
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // Aquí puedes manejar lo que sucede después de que se cierra el diálogo.
        });
    }


    students = [
        { name:'EstudianteU202218475', grades: [20, 15, 18], average: 0, state: '' },
        { name:'EstudianteU202218476', grades: [10, 10, 16], average: 0, state: '' },
        { name:'EstudianteU202218477', grades: [11, 14, 13], average: 0, state: '' },
        // ...
    ];

    calculateAverage(grades: number[]): number {
        const sum = grades.reduce((a, b) => a + b, 0);
        return sum / grades.length;
    }


    ngOnInit() {
        this.students.forEach(student => {
            student.average = this.calculateAverage(student.grades);
            student.state = student.average >= 12.5 ? 'green' : 'red';
        });
    }



}
