import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AssistanceDialogComponent} from "./assistance-dialog.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl:'./classrooms-attendance.component.html',
    styleUrls:['./classrooms-attendance.component.css']
})

export class ClassroomsAttendanceComponent implements OnInit  {

    isAssistanceTaken = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        // ...
    ) {}



    ngOnInit() {
        // Recupera los datos de LocalStorage.
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            this.students = JSON.parse(storedStudents);
        } else {

        }
    }


    students = [
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'}, {date:'4.FEB.2024', status:'absent'}, ] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'}, {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'absent'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'absent'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'absent'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
        { name:'EstudianteU202218475', attendance:[{date:'30.Ene.2024', status:'present'},  {date:'4.FEB.2024', status:'present'},] },
    ];

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
            // Aquí puedes manejar lo que sucede después de que se cierra el diálogo.
        });
    }

    toggleAttendanceStatus(attendance: any): void {
        if (this.isAssistanceTaken) {
            attendance.status = attendance.status === 'present' ? 'absent' : 'present';
        }
    }

    saveAssistance(): void {
        // Guarda los datos en LocalStorage.
        localStorage.setItem('students', JSON.stringify(this.students));

        // Navega de vuelta a la vista de asistencia de aula.
        this.router.navigate(['/classrooms/courses/attendance']);
        this.isAssistanceTaken = false;
    }

    deleteAssistance(date: string): void {
        // Filtra la asistencia de cada estudiante para eliminar la entrada con la fecha dada.
        this.students.forEach(student => {
            student.attendance = student.attendance.filter(attendance => attendance.date !== date);
        });

        // Guarda los datos actualizados en LocalStorage.
        localStorage.setItem('students', JSON.stringify(this.students));
    }

}
