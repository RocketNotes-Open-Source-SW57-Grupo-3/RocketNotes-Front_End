import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {LayoutComponent} from "../../../shared/layout/layout.component";
import {ClassroomCoursesComponent} from "./classroom-courses.component";
import { CoursesViewComponent } from '../courses-view/courses-view.component';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import {ClassroomsHomeComponent} from "../../../features/classrooms/classrooms-home/classrooms-home.component";
import {
    ClassroomsCoursesComponent
} from "../../../features/classrooms/classrooms-home/classrooms-courses/classrooms-courses.component";
import {
    ClassroomsAttendanceComponent
} from "../../../features/classrooms/classrooms-home/classrooms-courses/classrooms-attendance/classrooms-attendance.component";
import {
    ClassroomGradesComponent
} from "../../../features/classrooms/classrooms-home/classrooms-courses/classrooms-grades/classroom-grades.component";


const routes: Routes =[
    {
        path:'',
        component: LayoutComponent,
        children:[
            {path:'', component: ClassroomCoursesComponent},
            { path: '', redirectTo: '/classroom-courses', pathMatch: 'full' },
            { path: 'courses-view', component: CoursesViewComponent },
            { path: 'course-detail/:id', component: CourseDetailComponent },
        ]
    },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ClassroomCoursesRoutingModule{
}