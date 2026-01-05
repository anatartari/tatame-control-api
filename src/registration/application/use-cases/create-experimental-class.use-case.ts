import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, In, QueryRunner } from 'typeorm';
import { CreateExperimentalClassDto } from '../../dto/create-experimental-class.dto';
import { Registration } from '../../domain/entities/registration.entity';
import { ICreateExperimentalClassUseCase } from '../../ports/use-cases/create-experimental-class.use-case.port';
import { Sport } from '../../../sport/domain/entities/sport.entity';
import { Student } from '../../../student/domain/entities/student.entity';
import { RegistrationStatusEnum } from '../../../global/enums/registrationStatus.enum';

@Injectable()
export class CreateExperimentalClassUseCase implements ICreateExperimentalClassUseCase {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async execute(createDto: CreateExperimentalClassDto): Promise<Registration[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const sports = await queryRunner.manager.find(Sport, {
          where: { id: In(createDto.sportIds) }
      });

      if (sports.length !== createDto.sportIds.length) {
        throw new BadRequestException('One or more sports not found');
      }

      const existingStudent = await queryRunner.manager.findOne(Student, {
          where: [
              { email: createDto.email },
              { phone: createDto.phone }
          ]
      });

      let student = existingStudent;
      if (!student) {
          student = await this.saveNewStudentByExperimentalClass(createDto, queryRunner);
      }

      // Criar aulas experimentais para cada sport
      const experimentalClasses: Registration[] = [];
      
      for (const sport of sports) {
          const experimentalClass = queryRunner.manager.create(Registration, {
              student,
              sport,
              status: RegistrationStatusEnum.EXPERIMENTAL,
          });
          
          const savedExperimentalClass = await queryRunner.manager.save(experimentalClass);
          experimentalClasses.push(savedExperimentalClass);
      }

      await queryRunner.commitTransaction();
      return experimentalClasses;
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async saveNewStudentByExperimentalClass(createDto: CreateExperimentalClassDto, queryRunner: QueryRunner): Promise<Student> {
    const student = queryRunner.manager.create(Student, {
        name: createDto.name,
        email: createDto.email,
        phone: createDto.phone,
        gender: createDto.gender,
        birthday: createDto.birthday,
        practicedMartialArts: createDto.practicedMartialArts,
        graduatedInStyle: createDto.graduatedInStyle,
    });

    await queryRunner.manager.save(student);
    return student;
  }
}

