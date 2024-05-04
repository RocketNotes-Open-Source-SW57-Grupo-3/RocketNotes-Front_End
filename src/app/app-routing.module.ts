import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'classrooms',
    loadChildren: () => import('./features/classrooms/classrooms.module').then(m => m.ClassroomsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'teachers',
    loadChildren:() => import('./features/teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [AuthGuard]

  },
  {
    path:'students',
    loadChildren:() => import('./features/student/student.module').then(m=>m.StudentModule),
    canActivate:[AuthGuard]
  },
  {
    path:'facilities-list',
    loadChildren: ()=> import('./features/facilitie/facilitie.module').then(m=>m.FacilitieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipment-list',
    loadChildren: () => import('./features/equipment/equipment.module').then(m => m.EquipmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./features/maintenance/facilities.module').then(m => m.FacilitiesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'typography',
    loadChildren: () => import('./features/typography/typography.module').then(m => m.TypographyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'classrooms',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
