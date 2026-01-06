import { LoginDto } from '../../dto/login.dto';
import { LoginResponseDto } from '../../dto/login-response.dto';

export const LOGIN_USE_CASE = Symbol('LOGIN_USE_CASE');

export interface ILoginUseCase {
  execute(loginDto: LoginDto): Promise<LoginResponseDto>;
}

