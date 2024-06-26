import { Component } from '@angular/core';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent {

  categories = [
    {
      title: 'Student Management',
      description: 'Find guides and articles on managing student information, attendance, and performance tracking.'
    },
    {
      title: 'Teacher Resources',
      description: 'Explore resources and best practices for teachers, including class management and lesson planning.'
    },
    {
      title: 'Parent Communication',
      description: 'Learn how to effectively communicate with parents and guardians, including using our messaging tools.'
    },
    {
      title: 'Administrative Tools',
      description: 'Access tutorials on administrative functions such as scheduling, billing, and school policies.'
    },
    {
      title: 'Technical Support',
      description: 'Get help with technical issues, software troubleshooting, and IT support for the school management system.'
    },
    {
      title: 'Library Management',
      description: 'Find resources on managing library systems, including cataloging and student access to materials.'
    }
  ];
}
