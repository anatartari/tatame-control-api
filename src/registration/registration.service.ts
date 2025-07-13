import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';
import { Address } from '../address/entities/address.entity';
import { MedicalInfo } from '../medical-info/entities/medical-info.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';

import { RegistrationStatusEnum, isValidRegistrationStatus } from '../global/enums/registration-status.enum';
import { CreateExperimentalClassDto } from './dto/create-experimental-class.dto';

@Injectable()
export class RegistrationService {
  
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(MedicalInfo)
    private medicalInfoRepository: Repository<MedicalInfo>,
  ) {}

  async createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    const { student: studentDto, sportIds } = createRegistrationDto;

    // Save address
    const address = this.addressRepository.create(studentDto.address);
    const savedAddress = await this.addressRepository.save(address);

    // Save medical info
    const medicalInfo = this.medicalInfoRepository.create(studentDto.medicalInfo);
    const savedMedicalInfo = await this.medicalInfoRepository.save(medicalInfo);

    // Save student
    const student = this.studentRepository.create({
      ...studentDto,
      address: savedAddress,
      medicalInfo: savedMedicalInfo,
    });
    const savedStudent = await this.studentRepository.save(student);

    // Get sports by IDs
    const sports = await this.sportRepository.find({
      where: { id: In(sportIds) }
    });

    if (sports.length !== sportIds.length) {
      throw new Error('Some sports were not found');
    }

    // Create registrations for each sport
    const registrations: Registration[] = [];
    for (const sport of sports) {
      const registration = this.registrationRepository.create({
        student: savedStudent,
        sport,
        status: RegistrationStatusEnum.ACTIVE,
      });
      const savedRegistration = await this.registrationRepository.save(registration);
      registrations.push(savedRegistration);
    }

    return registrations;
  }

  async findAll(): Promise<Registration[]> {
    return this.registrationRepository.find({
      relations: ['student', 'sport'],
    });
  }

  async findOne(id: string): Promise<Registration> {
    const registration = await this.registrationRepository.findOne({
      where: { id },
      relations: ['student', 'sport'],
    });

    if (!registration) {
      throw new Error('Registration not found');
    }

    return registration;
  }

  async createExperimentalClass(createDto: CreateExperimentalClassDto): Promise<Registration[]> {
    
    const sports = await this.sportRepository.find({
        where: { id: In(createDto.sport_ids) }
    });

    if (sports.length !== createDto.sport_ids.length) {
      throw new BadRequestException('One or more sports not found');
    }

    const existingStudent = await this.studentRepository.findOne({
        where: [
            { email: createDto.email },
            { phone: createDto.phone }
        ]
    });

    let student = existingStudent;
    if (!student) {
        student = await this.saveNewStudentByExperimentalClass(createDto);
    }

    // Criar aulas experimentais para cada sport
    const experimentalClasses: Registration[] = [];
    
    for (const sport of sports) {
        const experimentalClass = this.registrationRepository.create({
            student,
            sport,
            status: RegistrationStatusEnum.EXPERIMENTAL,
        });
        
        const savedExperimentalClass = await this.registrationRepository.save(experimentalClass);
        experimentalClasses.push(savedExperimentalClass);
    }

    return experimentalClasses;
  }

  private async saveNewStudentByExperimentalClass(createDto: CreateExperimentalClassDto): Promise<Student> {
    const student = this.studentRepository.create({
        name: createDto.name,
        email: createDto.email,
        phone: createDto.phone,
        gender: createDto.gender,
        birthday: createDto.birthday,
        practiced_martial_arts: createDto.practiced_martial_arts,
        graduated_in_style: createDto.graduated_in_style,
    });

    await this.studentRepository.save(student);
    return student;
}
}
