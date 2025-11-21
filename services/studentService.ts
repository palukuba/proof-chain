import { supabase } from './supabaseClient';
import { Student } from '../types';

export const studentService = {
  async getAllStudents(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('last_name', { ascending: true });
      
    if (error) {
      console.error('Error fetching students:', error.message || error);
      return [];
    }
    
    if (!data) return [];

    return data.map((s: any) => ({
      id: s.id,
      studentId: s.student_id,
      firstName: s.first_name,
      lastName: s.last_name,
      email: s.email,
      program: s.program,
      graduationYear: s.graduation_year
    }));
  },

  async getStudentById(id: string): Promise<Student | undefined> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching student by ID:', error.message || error);
      return undefined;
    }

    return {
      id: data.id,
      studentId: data.student_id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      program: data.program,
      graduationYear: data.graduation_year
    };
  }
};