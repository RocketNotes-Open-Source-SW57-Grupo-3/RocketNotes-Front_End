import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {TeacherRoutingModule} from "./teacher-routing.module";



@NgModule({
  declarations: [
    TeachersComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        TeacherRoutingModule
    ]
})
export class TeacherModule { }
