import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'seu_usuario'),
    password: configService.get<string>('DB_PASSWORD', 'sua_senha'),
    database: configService.get<string>('DB_NAME', 'nome_do_banco'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get<string>('NODE_ENV', 'development') !== 'production',
    logging: configService.get<boolean>('DB_LOGGING', true),
});