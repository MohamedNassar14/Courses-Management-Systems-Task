import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TeacherService } from '../services/teacher.service';
import { Teacher, TeacherState } from '../models/teacher';

export const TeacherStore = signalStore(
  { providedIn: 'root' },

  withState<TeacherState>({
    teachers: [],
    loading: false
  }),

  withMethods((store, api = inject(TeacherService)) => ({
    
    async loadTeachers() {
      patchState(store, { loading: true });

      let result;
      const localData = localStorage.getItem('teachers');
      if (localData) {
        result = JSON.parse(localData);
      } else {
        result = await firstValueFrom(api.getTeachers());
        localStorage.setItem('teachers', JSON.stringify(result));
      }

      patchState(store, {
        teachers: result,
        loading: false
      });
    },

    addTeacher(teacher: Omit<Teacher, 'id'>) {
      const currentTeachers = store.teachers();
      const newId = currentTeachers.length > 0 
          ? Math.max(...currentTeachers.map(t => t.id)) + 1 
          : 1;

      const newTeacher: Teacher = { ...teacher, id: newId };
      const updatedTeachers = [...currentTeachers, newTeacher];
      patchState(store, { teachers: updatedTeachers });
      localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    },

    updateTeacher(teacher: Teacher) {
      const updatedTeachers = store.teachers().map(t =>
        t.id === teacher.id ? teacher : t
      );
      patchState(store, { teachers: updatedTeachers });
      localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    },

    deleteTeacher(id: number) {
      const updatedTeachers = store.teachers().filter(t => t.id !== id);
      patchState(store, { teachers: updatedTeachers });
      localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    }

  }))
);