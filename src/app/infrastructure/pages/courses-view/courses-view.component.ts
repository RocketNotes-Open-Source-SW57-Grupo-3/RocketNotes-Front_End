import {Component, OnInit} from '@angular/core';
import {Course} from "../../model/course.entity";
import {CoursesService} from "../../services/courses.service";
import {ClassroomCreateFormComponent} from "../../components/classroom-create-form/classroom-create-form.component";
import {MatDialog} from "@angular/material/dialog";
import {CourseCreateFormComponent} from "../../components/course-create-form/course-create-form.component";

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrl: './courses-view.component.css'
})
export class CoursesViewComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['course', 'teacher', 'image_url'];

  constructor(private courseService: CoursesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => console.error(err)
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CourseCreateFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
