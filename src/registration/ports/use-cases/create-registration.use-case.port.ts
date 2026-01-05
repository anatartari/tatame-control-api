import { CreateRegistrationDto } from '../../dto/create-registration.dto';
import { Registration } from '../../domain/entities/registration.entity';

export const CREATE_REGISTRATION_USE_CASE = Symbol('CREATE_REGISTRATION_USE_CASE');

export interface ICreateRegistrationUseCase {
  execute(createRegistrationDto: CreateRegistrationDto): Promise<Registration[]>;
}

