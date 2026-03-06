import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherStore } from '../../../teachers/store/teacher.store';
import { CourseStore } from '../../../courses/store/course.store';
import { StudentStore } from '../../../students/store/student.store';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-count-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './count-dashboard.component.html',
  styleUrl: './count-dashboard.component.scss'
})
export class CountDashboardComponent implements OnInit {

  private studentStore = inject(StudentStore);
  private teacherStore = inject(TeacherStore);
  private courseStore = inject(CourseStore);
  t = inject(LanguageService);
  

  ngOnInit() {

    if (!this.studentStore.students().length) {
      this.studentStore.loadStudents();
    }

    if (!this.teacherStore.teachers().length) {
      this.teacherStore.loadTeachers();
    }

    if (!this.courseStore.courses().length) {
      this.courseStore.loadCourses();
    }

  }

    stats = computed(() => [
    {
      title: this.t.translate('sidebar.Students'),
      value: this.studentStore.students().length
    },
    {
      title: this.t.translate('sidebar.Teachers'),
      value: this.teacherStore.teachers().length
    },
    {
      title: this.t.translate('sidebar.Courses'), 
      value: this.courseStore.courses().length
    }
  ]);

}