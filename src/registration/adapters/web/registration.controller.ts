import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { Registration } from '../../domain/entities/registration.entity';
import { CreateRegistrationDto } from '../../dto/create-registration.dto';
import { CreateExperimentalClassDto } from '../../dto/create-experimental-class.dto';
import { CreateRegistrationUseCase } from '../../application/use-cases/create-registration.use-case';
import { CreateExperimentalClassUseCase } from '../../application/use-cases/create-experimental-class.use-case';
import { FindRegistrationUseCase } from '../../application/use-cases/find-registration.use-case';
import { ListRegistrationsUseCase } from '../../application/use-cases/list-registrations.use-case';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly createRegistrationUseCase: CreateRegistrationUseCase,
    private readonly createExperimentalClassUseCase: CreateExperimentalClassUseCase,
    private readonly findRegistrationUseCase: FindRegistrationUseCase,
    private readonly listRegistrationsUseCase: ListRegistrationsUseCase,
  ) {}

  @Post()
  async createRegistration(@Body() createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    return this.createRegistrationUseCase.execute(createRegistrationDto);
  }

  @Post('/experimental-class')
  async createExperimentalClass(@Body() createDto: CreateExperimentalClassDto): Promise<Registration[]> {
    return this.createExperimentalClassUseCase.execute(createDto);
  }

  @Get()
  async findAll(): Promise<Registration[]> {
    return this.listRegistrationsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Registration> {
    return this.findRegistrationUseCase.execute(id);
  }
}

