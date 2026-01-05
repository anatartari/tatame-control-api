import { Injectable, Inject } from '@nestjs/common';
import { Registration } from '../../domain/entities/registration.entity';
import { IListRegistrationsUseCase, LIST_REGISTRATIONS_USE_CASE } from '../../ports/use-cases/list-registrations.use-case.port';
import { IRegistrationRepository, REGISTRATION_REPOSITORY } from '../../ports/repositories/registration.repository.port';

@Injectable()
export class ListRegistrationsUseCase implements IListRegistrationsUseCase {
  constructor(
    @Inject(REGISTRATION_REPOSITORY)
    private readonly registrationRepository: IRegistrationRepository,
  ) {}

  async execute(): Promise<Registration[]> {
    return this.registrationRepository.find();
  }
}

