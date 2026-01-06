import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';

export const SAVE_USER_USE_CASE = Symbol('SAVE_USER_USE_CASE');

export interface ISaveUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<User>;
}

