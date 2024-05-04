import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../student/service/students.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogStudentComponent} from "../../student/dialog-student/dialog-student.component";
export interface Student {
  studentId: string;
  name: string;
  studentCode: string;
  status: string;
  paternal: string;
  maternal: string;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {


  displayedColumns: string[] = ['equipmentId','name','studentCode','status','action']

  dataSource: Student[] = [];
  student: any={}
  constructor( private apiStudent: StudentsService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.apiStudent.get().subscribe({
      next:(response: any)=>{
        this.dataSource = response
        console.log(this.dataSource)
      }
    })
  }
  onEditItem(object: any){
  }
  onDeleteItem(object: any){

  }
  openDialog(){
    const dialogRef= this.dialog.open(DialogStudentComponent,{
      width: '600px',
      data:{
        name:this.student.name,
        studentCode: this.student.studentCode,
        status : 'Enrolled',

      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('The dialog was closed');
      let student1 ={
        name:result.name+" "+result.maternal+" "+result.paternal,
        studentCode:result.studentCode,
        enrollmentStatus: "Enrolled",
      }
      console.log(student1)
      this.apiStudent.create(student1).subscribe({
            next:(response:any)=>{
              console.log(response);
            }
          }
      )
    })
  }


}
