import { StudentsWithRegistrationStatusDto } from '../../dto/students-register-status.dto';

export const LIST_WITH_REGISTRATION_STATUS_USE_CASE = Symbol('LIST_WITH_REGISTRATION_STATUS_USE_CASE');

export interface IListWithRegistrationStatusUseCase {
  execute(): Promise<StudentsWithRegistrationStatusDto[]>;
}

