import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { DataSource, In, QueryRunner } from 'typeorm';
import { CreateRegistrationDto } from '../../dto/create-registration.dto';
import { Registration } from '../../domain/entities/registration.entity';
import { ICreateRegistrationUseCase, CREATE_REGISTRATION_USE_CASE } from '../../ports/use-cases/create-registration.use-case.port';
import { Sport } from '../../../sport/domain/entities/sport.entity';
import { Student } from '../../../student/domain/entities/student.entity';
import { Address } from '../../../address/domain/entities/address.entity';
import { MedicalInfo } from '../../../medical-info/domain/entities/medical-info.entity';
import { RegistrationStatusEnum } from '../../../global/enums/registrationStatus.enum';

@Injectable()
export class CreateRegistrationUseCase implements ICreateRegistrationUseCase {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async execute(createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const { student: studentDto, sportIds } = createRegistrationDto;

      // Get sports by IDs first to validate
      const sports = await queryRunner.manager.find(Sport, {
        where: { id: In(sportIds) }
      });

      if (sports.length !== sportIds.length) {
        throw new BadRequestException('Some sports were not found');
      }

      // Save address
      const address = queryRunner.manager.create(Address, studentDto.address);
      const savedAddress = await queryRunner.manager.save(address);

      // Save medical info
      const medicalInfo = queryRunner.manager.create(MedicalInfo, studentDto.medicalInfo);
      const savedMedicalInfo = await queryRunner.manager.save(medicalInfo);

      // Save student
      const student = queryRunner.manager.create(Student, {
        ...studentDto,
        address: savedAddress,
        medicalInfo: savedMedicalInfo,
      });
      const savedStudent = await queryRunner.manager.save(student);

      const registrations: Registration[] = [];
      
      for (const sport of sports) {
        const registration = queryRunner.manager.create(Registration, {
          student: savedStudent,
          sport,
          status: RegistrationStatusEnum.ACTIVE,
        });
        const savedRegistration = await queryRunner.manager.save(registration);
        registrations.push(savedRegistration);
      }

      await queryRunner.commitTransaction();
      return registrations;
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

