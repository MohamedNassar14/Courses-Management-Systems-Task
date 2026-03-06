import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CourseStore } from '../../store/course.store';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SelectModule } from 'primeng/select';
import { LanguageService } from '../../../../core/services/language.service';
import { IconsComponent } from "../../../../shared/components/icons/icons.component";

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, CommonModule, BreadcrumbComponent, DataTableComponent, SelectModule, IconsComponent],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  private store = inject(CourseStore);
  private fb = inject(FormBuilder);
  t = inject(LanguageService);
  data = this.store.courses;
  isVisibleAddEdit = signal(false);
  isVisibleDelete = signal(false);
  isEditMode = signal(false);
  courseForm!: FormGroup;
  selectedCourseId: number | null = null;
  totalItemCounts!: number;
  pageNumber: number = 0;
  MaxResultCount: number = 10;
   cols = computed(() => [
    { field: 'id', header: this.t.translate('courses.table.ID') },
    { field: 'name', header: this.t.translate('courses.table.Name') },
    { field: 'schedule', header: this.t.translate('courses.table.Schedule') },
  ]);

  ngOnInit() {
    this.store.loadCourses();
    this.initForm();
  }

  initForm() {
    this.courseForm = this.fb.group({
      name: [null],
      teacherIds: [[]], 
      studentIds: [[]], 
      schedule: [''],
      materials: [[]]  
    });
  }

  addCourse() {
    this.isVisibleAddEdit.set(true);
    this.isEditMode.set(false);
    this.courseForm.reset();
  }

  editCourse(course: Course) {
    this.isVisibleAddEdit.set(true);
    this.isEditMode.set(true);
    this.selectedCourseId = course.id;

    this.courseForm.patchValue({
      name: course.name,
      teacherIds: course.teacherIds || [],
      studentIds: course.studentIds || [],
      schedule: course.schedule,
      materials: course.materials || []
    });
  }

  onSubmit() {
    if (this.courseForm.invalid) return;

    const value = this.courseForm.value;

    if (this.isEditMode()) {
      this.store.updateCourse({ id: this.selectedCourseId!, ...value });
    } else {
      this.store.addCourse(value);
    }

    this.isVisibleAddEdit.set(false);
    this.courseForm.reset();
  }

  deleteCourse(course: Course) {
    this.selectedCourseId = course.id;
    this.isVisibleDelete.set(true);
  }

  confirmDeleteCourse() {
    if (this.selectedCourseId !== null) {
      this.store.deleteCourse(this.selectedCourseId);
      this.isVisibleDelete.set(false);
    }
  }

  getAllCourses(event?: any) {
    this.store.loadCourses();
  }

  isEditModeValue() {
    return this.isEditMode();
  }
}