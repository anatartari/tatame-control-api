import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../../dto/login.dto';
import { LoginResponseDto } from '../../dto/login-response.dto';
import { ILoginUseCase, LOGIN_USE_CASE } from '../../port/use-case/login.use-case.port';
import { ISaveUserUseCase, SAVE_USER_USE_CASE } from '../../port/use-case/save-user.use-case.port';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { Public } from '../../../global/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_USE_CASE)
    private readonly loginUseCase: ILoginUseCase,
    @Inject(SAVE_USER_USE_CASE)
    private readonly saveUserUseCase: ISaveUserUseCase,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.saveUserUseCase.execute(createUserDto);
  }
}

