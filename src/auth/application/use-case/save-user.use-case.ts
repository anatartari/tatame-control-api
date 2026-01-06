import { Injectable, Inject, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ISaveUserUseCase, SAVE_USER_USE_CASE } from '../../port/use-case/save-user.use-case.port';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { IAuthRepository, AUTH_REPOSITORY } from '../../port/repositories/auth.repository.port';

@Injectable()
export class SaveUserUseCase implements ISaveUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new User();
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.name = createUserDto.name;
    user.school = createUserDto.school;

    return this.authRepository.save(user);
  }
}

