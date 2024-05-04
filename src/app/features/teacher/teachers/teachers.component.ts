import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../student/service/students.service";
import {MatDialog} from "@angular/material/dialog";
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



}
