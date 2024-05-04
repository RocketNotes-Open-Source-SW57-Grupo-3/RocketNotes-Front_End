import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../model/classroom.entity";
import {ClassroomsService} from "../../services/classrooms.service";

@Component({
  selector: 'app-classroom-courses',
  templateUrl: './classroom-courses.component.html',

  styleUrls: ['./classroom-courses.component.css']

})
export class ClassroomCoursesComponent implements OnInit {
  classrooms: Classroom[] = [];
  displayedColumns: string[] = ['id', 'section', 'classroom', 'enrolled_students', 'addStudent'];

  constructor(private classroomService: ClassroomsService) {}

  ngOnInit() {
    this.classroomService.get().subscribe({
      next: (data: any  ) => {

        this.classrooms = data;
      },
      error: (err) => console.error(err)
    });
  }


}
