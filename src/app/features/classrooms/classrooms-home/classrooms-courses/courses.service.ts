// src/app/features/classrooms/classrooms-home/classrooms-courses/courses.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private coursesUrl = 'https://rocketnotes.up.railway.app/api/v1/courses';
    private attendanceUrl = 'https://rocketnotes.up.railway.app/api/v1/Attendance/1/1';
    private gradesUrl = 'https://rocketnotes.up.railway.app/api/v1/Grade/1/1';
    private studentsUrl = 'https://rocketnotes.up.railway.app/api/v1/students';

    constructor(private http: HttpClient) { }

    getCourses(): Observable<any> {
        return this.http.get(this.coursesUrl);
    }

    getCourse(courseId: number): Observable<any> {
        return this.http.get(`${this.coursesUrl}/${courseId}`);
    }
    getStudents(): Observable<any> {
        return this.http.get(this.studentsUrl);
    }
    getAttendance(): Observable<any> {
        return this.http.get(`${this.attendanceUrl}`);
    }

    saveAttendance(attendance: any): Observable<any> {
        return this.http.post('https://rocketnotes.up.railway.app/api/v1/Attendance', attendance);
    }

    getGrades(): Observable<any> {
        return this.http.get(`${this.gradesUrl}`);
    }

    saveGrade(grade: any): Observable<any> {
        return this.http.post('https://rocketnotes.up.railway.app/api/v1/Grade', grade);
    }
}