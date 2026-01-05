import { Registration } from '../../domain/entities/registration.entity';

export const UPDATE_REGISTRATION_STATUS_USE_CASE = Symbol('UPDATE_REGISTRATION_STATUS_USE_CASE');

export interface IUpdateRegistrationStatusUseCase {
  execute(registrationId: string): Promise<Registration>;
}

