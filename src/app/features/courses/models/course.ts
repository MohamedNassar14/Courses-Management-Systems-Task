export interface Course {
  id: number;
  name: string;
  teacherIds: number[];
  studentIds: number[];
  schedule?: string;
  materials?: string[];
}

export interface CourseState {
  courses: Course[];
  loading: boolean;
}

export interface CreateCourse {
  name: string;
  teacherIds: number[];
  studentIds: number[];
  schedule?: string;
  materials?: string[];
}