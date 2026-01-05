import { StudentsWithRegistrationStatusDto } from '../../dto/students-register-status.dto';

export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');

export interface IStudentRepository {
  findWithRegistrationStatus(): Promise<StudentsWithRegistrationStatusDto[]>;
}

