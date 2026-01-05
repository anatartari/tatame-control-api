import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './domain/entities/registration.entity';
import { Student } from '../student/domain/entities/student.entity';
import { Sport } from '../sport/domain/entities/sport.entity';
import { Address } from '../address/domain/entities/address.entity';
import { MedicalInfo } from '../medical-info/domain/entities/medical-info.entity';
import { RegistrationController } from './adapters/web/registration.controller';
import { RegistrationRepositoryAdapter } from './adapters/persistence/registration.repository.adapter';
import { REGISTRATION_REPOSITORY } from './ports/repositories/registration.repository.port';
import { CreateRegistrationUseCase } from './application/use-cases/create-registration.use-case';
import { CreateExperimentalClassUseCase } from './application/use-cases/create-experimental-class.use-case';
import { UpdateRegistrationStatusUseCase } from './application/use-cases/update-registration-status.use-case';
import { UPDATE_REGISTRATION_STATUS_USE_CASE } from './ports/use-cases/update-registration-status.use-case.port';
import { FindRegistrationUseCase } from './application/use-cases/find-registration.use-case';
import { ListRegistrationsUseCase } from './application/use-cases/list-registrations.use-case';

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
  controllers: [RegistrationController],
  providers: [
    CreateRegistrationUseCase,
    CreateExperimentalClassUseCase,
    FindRegistrationUseCase,
    ListRegistrationsUseCase,
    { 
      provide: UPDATE_REGISTRATION_STATUS_USE_CASE, 
      useClass: UpdateRegistrationStatusUseCase 
    },
    {
      provide: REGISTRATION_REPOSITORY,
      useClass: RegistrationRepositoryAdapter,
    },
  ],
  exports: [
    REGISTRATION_REPOSITORY, 
    UPDATE_REGISTRATION_STATUS_USE_CASE,
  ],
})
export class RegistrationModule {}
