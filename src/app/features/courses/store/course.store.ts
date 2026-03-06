import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course, CourseState } from '../models/course';

export const CourseStore = signalStore(
  { providedIn: 'root' },

  withState<CourseState>({
    courses: [],
    loading: false
  }),

  withMethods((store, api = inject(CourseService)) => ({
    async loadCourses() {
      patchState(store, { loading: true });
      let result;
      const localData = localStorage.getItem('courses');
      if (localData) {
        result = JSON.parse(localData);
      } else {
        result = await firstValueFrom(api.getCourses());
        localStorage.setItem('courses', JSON.stringify(result));
      }
      patchState(store, { courses: result, loading: false });
    },

    addCourse(course: Omit<Course, 'id'>) {
      const current = store.courses();
      const newId = current.length > 0 ? Math.max(...current.map(c => c.id)) + 1 : 1;
      const newCourse: Course = { ...course, id: newId };
      const updated = [...current, newCourse];
      patchState(store, { courses: updated });
      localStorage.setItem('courses', JSON.stringify(updated));
    },

    updateCourse(course: Course) {
      const updated = store.courses().map(c => c.id === course.id ? course : c);
      patchState(store, { courses: updated });
      localStorage.setItem('courses', JSON.stringify(updated));
    },

    deleteCourse(id: number) {
      const updated = store.courses().filter(c => c.id !== id);
      patchState(store, { courses: updated });
      localStorage.setItem('courses', JSON.stringify(updated));
    }
  }))
);