import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssistanceDialogComponent } from "./assistance-dialog.component";
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-classrooms-attendance',
    templateUrl: './classrooms-attendance.component.html',
    styleUrls: ['./classrooms-attendance.component.css']
})
export class ClassroomsAttendanceComponent implements OnInit {
    courseId: number = 0;
    students: any[] = [];
    isAssistanceTaken = false;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private coursesService: CoursesService
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
                    attendance: []
                }));

            this.coursesService.getAttendance().subscribe(attendanceData => {
                for (let attendance of attendanceData) {
                    let student = this.students.find(student => student.studentId === attendance.studentId.StudentId);
                    if (student && this.courseId === attendance.courseId.CourseId) {
                        student.attendance.push({ date: attendance.date, status: attendance.present ? 'present' : 'absent' });
                    }
                }
            });
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AssistanceDialogComponent);

        dialogRef.componentInstance.accept.subscribe((date) => {
            this.students.forEach(student => {
                student.attendance.push({ date: date, status: 'present' });
            });
            this.isAssistanceTaken = true;
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    toggleAttendanceStatus(attendance: any): void {
        if (this.isAssistanceTaken) {
            attendance.status = attendance.status === 'present' ? 'absent' : 'present';
            console.log(attendance.status);
        }
    }

    saveAssistance(): void {
        this.students.forEach(student => {
            const latestAttendance = student.attendance[student.attendance.length - 1];
            if (latestAttendance) {
                console.log(latestAttendance.status);
                this.coursesService.saveAttendance({
                    studentId: { StudentId: student.studentId },
                    courseId: { CourseId: this.courseId },
                    date: latestAttendance.date,
                    isPresent: latestAttendance.status === 'present'

                }).subscribe(savedAttendance => {
                }, error => {
                    console.error('Error:', error);
                });
            }

            console.log(latestAttendance.status);
            console.log(latestAttendance.status);
            window.location.reload();
        });


    }

    deleteAssistance(date: string): void {
        this.students.forEach(student => {
            if (student && student.attendance) {
                student.attendance = student.attendance.filter((attendance: { date: string; }) => attendance.date !== date);
            }
        });
    }
}