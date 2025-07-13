import { Injectable } from '@nestjs/common';
import { StudentsWithRegistrationStatusDto } from './dto/students-register-status.dto';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {

    constructor(private readonly studentRepository: StudentRepository) {
    }

  getListWithRegistrationStatus(): Promise<StudentsWithRegistrationStatusDto[]> {
    return this.studentRepository.findWithRegistrationStatus();
  }
}
