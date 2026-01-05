import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Import entities explicitly for TypeORM CLI
import { Address } from '../../../address/domain/entities/address.entity';
import { Student } from '../../../student/domain/entities/student.entity';
import { MedicalInfo } from '../../../medical-info/domain/entities/medical-info.entity';
import { Sport } from '../../../sport/domain/entities/sport.entity';
import { Registration } from '../../../registration/domain/entities/registration.entity';
import { Payment } from '../../../payment/domain/entities/payment.entity';

// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dbname',
  entities: [
    Address,
    Student,
    MedicalInfo,
    Sport,
    Registration,
    Payment,
  ],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: false, // Always false when using migrations
  logging: process.env.DB_LOGGING === 'true' || process.env.DB_LOGGING === undefined,
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

