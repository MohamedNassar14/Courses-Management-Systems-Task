import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StudentService } from '../services/student.service';
import { Student, StudentState } from '../models/student';

export const StudentStore = signalStore(
  { providedIn: 'root' },

  withState<StudentState>({
    students: [],
    loading: false
  }),

  withMethods((store, api = inject(StudentService)) => ({

    async loadStudents() {
      patchState(store, { loading: true });

      let result;
      const localData = localStorage.getItem('students');
      if (localData) {
        result = JSON.parse(localData);
      } else {
        result = await firstValueFrom(api.getStudents());
        localStorage.setItem('students', JSON.stringify(result));
      }

      patchState(store, {
        students: result,
        loading: false
      });
    },

    addStudent(student: Omit<Student, 'id'>) {
      const currentStudents = store.students();
      const newId = currentStudents.length > 0 
          ? Math.max(...currentStudents.map(s => Number(s.id))) + 1 
          : 1;

      const newStudent: Student = { ...student, id: newId };

      const updatedStudents = [...currentStudents, newStudent];
      patchState(store, { students: updatedStudents });
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    },

    updateStudent(student: Student) {
      const updatedStudents = store.students().map(s =>
        s.id === student.id ? student : s
      );
      patchState(store, { students: updatedStudents });
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    },

    deleteStudent(id: number) {
      const updatedStudents = store.students().filter(s => s.id !== id);
      patchState(store, { students: updatedStudents });
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    }

  }))
);