import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogStudentComponent} from "../dialog-student/dialog-student.component";
import {StudentsService} from "../service/students.service";

export interface Student {
  id: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  dni: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'paternalLastName', 'maternalLastName', 'dni', 'action']

  dataSource: Student[] = [];
  student: Student = {id: '', firstName: '', paternalLastName: '', maternalLastName: '', dni: ''};

  constructor( private apiStudent: StudentsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiStudent.get().subscribe({
      next:(response: any)=>{
        this.dataSource = response
        console.log(this.dataSource)
      }
    })
  }

onEditItem(student: Student): void {
  const dialogRef = this.dialog.open(DialogStudentComponent, {
    width: '600px',
    data: student  // Pasar el estudiante a editar
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.apiStudent.update(result.id, result).subscribe({
        next: (response: any) => {
          console.log(response);
          // Actualiza la lista de estudiantes después de la actualización
          const index = this.dataSource.findIndex(item => item.id === result.id);
          if (index !== -1) {
            this.dataSource[index] = result;
          }
        },
        error: (err) => {
          console.error('Error updating student:', err);
        }
      });
    }
  });
}

onDeleteItem(student: Student): void {
  this.apiStudent.delete(student.id).subscribe({
    next: (response: any) => {
      console.log(response);
      // Actualiza la lista de estudiantes después de la eliminación
      this.dataSource = this.dataSource.filter(item => item.id !== student.id);
    },
    error: (err) => {
      console.error('Error deleting student:', err);
    }
  });
}

  openDialog(){
    const dialogRef= this.dialog.open(DialogStudentComponent,{
      width: '600px',
      data:{
        firstName: this.student.firstName,
        paternalLastName: this.student.paternalLastName,
        maternalLastName: this.student.maternalLastName,
        dni: this.student.dni,
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result.firstName!=null){
        let student1 ={
          firstName: result.firstName,
          paternalLastName: result.paternalLastName,
          maternalLastName: result.maternalLastName,
          dni: result.dni,
        }
        this.apiStudent.create(student1).subscribe({
              next:(response:any)=>{
                console.log(response);
              }
            }
        )
      }
    })
  }
  applyFilter(filterValue: string) {
  this.dataSource = this.dataSource.filter(student =>
    student.firstName.toLowerCase().includes(filterValue.trim().toLowerCase())
  );
}
}
