import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./layout/components/app-layout/app-layout.component').then(c => c.AppLayoutComponent),
        children: [
            {
                path: '', redirectTo: '/dashboard', pathMatch: 'full'
            },
            {
                path: 'dashboard', loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'students', loadComponent: () => import('./features/students/components/students-list/students-list.component').then(c => c.StudentsListComponent)
            },
            {
                path: 'courses', loadComponent: () => import('./features/courses/components/courses-list/courses-list.component').then(c => c.CoursesListComponent)
            },
            {
                path: 'teachers', loadComponent: () => import('./features/teachers/components/teachers-list/teachers-list.component').then(c => c.TeachersListComponent)
            }
        ]
    },
];
