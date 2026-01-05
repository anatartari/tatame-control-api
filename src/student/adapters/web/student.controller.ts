import { Controller, Get } from '@nestjs/common';
import { StudentsWithRegistrationStatusDto } from '../../dto/students-register-status.dto';
import { ListWithRegistrationStatusUseCase } from '../../application/use-cases/list-with-registration-status.use-case';

@Controller('student')
export class StudentController {
  constructor(
    private readonly listWithRegistrationStatusUseCase: ListWithRegistrationStatusUseCase,
  ) {}

  @Get('list-registration-status')
  getListWithRegistrationStatus(): Promise<StudentsWithRegistrationStatusDto[]> {
    return this.listWithRegistrationStatusUseCase.execute();
  }
}

