import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';

@Component({
    selector: 'app-classrooms-course',
    templateUrl: './classrooms-courses.component.html',
    styleUrls: ['./classrooms-courses.component.css']
})
export class ClassroomsCoursesComponent implements OnInit, AfterViewInit{
    classroomId: number = 0;
    courses: any[] = [];

    constructor(private route: ActivatedRoute,private notificationService: NotificationService,
                private titleService: Title,
                private logger: NGXLogger, private router: Router,
                private coursesService: CoursesService) {
    }

    viewAttendance(courseId: number) {
        this.router.navigate(['attendance', courseId], { relativeTo: this.route });
    }

    viewGrades(courseId: number) {
        this.router.navigate(['grades',courseId], { relativeTo: this.route });
        this.logger.log('Dashboard loaded');
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.classroomId = +id;
        }
        this.titleService.setTitle('angular-material-template - Dashboard');
        this.logger.log('Dashboard loaded');

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.coursesService.getCourses().subscribe(courses => {
                this.courses = courses.filter((course: { roomId: number; }) => course.roomId === this.classroomId);
            });
            this.logger.log('Dashboard loaded');
        });
    }

}