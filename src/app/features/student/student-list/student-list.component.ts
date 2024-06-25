import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogStudentComponent} from "../dialog-student/dialog-student.component";
import {StudentsService} from "../service/students.service";
import {finalize} from "rxjs";


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
  filteredData: Student[] = [];
  student: Student = {id: '', firstName: '', paternalLastName: '', maternalLastName: '', dni: ''};

  constructor(private apiStudent: StudentsService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.apiStudent.get().subscribe({
      next: (response: any) => {
        this.dataSource = response;
        this.filteredData = [...this.dataSource];
      }
    });
  }

  onEditItem(element: Student) {
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '600px',
      data: {...element, isEdit: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onUpdateItem(student: Student): void {
    this.apiStudent.update(student.id, student).subscribe({
          next: (response: any) => {
            console.log('Update response:', response);

            // Actualiza los datos del estudiante en dataSource y filteredData
            const index = this.dataSource.findIndex(s => s.id === student.id);
            if (index !== -1) {
              this.dataSource[index] = student;
              this.filteredData = [...this.dataSource];
              this.cdr.detectChanges();
            }
          },
          error: (err) => {
            console.error('Error updating student:', err);
          }
        }
    );


  }

  onDeleteItem(student: Student): void {
    console.log('Attempting to delete student with ID:', student.id);

    this.apiStudent.delete(student.id).pipe(
        finalize(() => location.reload())
    ).subscribe({
      next: (response: any) => {
        console.log('Delete response:', response);

        // Elimina el estudiante de dataSource y filteredData
        this.dataSource = this.dataSource.filter(s => s.id !== student.id);
        this.filteredData = this.filteredData.filter(s => s.id !== student.id);

        // Indica a Angular que debe verificar los cambios en el componente
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error deleting student:', err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '600px',
      data: {
        firstName: this.student.firstName,
        paternalLastName: this.student.paternalLastName,
        maternalLastName: this.student.maternalLastName,
        dni: this.student.dni
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.firstName != null) {
        let student1: Student = {
          id: '', // Asegúrate de asignar un ID adecuado aquí
          firstName: result.firstName,
          paternalLastName: result.paternalLastName,
          maternalLastName: result.maternalLastName,
          dni: result.dni
        };
        this.apiStudent.create(student1).subscribe({
          next: (response: any) => {
            console.log(response);
            // Recarga los datos del servidor
            this.apiStudent.get().subscribe({
              next: (response: any) => {
              this.dataSource = response;
              this.filteredData = [...this.dataSource];
              this.cdr.detectChanges();
              }
            });
          }
        });
      }
    });
  }

  applyFilter() {
    const filterValueLower = this.filterValue.trim().toLowerCase();
    this.filteredData = this.dataSource.filter(student => {
      const fullName = `${student.firstName} ${student.paternalLastName} ${student.maternalLastName}`.toLowerCase();
      const dniLower = student.dni.toLowerCase();
      return fullName.includes(filterValueLower) || dniLower.includes(filterValueLower);
    });
  }
}
