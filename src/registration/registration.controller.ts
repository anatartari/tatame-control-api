import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Registration } from './entities/registration.entity';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async create(@Body() createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    return this.registrationService.create(createRegistrationDto);
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
