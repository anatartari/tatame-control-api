import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from './domain/entities/user.entity';
import { AuthController } from './adapters/web/auth.controller';
import { AuthRepositoryAdapter } from './adapters/persistence/auth.repository.adapter';
import { AUTH_REPOSITORY } from './port/repositories/auth.repository.port';
import { LoginUseCase } from './application/use-case/login.use-case';
import { LOGIN_USE_CASE } from './port/use-case/login.use-case.port';
import { SaveUserUseCase } from './application/use-case/save-user.use-case';
import { SAVE_USER_USE_CASE } from './port/use-case/save-user.use-case.port';
import { JwtTokenAdapter } from './adapters/jwt-token.adapter';
import { TOKEN_PORT } from './port/use-case/token.port';
import { JwtStrategy } from './adapters/web/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') || '1h';
        return {
          secret: configService.get<string>('JWT_SECRET') || 'default-secret-key',
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: LOGIN_USE_CASE,
      useClass: LoginUseCase,
    },
    {
      provide: SAVE_USER_USE_CASE,
      useClass: SaveUserUseCase,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryAdapter,
    },
    {
      provide: TOKEN_PORT,
      useClass: JwtTokenAdapter,
    },
    JwtStrategy,
  ],
  exports: [JwtModule, AUTH_REPOSITORY],
})
export class AuthModule {}

