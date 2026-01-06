import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILoginUseCase, LOGIN_USE_CASE } from '../../port/use-case/login.use-case.port';
import { LoginDto } from '../../dto/login.dto';
import { LoginResponseDto } from '../../dto/login-response.dto';
import { IAuthRepository, AUTH_REPOSITORY } from '../../port/repositories/auth.repository.port';
import { ITokenPort, TOKEN_PORT } from '../../port/use-case/token.port';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(TOKEN_PORT)
    private readonly tokenPort: ITokenPort,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.tokenPort.generateToken(payload);

    return {
      accessToken,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}

