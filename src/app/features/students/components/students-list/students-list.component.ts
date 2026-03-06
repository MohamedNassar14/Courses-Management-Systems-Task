import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { BreadcrumbComponent } from "../../../../shared/components/breadcrumb/breadcrumb.component";
import { DataTableComponent } from "../../../../shared/components/data-table/data-table.component";
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { StudentStore } from '../../store/student.store';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../../../core/services/language.service';
import { IconsComponent } from "../../../../shared/components/icons/icons.component";


@Component({
  selector: 'app-students-list',
  imports: [BreadcrumbComponent, DataTableComponent, SelectModule, CommonModule, DialogModule, ReactiveFormsModule, IconsComponent],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent implements OnInit {

  private store = inject(StudentStore);
  private fb = inject(FormBuilder);
  t = inject(LanguageService);
  data = this.store.students;
  isVisibleAddEdit = signal<boolean>(false);
  isVisibleDelete = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  studentForm!: FormGroup;
  selectedStudent: any = null;
  selectedStudentId: number | null = null;
  studentDeletedId = signal<number>(0);
  totalItemCounts!: number;
  pageNumber: number = 0;
  MaxResultCount: number = 10;
  showDeletePopup: boolean = false;
  visible: boolean = false;
  cols = computed(() => [
    { field: 'id', header: this.t.translate('students.table.ID') },
    { field: 'name', header: this.t.translate('students.table.Name') },
    { field: 'email', header: this.t.translate('students.table.Email') },
  ]);

  ngOnInit(): void {
    this.store.loadStudents();
    this.initialStudentForm()
  }

  addStudent() {
    this.isVisibleAddEdit.set(true);
    this.isEditMode.set(false);
  }

  initialStudentForm() {
  this.studentForm = this.fb.group({
    name: [null, [Validators.required]],
    department: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]], 
  });
}
 isInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
  editStudent(student: any) {

    this.isEditMode.set(true);
    this.isVisibleAddEdit.set(true);

    this.selectedStudent = student;
    this.selectedStudentId = student.id;

    this.studentForm.patchValue(student);

  }
  onSubmitData() {

    if (this.studentForm.invalid) return;

    if (this.isEditMode()) {

      this.store.updateStudent({
        id: this.selectedStudentId,
        ...this.studentForm.value
      });

    } else {

      this.store.addStudent(this.studentForm.value);

    }

    this.isVisibleAddEdit.set(false);
    this.studentForm.reset();

  }

  deleteStudent(student: any) {
    this.studentDeletedId.set(student.id);
    this.isVisibleDelete.set(true);
  }

  confirmDeleteStudent() {
    this.store.deleteStudent(this.studentDeletedId());
    this.isVisibleDelete.set(false);
  }
}
