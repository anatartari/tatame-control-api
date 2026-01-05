import { Injectable, Inject } from '@nestjs/common';
import { Registration } from '../../domain/entities/registration.entity';
import { IFindRegistrationUseCase, FIND_REGISTRATION_USE_CASE } from '../../ports/use-cases/find-registration.use-case.port';
import { IRegistrationRepository, REGISTRATION_REPOSITORY } from '../../ports/repositories/registration.repository.port';

@Injectable()
export class FindRegistrationUseCase implements IFindRegistrationUseCase {
  constructor(
    @Inject(REGISTRATION_REPOSITORY)
    private readonly registrationRepository: IRegistrationRepository,
  ) {}

  async execute(id: string): Promise<Registration> {
    const registration = await this.registrationRepository.findWithStudentAndSport(id);

    if (!registration) {
      throw new Error('Registration not found');
    }

    return registration;
  }
}

