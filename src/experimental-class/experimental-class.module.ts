import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentalClassController } from './experimental-class.controller';
import { ExperimentalClassService } from './experimental-class.service';
import { ExperimentalClass } from './entities/experimental-class.entity';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExperimentalClass, Student, Sport])
  ],
  controllers: [ExperimentalClassController],
  providers: [ExperimentalClassService]
})
export class ExperimentalClassModule {}
