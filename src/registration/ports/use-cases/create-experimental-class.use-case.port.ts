import { CreateExperimentalClassDto } from '../../dto/create-experimental-class.dto';
import { Registration } from '../../domain/entities/registration.entity';

export const CREATE_EXPERIMENTAL_CLASS_USE_CASE = Symbol('CREATE_EXPERIMENTAL_CLASS_USE_CASE');

export interface ICreateExperimentalClassUseCase {
  execute(createDto: CreateExperimentalClassDto): Promise<Registration[]>;
}

