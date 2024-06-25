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
  filterValue: string = '';
  dataSource: Student[] = [];
  student: Student = {id: '', firstName: '', paternalLastName: '', maternalLastName: '', dni: ''};

  constructor( private apiStudent: StudentsService, public dialog: MatDialog) { }

ngOnInit(): void {
  this.apiStudent.get().subscribe({
    next:(response: any)=>{
      this.dataSource = response;
      this.filteredData = [...this.dataSource];
      console.log(this.dataSource);
    }
  });
}

onEditItem(element: Student) {
  const dialogRef = this.dialog.open(DialogStudentComponent, {
    width: '600px',
    data: { ...element, isEdit: true }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
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
  const dialogRef = this.dialog.open(DialogStudentComponent, {
    width: '600px',
    data: { ...this.student, isEdit: false }
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
filteredData: Student[] = [];

applyFilter() {
  const filterValueLower = this.filterValue.trim().toLowerCase();
  this.filteredData = this.dataSource.filter(student => {
    const fullName = `${student.firstName} ${student.paternalLastName} ${student.maternalLastName}`.toLowerCase();
    const dniLower = student.dni.toLowerCase();
    return fullName.includes(filterValueLower) || dniLower.includes(filterValueLower);
  });
}
}

