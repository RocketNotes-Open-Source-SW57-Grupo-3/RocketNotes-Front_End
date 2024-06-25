import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TeacherService} from "../service/teacher.service";
import {DialogTeacherComponent} from "../dialog-teacher/dialog-teacher.component";
import {Student} from "../../student/student-list/student-list.component";
import {finalize} from "rxjs";
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
  filterValue: string = '';
  teacher: Teacher = {id: '', firstName: '', paternalLastName: '', maternalLastName: '', dni: '', phone: '', email: ''};

constructor(private apiTeacher: TeacherService, public dialog: MatDialog, private cdr: ChangeDetectorRef) { }
ngOnInit(): void {
  this.apiTeacher.get().subscribe({
    next:(response: any)=>{
      this.dataSource = response;
      this.filteredData = [...this.dataSource]; // Inicializa filteredData con todos los datos
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
  this.apiTeacher.delete(teacher.id).pipe(
    finalize(() => location.reload())
  ).subscribe({
    next: (response: any) => {
      console.log(response);
    },
    error: (error: any) => {
      console.error('Error deleting teacher:', error);
    }
  });
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
        // Recarga los datos del servidor
        this.apiTeacher.get().subscribe({
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
filteredData: Teacher[] = [];

applyFilter() {
  const filterValueLower = this.filterValue.trim().toLowerCase();
  this.filteredData = this.dataSource.filter(teacher => {
    const fullName = `${teacher.firstName} ${teacher.paternalLastName} ${teacher.maternalLastName}`.toLowerCase();
    const dniLower = teacher.dni.toLowerCase();
    return fullName.includes(filterValueLower) || dniLower.includes(filterValueLower);
  });
}

}


