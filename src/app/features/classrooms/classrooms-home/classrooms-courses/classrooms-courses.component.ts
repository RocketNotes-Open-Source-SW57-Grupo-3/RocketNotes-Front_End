import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-classrooms-course',
    templateUrl: './classrooms-courses.component.html',
    styleUrls: ['./classrooms-courses.component.css']
})
export class ClassroomsCoursesComponent implements OnInit {
    currentUser: any;

    constructor(private notificationService: NotificationService,
                private authService: AuthenticationService,
                private titleService: Title,
                private logger: NGXLogger, private router: Router) {
    }

    viewAttendance() {
        this.router.navigate(['/classrooms/courses/attendance']);
    }

    viewGrades() {
        this.router.navigate(['/classrooms/courses/grades']);
    }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.titleService.setTitle('angular-material-template - Dashboard');
        this.logger.log('Dashboard loaded');

        setTimeout(() => {
            this.notificationService.openSnackBar('Welcome!');
        });
    }
}
