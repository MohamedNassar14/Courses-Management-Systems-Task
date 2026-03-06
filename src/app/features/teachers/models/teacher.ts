export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone?: string;
  specialization: string;
  rating?: number;
}

export interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
}