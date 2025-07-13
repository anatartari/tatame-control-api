import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentsWithRegistrationStatusDto } from './dto/students-register-status.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('list-registration-status')
  getListWithRegistrationStatus(): Promise<StudentsWithRegistrationStatusDto[]> {
    return this.studentService.getListWithRegistrationStatus();
  }
}
