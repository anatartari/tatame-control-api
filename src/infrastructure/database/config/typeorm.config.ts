import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Address } from '../../../address/domain/entities/address.entity';
import { Student } from '../../../student/domain/entities/student.entity';
import { MedicalInfo } from '../../../medical-info/domain/entities/medical-info.entity';
import { Sport } from '../../../sport/domain/entities/sport.entity';
import { Registration } from '../../../registration/domain/entities/registration.entity';
import { Payment } from '../../../payment/domain/entities/payment.entity';
import { User } from '../../../auth/domain/entities/user.entity';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5433),
    username: configService.get<string>('DB_USERNAME', 'username'),
    password: configService.get<string>('DB_PASSWORD', 'password'),
    database: configService.get<string>('DB_NAME', 'dbname'),
    entities: [
        Address,
        Student,
        MedicalInfo,
        Sport,
        Registration,
        Payment,
        User,
    ],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: configService.get<string>('NODE_ENV', 'development') !== 'production',
    logging: configService.get<boolean>('DB_LOGGING', true),
    migrationsRun: false,
    migrationsTableName: 'migrations',
});

