export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  phone: string;
}

export interface CreateStudent {
  name: string;
  email: string;
  department: string;
  phone: string;
}

export interface StudentState {
  students: Student[];
  loading: boolean;
}