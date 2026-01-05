import { Injectable, Inject } from '@nestjs/common';
import { StudentsWithRegistrationStatusDto } from '../../dto/students-register-status.dto';
import { IListWithRegistrationStatusUseCase, LIST_WITH_REGISTRATION_STATUS_USE_CASE } from '../../ports/use-cases/list-with-registration-status.use-case.port';
import { IStudentRepository, STUDENT_REPOSITORY } from '../../ports/repositories/student.repository.port';

@Injectable()
export class ListWithRegistrationStatusUseCase implements IListWithRegistrationStatusUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(): Promise<StudentsWithRegistrationStatusDto[]> {
    return this.studentRepository.findWithRegistrationStatus();
  }
}

