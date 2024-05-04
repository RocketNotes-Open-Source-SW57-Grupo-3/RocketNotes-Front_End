import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,

  //templateUrl: './app.component.html', ENTODO INFRASTRUCTURE LO USE PARA MOSTRARLO EN LA PANTALLA
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  options=[
    {path:'/capacity', title: 'classrooms-capacity'},
    {path:'/students', title: 'Students'},
    {path:'/classrooms', title: 'classrooms'},
    {path:'/courses', title: 'Courses'}
  ]
}
