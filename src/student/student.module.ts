import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './domain/entities/student.entity';
import { StudentController } from './adapters/web/student.controller';
import { StudentRepositoryAdapter } from './adapters/persistence/student.repository.adapter';
import { STUDENT_REPOSITORY } from './ports/repositories/student.repository.port';
import { ListWithRegistrationStatusUseCase } from './application/use-cases/list-with-registration-status.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [
    ListWithRegistrationStatusUseCase,
    {
      provide: STUDENT_REPOSITORY,
      useClass: StudentRepositoryAdapter,
    },
  ],
  exports: [STUDENT_REPOSITORY],
})
export class StudentModule {}
