import { Component, inject, AfterViewInit } from '@angular/core';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';
import { CountDashboardComponent } from '../count-dashboard/count-dashboard.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { StudentStore } from '../../../students/store/student.store';
import { TeacherStore } from '../../../teachers/store/teacher.store';
import { CourseStore } from '../../../courses/store/course.store';
import { LanguageService } from '../../../../core/services/language.service';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CountDashboardComponent, BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  private studentStore = inject(StudentStore);
  private teacherStore = inject(TeacherStore);
  private courseStore = inject(CourseStore);
   t = inject(LanguageService);

  ngAfterViewInit() {

    const students = this.studentStore.students().length;
    const teachers = this.teacherStore.teachers().length;
    const courses = this.courseStore.courses().length;

    new Chart("courseChart", {
      type: 'bar',
      data: {
        labels: ['Students', 'Teachers', 'Courses'],
        datasets: [
  {
    label: 'System Statistics',
    data: [students, teachers, courses],
    backgroundColor: [
      '#3b82f6',
      '#e7cf00',
      '#ef4444'
    ],

    barThickness: 40,     
    borderRadius: 10,     
    borderSkipped: false  
  }
]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });

  }
}