import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Registration } from './entities/registration.entity';
import { CreateExperimentalClassDto } from './dto/create-experimental-class.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async createRegistration(@Body() createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    return this.registrationService.createRegistration(createRegistrationDto);
  }

  @Post('/experimental-class')
    async createExperimentalClass(@Body() createDto: CreateExperimentalClassDto): Promise<Registration[]> {
      console.log(createDto);
        return this.registrationService.createExperimentalClass(createDto);
    }

  @Get()
  async findAll(): Promise<Registration[]> {
    return this.registrationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Registration> {
    return this.registrationService.findOne(id);
  }
}
