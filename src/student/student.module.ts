import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import { DataSource } from 'typeorm';

@Module({
  controllers: [StudentController],
  providers: [StudentService,
    {
      provide: StudentRepository,
      useFactory: (dataSource: DataSource) => new StudentRepository(dataSource),
      inject: [DataSource],
    }],
})
export class StudentModule {}
