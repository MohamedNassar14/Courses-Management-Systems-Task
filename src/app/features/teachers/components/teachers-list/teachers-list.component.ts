import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TeacherStore } from '../../store/teacher.store';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { LanguageService } from '../../../../core/services/language.service';
import { IconsComponent } from "../../../../shared/components/icons/icons.component";

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    SelectModule,
    BreadcrumbComponent,
    DataTableComponent,
    IconsComponent
],
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  private store = inject(TeacherStore);
  private fb = inject(FormBuilder);
  t = inject(LanguageService);
  data = this.store.teachers;
  isVisibleAddEdit = signal<boolean>(false);
  isVisibleDelete = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  teacherForm!: FormGroup;
  selectedTeacher: any = null;
  selectedTeacherId: number | null = null;
  teacherDeletedId = signal<number>(0);
   totalItemCounts!: number;

  cols = computed(() => [
    { field: 'id', header: this.t.translate('teachers.table.ID') },
    { field: 'name', header: this.t.translate('teachers.table.Name') },
    { field: 'email', header: this.t.translate('teachers.table.Email') },
    { field: 'specialization', header: this.t.translate('teachers.table.Specialization') },
    { field: 'rating', header: this.t.translate('teachers.table.Rating') },
  ]);
  ngOnInit(): void {
    this.store.loadTeachers();
    this.initTeacherForm();
  }

  initTeacherForm() {
    this.teacherForm = this.fb.group({
      name: [null],
      email: [null],
      phone: [null],
      specialization: [null],
      rating: [null]
    });
  }

  addTeacher() {
    this.isVisibleAddEdit.set(true);
    this.isEditMode.set(false);
  }

  editTeacher(teacher: any) {
    this.isEditMode.set(true);
    this.isVisibleAddEdit.set(true);
    this.selectedTeacher = teacher;
    this.selectedTeacherId = teacher.id;
    this.teacherForm.patchValue(teacher);
  }

  onSubmitData() {
    if (this.teacherForm.invalid) return;

    if (this.isEditMode()) {
      this.store.updateTeacher({
        id: this.selectedTeacherId!,
        ...this.teacherForm.value
      });
    } else {
      this.store.addTeacher(this.teacherForm.value);
    }

    this.isVisibleAddEdit.set(false);
    this.teacherForm.reset();
  }

  deleteTeacher(teacher: any) {
    this.teacherDeletedId.set(teacher.id);
    this.isVisibleDelete.set(true);
  }

  confirmDeleteTeacher() {
    this.store.deleteTeacher(this.teacherDeletedId());
    this.isVisibleDelete.set(false);
  }

}