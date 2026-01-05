import { Registration } from '../../domain/entities/registration.entity';

export const FIND_REGISTRATION_USE_CASE = Symbol('FIND_REGISTRATION_USE_CASE');

export interface IFindRegistrationUseCase {
  execute(id: string): Promise<Registration>;
}

