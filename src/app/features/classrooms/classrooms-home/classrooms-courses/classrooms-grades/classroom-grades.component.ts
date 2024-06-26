import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GradeDialogComponent } from "./grade-dialog.component";
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
@Component({
    selector: 'app-root',
    templateUrl:'./classroom-grades.component.html',
    styleUrls:['./classroom-grades.component.css']
})
export class ClassroomGradesComponent implements OnInit {
    courseId: number = 0;
    students: any[] = [];
    isEditing = false;
    isAddingGrade = false;

    constructor(
        public dialog: MatDialog,
        private location: Location,
        private coursesService: CoursesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                if (id !== null) {
                    this.courseId = +id;
                }
                return this.coursesService.getStudents();
            })
        ).subscribe(students => {
            this.students = students.filter((student: { classrooms: number[]; }) => student.classrooms.includes(this.courseId))
                .map((student: { id: any; firstName: any; paternalLastName: any; maternalLastName: any; }) => ({
                    studentId: student.id,
                    name: `${student.firstName} ${student.paternalLastName} ${student.maternalLastName}`,
                    grades: [],
                    average: 0,
                    state: '',
                    newGrade: null
                }));

            this.coursesService.getGrades().subscribe(gradesData => {
                for (let grade of gradesData) {
                    let student = this.students.find(student => student.studentId === grade.studentId.StudentId);
                    if (student && this.courseId === grade.courseId.CourseId && grade.grade !== undefined) {
                        student.grades.push(grade.grade); // Empuja solo el valor de 'grade.grade'
                        student.average = this.calculateAverage(student.grades); // Calcula el promedio basado en la lista de calificaciones
                        student.state = student.average >= 12.5 ? 'green' : 'red';
                    }
                }
            });
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(GradeDialogComponent);

        dialogRef.componentInstance.accept.subscribe(() => {
            this.isAddingGrade = true;
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    saveGrades(): void {
        this.students.forEach(student => {
            if (student.newGrade !== null && student.newGrade >= 0 && student.newGrade <= 20) {
                const grade = student.newGrade;

                this.coursesService.saveGrade({
                    studentId: { StudentId: student.studentId },
                    courseId: { CourseId: this.courseId },
                    grade: grade
                }).subscribe(savedGrade => {


                    student.grades.push(savedGrade);
                    student.average = this.calculateAverage(student.grades);
                    student.state = student.average >= 12.5 ? 'green' : 'red';
                    student.newGrade = null; // Resetea el campo de nueva calificación
                });
            }

            window.location.reload();
        });
    }

    calculateAverage(grades: number[]): number {
        const sum = grades.reduce((a, b) => a + b, 0);
        return sum / grades.length;
    }

    isValidGrade(): boolean {
        return this.students.every(student => student.newGrade !== null && student.newGrade >= 0 && student.newGrade <= 20);
    }
}