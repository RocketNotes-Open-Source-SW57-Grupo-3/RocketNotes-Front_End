import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TeacherService} from "../service/teacher.service";
import {DialogTeacherComponent} from "../dialog-teacher/dialog-teacher.component";
export interface Teacher {
  id: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  dni: string;
  phone: string;
  email: string;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'paternalLastName', 'maternalLastName', 'dni', 'phone', 'email', 'action'];
  dataSource: Teacher[] = [];
  teacher: Teacher = {id: '', firstName: '', paternalLastName: '', maternalLastName: '', dni: '', phone: '', email: ''};

  constructor( private apiTeacher: TeacherService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiTeacher.get().subscribe({
      next:(response: any)=>{
        this.dataSource = response;
        console.log(this.dataSource);
      }
    });
  }

onEditItem(element: Teacher) {
  const dialogRef = this.dialog.open(DialogTeacherComponent, {
    width: '600px',
    data: element
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
  onDeleteItem(teacher: Teacher): void {
    // Implementa la lógica de eliminación aquí
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTeacherComponent, {
      width: '600px',
      data: {
        firstName: this.teacher.firstName,
        paternalLastName: this.teacher.paternalLastName,
        maternalLastName: this.teacher.maternalLastName,
        dni: this.teacher.dni,
        phone: this.teacher.phone,
        email: this.teacher.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.firstName != null) {
        let teacher1: Teacher = {
          id: '', // Asegúrate de asignar un ID adecuado aquí
          firstName: result.firstName,
          paternalLastName: result.paternalLastName,
          maternalLastName: result.maternalLastName,
          dni: result.dni,
          phone: result.phone,
          email: result.email
        };
        this.apiTeacher.create(teacher1).subscribe({
          next: (response: any) => {
            console.log(response);
          }
        });
      }
    });
  }
}
