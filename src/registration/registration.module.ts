import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { Registration } from './entities/registration.entity';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';
import { Address } from '../address/entities/address.entity';
import { MedicalInfo } from '../medical-info/entities/medical-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Registration,
      Student,
      Sport,
      Address,
      MedicalInfo,
    ]),
  ],
  providers: [RegistrationService],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
