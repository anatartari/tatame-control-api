import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperimentalClass } from './entities/experimental-class.entity';
import { CreateExperimentalClassDto } from './dto/create-experimental-class.dto';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';

@Injectable()
export class ExperimentalClassService {
    constructor(
        @InjectRepository(ExperimentalClass)
        private experimentalClassRepository: Repository<ExperimentalClass>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectRepository(Sport)
        private sportRepository: Repository<Sport>,
    ) {}

    async save(createDto: CreateExperimentalClassDto): Promise<ExperimentalClass> {
        
        const sport = await this.sportRepository.findOne({
            where: { id: createDto.sport_id }
        });
    
        if (!sport) {
            throw new BadRequestException('Sport not found');
        }

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


        const experimentalClass = this.experimentalClassRepository.create({
            student,
            sport,
        });

        return this.experimentalClassRepository.save(experimentalClass);
    }
}
