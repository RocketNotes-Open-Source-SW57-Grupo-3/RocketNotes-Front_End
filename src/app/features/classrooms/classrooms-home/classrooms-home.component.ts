import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ClassroomsService } from "./classrooms.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-classrooms-home',
  templateUrl: './classrooms-home.component.html',
  styleUrls: ['./classrooms-home.component.css']
})
export class ClassroomsHomeComponent implements OnInit, AfterViewInit{
  currentUser: any;
  classrooms: any[]= [];

  constructor(private notificationService: NotificationService,
              private authService: AuthenticationService,
              private titleService: Title,
              private logger: NGXLogger,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private classroomsService: ClassroomsService) {
  }

  viewCourse(id: number) {
    this.router.navigate(['/classrooms/courses', id]);
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.classroomsService.getClassrooms().subscribe(classrooms => {
        this.classrooms = classrooms;
      });
      this.logger.log('Dashboard loaded');
    });
  }


}