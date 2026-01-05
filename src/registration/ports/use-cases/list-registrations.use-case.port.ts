import { Registration } from '../../domain/entities/registration.entity';

export const LIST_REGISTRATIONS_USE_CASE = Symbol('LIST_REGISTRATIONS_USE_CASE');

export interface IListRegistrationsUseCase {
  execute(): Promise<Registration[]>;
}

